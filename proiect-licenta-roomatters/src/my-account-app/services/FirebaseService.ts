import { Database, RootBucket } from "./firebase-init";
import { getCookie } from "./CookieService";
import {
  GetDocResponse,
  FirestoreError,
  QueryResponse,
  Doc,
} from "./typeAlias";
import {
  getUserDataFromDocResponse,
  getSavedPostFromDocReponse,
  getRentPostFromQueryResponse,
  getSendersFromQueryResponse,
  getMessagesFromQueryResponse,
  getSenderDataFromDocResponse,
} from "./mapUtils";
import RentPost from "../models/RentPost";
import UserDataResponse from "../models/dtos/UserDataResponse";
import UserData from "../models/UserData";
import Message from "../models/Message";
import SenderData from "../models/SenderData";
import MessageDTO from "../models/dtos/MessageDTO";
import firebase from "firebase";
import SendReplyRequest from "../models/SendReplyRequest";

export default class FirebaseService {
  private static instance: FirebaseService;

  private constructor() {}

  static getInstance() {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  async getUserData(): Promise<UserDataResponse> {
    const currentUserID: string = getCookie("not-token") || "";
    return new Promise((resolve, reject) => {
      Database.collection("users")
        .doc(currentUserID)
        .get()
        .then((response: GetDocResponse) => {
          const userData: UserData | undefined = getUserDataFromDocResponse(
            response
          );
          if (userData) {
            // const profileImageRef = RootBucket.child(
            //   `users/${userData.profileImage}`
            // );
            // profileImageRef
              // .getDownloadURL()
              // .then((profileImage) => {
                // userData.profileImage = profileImage;
                const savedPostsData: string[] = response.data()?.savedPosts;
                const savedPosts: RentPost[] = [];
                savedPostsData.forEach((savedPostID: string) => {
                  Database.collection("rent-posts")
                    .doc(savedPostID)
                    .get()
                    .then((savedPostResponse: GetDocResponse) => {
                      const savedPost:
                        | RentPost
                        | undefined = getSavedPostFromDocReponse(
                        savedPostResponse
                      );
                      if (savedPost) {
                        savedPosts.push(savedPost);
                      } else reject("This saved post has no data in Firestore");
                    })
                    .catch((error: FirestoreError) => reject(error.message));
                });
                Database.collection("rent-posts")
                  .where("authorID", "==", currentUserID)
                  .get()
                  .then((postsResponse: QueryResponse) => {
                    const rentPosts: RentPost[] = getRentPostFromQueryResponse(
                      postsResponse
                    );
                    const userDataResponse: UserDataResponse = {
                      userData: userData,
                      myPosts: rentPosts,
                      savedPosts: savedPosts,
                    };
                    resolve(userDataResponse);
                  })
                  .catch((error: FirestoreError) => reject(error.message));
              // })
              // .catch((error) => reject(error.message));
          } else reject("This user has no data in Firestore");
        })
        .catch((error: FirestoreError) => reject(error.message));
    });
  }

  async deleteSavedPost(postID: string): Promise<string> {
    const currentUserID = getCookie("not-token");
    return new Promise((resolve, reject) => {
      Database.collection("users")
        .doc(currentUserID)
        .get()
        .then((response: GetDocResponse) => {
          const responseData: Doc | undefined = response.data();
          if (responseData) {
            const newSavedPosts: RentPost[] = responseData.savedPosts.filter(
              (post: string) => post !== postID
            );
            Database.collection("users")
              .doc(currentUserID)
              .update({
                savedPosts: newSavedPosts,
              })
              .then(() => resolve(postID))
              .catch((error) => reject(error.message));
          } else reject("This user has no data in Firestore");
        })
        .catch((error: FirestoreError) => reject(error.message));
    });
  }

  async editPost(rentPostID: string): Promise<void> {
    // const currentUserID = getCookie("not-token");
    // return new Promise((resolve, reject) => {
    //   Database.collection("users")
    //     .doc(currentUserID)
    //     .get()
    //     .then((result) => {
    //       resolve(
    //         new Promise((resolveUpdate, rejectUpdate) => {
    //           const newUserData = result.data();
    //           newUserData?.savedPosts.push(rentPostID);
    //           Database.collection("users")
    //             .doc(currentUserID)
    //             .set(newUserData as DocObject)
    //             .then(() => resolveUpdate(true))
    //             .catch((error: FirestoreError) => rejectUpdate(error.message));
    //         })
    //       );
    //     })
    //     .catch((error: FirestoreError) => reject(error.message));
    // });
  }

  async deletePost(rentPostID: string): Promise<void> {
    const currentUserID: string = getCookie("not-token") || "";
    return new Promise((resolve, reject) => {
      Database.collection("rent-posts")
        .doc(rentPostID)
        .delete()
        .then(() => resolve())
        .catch((error) => reject(error.message))
    });
  }

  async fetchMessages(): Promise<Message[]> {
    const currentUserID: string = getCookie("not-token") || "";
    return Database.collection("messages")
      .where("receiver", "==", currentUserID)
      .get()
      .then(async (getResponse: QueryResponse) => {
        const messagesDTOs: MessageDTO[] = getMessagesFromQueryResponse(getResponse);
        const loggedUser: SenderData = (await FirebaseService.getSenderData(currentUserID)) || {
          docRef: currentUserID,
          email: firebase.auth().currentUser?.email || "",
          firstName:firebase.auth().currentUser?.displayName?.split(" ")[0] || "",
          lastName:firebase.auth().currentUser?.displayName?.split(" ")[0] || "",
          profileImage: firebase.auth().currentUser?.photoURL || "",
        };
        const sendersIDs: string[] = getSendersFromQueryResponse(getResponse);
        const senders: SenderData[] = await FirebaseService.getSendersData(sendersIDs);
        const replyMessages = await FirebaseService.getReplyMessages(senders,currentUserID);

        const response: Message[] = [];
        senders.forEach((sender: SenderData) => {
          const senderMessages: MessageDTO[] = messagesDTOs.filter(
            (messageDTO: MessageDTO) => messageDTO.senderID === sender.docRef
          );
          const messageObject: Message = {
            sender: sender,
            receiver: loggedUser,
            messages: senderMessages,
          };
          response.push(messageObject);
        });

        replyMessages.forEach((value: MessageDTO[], key: SenderData) => {
          const replyMessageObject: Message = {
            sender: loggedUser,
            receiver: key,
            messages: value,
          };
          response.push(replyMessageObject);
        });
        const responseSet = new Set(response);
        return [ ...responseSet ];
      })
      .catch();
  }

  async sendReply(request: SendReplyRequest): Promise<Message> {
    const currentUserID: string = getCookie("not-token") || "";
    const messageToAdd = {
      sender: currentUserID,
      receiver: request.receiver.docRef,
      message: request.content,
      createDate: firebase.firestore.Timestamp.fromDate(new Date()),
      read: false,
    };
    return await Database.collection("messages")
      .add(messageToAdd)
      .then((response) => {
        const messageDTO: MessageDTO = {
          docRef: response.id,
          senderID: currentUserID,
          receiverID: request.receiver.docRef,
          content: request.content,
          createDate: firebase.firestore.Timestamp.fromDate(new Date()),
          read: false
        };
        const result: Message = {
          sender: {
            docRef: currentUserID,
            email: firebase.auth().currentUser?.email || "",
            firstName: firebase.auth().currentUser?.displayName?.split(" ")[0] || "",
            lastName: firebase.auth().currentUser?.displayName?.split(" ")[0] || "",
            profileImage: firebase.auth().currentUser?.photoURL || "",
          },
          receiver: request.receiver,
          messages: [messageDTO]
        };
        return result;
      })
      .catch();
  }

  static async getSendersData(ids: string[]): Promise<SenderData[]> {
    const sendersData: SenderData[] = [];
    for (const id of ids) {
      const idSenderData = await FirebaseService.getSenderData(id);
      if (idSenderData) {
        sendersData.push(idSenderData);
      }
    }
    return sendersData;
  }

  static async getReplyMessages(
    ids: SenderData[],
    senderID: string
  ): Promise<Map<SenderData, MessageDTO[]>> {
    const replyMessages = new Map<SenderData, MessageDTO[]>();
    for (const id of ids) {
      const replyMessagesList = await FirebaseService.getSenderReceiverMessage(
        id,
        senderID
      );
      if (replyMessagesList.length > 0) {
        replyMessages.set(id, replyMessagesList);
      }
    }
    return replyMessages;
  }

  static async getSenderData(id: string): Promise<SenderData | undefined> {
    return await Database.collection("users")
      .doc(id)
      .get()
      .then((userResponse: GetDocResponse) =>
        getSenderDataFromDocResponse(userResponse)
      )
      .catch();
  }

  static async getSenderReceiverMessage(
    receiver: SenderData,
    senderID: string
  ): Promise<MessageDTO[]> {
    return await Database.collection("messages")
      .where("sender", "==", senderID)
      .where("receiver", "==", receiver.docRef)
      .get()
      .then((response: QueryResponse) => getMessagesFromQueryResponse(response))
      .catch();
  }
}
