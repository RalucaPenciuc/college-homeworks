import RentPost from "../models/RentPost";
import { getRentPostFromQueryDoc, getRentPostFromDTO } from "./mapUtils";
import { Database, RootBucket } from "./firebase-init";
import { getCookie } from "./CookieService";
import RentPostDTO from "../models/dtos/RentPostDTO";
import RentPostPhoto from "../models/RentPostPhoto";
import {
  QueryResponse,
  QueryDocResponse,
  Doc,
  FirestoreError,
  AddDocResponse,
} from "./typeAlias";
import MessageDTO from "../models/dtos/MessageDTO";
import firebase from "firebase";

export default class FirebaseService {
  private static instance: FirebaseService;

  private constructor() {}

  static getInstance() {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  async fetchRentPosts(): Promise<RentPost[]> {
    return Database.collection("rent-posts")
      .get()
      .then((response: QueryResponse) => {
        return response.docs
          .map((rentPost) => getRentPostFromQueryDoc(rentPost))
          .filter((p) => p.docRef !== "0");
      })
      .catch((error) => {
        throw error;
      });
  }

  static async getPhotosDownloadURL(id: string, photos: RentPostPhoto[]): Promise<string[]> {
    const photosURL: string[] = [];
    for (const photo of photos) {
      const photoRef = RootBucket.child(`rent-posts/${id}/${photo.name}`);
      try {
        const uploadResponse = await photoRef.put(photo.file);
        const uploadResponseRef = uploadResponse.ref;
        const url: string = await uploadResponseRef.getDownloadURL();
        photosURL.push(url);
      } catch (error) {
        throw error;
      }
    }
    return photosURL;
  }

  async createRentPost(request: RentPostDTO): Promise<RentPost> {
    const rentPost: RentPost = getRentPostFromDTO(request);
    return Database.collection("rent-posts")
      .add(rentPost)
      .then(async (response: AddDocResponse) => {
        rentPost.docRef = response.id;
        const photosResult = await FirebaseService.getPhotosDownloadURL(response.id, request.photos);
        rentPost.photos = photosResult;
        return rentPost;
      })
      .then(async (fullRentPost: RentPost) => {
        return await Database.collection("rent-posts")
          .doc(fullRentPost.docRef)
          .set(fullRentPost)
          .then(() => {
            return fullRentPost;
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });
  }

  async savePost(rentPostID: string): Promise<boolean> {
    const currentUserID = getCookie("not-token");

    return new Promise((resolve, reject) => {
      Database.collection("users")
        .doc(currentUserID)
        .get()
        .then((result: QueryDocResponse) => {
          resolve(
            new Promise((resolveUpdate, rejectUpdate) => {
              const newUserData = result.data();
              newUserData?.savedPosts.push(rentPostID);
              Database.collection("users")
                .doc(currentUserID)
                .set(newUserData as Doc)
                .then(() => resolveUpdate(true))
                .catch((error: FirestoreError) => rejectUpdate(error.message));
            })
          );
        })
        .catch((error: FirestoreError) => reject(error.message));
    });
  }

  async unsavePost(rentPostID: string): Promise<boolean> {
    const currentUserID = getCookie("not-token");

    return new Promise((resolve, reject) => {
      Database.collection("users")
        .doc(currentUserID)
        .get()
        .then((result: QueryDocResponse) => {
          resolve(
            new Promise((resolveUpdate, rejectUpdate) => {
              const userData: Doc | undefined = result.data();
              if (userData) {
                const newUserData: string[] = userData.savedPosts.filter(
                  (savedPostID: string) => savedPostID !== rentPostID
                );
                userData.savedPosts = newUserData;
                Database.collection("users")
                  .doc(currentUserID)
                  .set(userData as Doc)
                  .then(() => resolveUpdate(true))
                  .catch((error: FirestoreError) =>
                    rejectUpdate(error.message)
                  );
              } else rejectUpdate("User data undefined.");
            })
          );
        })
        .catch((error: FirestoreError) => reject(error.message));
    });
  }

  async sendMessage(request: MessageDTO): Promise<void> {
    const currentUserID = getCookie("not-token");

    await Database.collection("messages").add({
      sender: currentUserID,
      receiver: request.authorID,
      message: request.message,
      read: false,
      createDate: firebase.firestore.Timestamp.fromDate(new Date())
    });
  }
}
