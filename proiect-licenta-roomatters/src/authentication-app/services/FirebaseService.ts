import User from "../models/User";
import { Database, FirebaseAuth, RootBucket } from "./firebase-init";
import { GenderType } from "../models/constants/gender";
import firebase from "firebase";
import { LocationType } from "../models/constants/location";

type AuthResponse = firebase.auth.UserCredential;
type QueryResponse = firebase.firestore.QuerySnapshot<
  firebase.firestore.DocumentData
>;
type CreateResponse = firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>;
type AuthError = firebase.auth.Error;
type FirestoreError = firebase.firestore.FirestoreError;

export default class FirebaseService {
  private static instance: FirebaseService;

  private constructor() {}

  static getInstance() {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  async loginUser(email: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      FirebaseAuth.signInWithEmailAndPassword(email, password)
        .then((response: AuthResponse) =>
          resolve(
            new Promise((resolveId, rejectId) => {
              Database.collection("users")
                .where("email", "==", email)
                .get()
                .then((result: QueryResponse) => resolveId(result.docs[0].id))
                .catch((error: FirestoreError) => rejectId(error));
            })
          )
        )
        .catch((error: AuthError) => reject(error.message));
    });
  }

  async signUpUser(email: string, password: string, firstName: string, lastName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      FirebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          resolve(
            new Promise(async (resolveUpdate, rejectUpdate) => {
              const profileImageRef = RootBucket.child("users/profile-image-default.png");
              const profileImageURL: string = await profileImageRef.getDownloadURL();
              FirebaseAuth.currentUser
                ?.updateProfile({
                  displayName: firstName + " " + lastName,
                  photoURL: profileImageURL
                })
                .then(() => {
                  const userToAdd: User = {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    gender: GenderType.OTHER,
                    birthDate: firebase.firestore.Timestamp.fromDate(new Date()),
                    location: LocationType.Cluj,
                    profileImage: profileImageURL,
                    groupID: "0",
                    savedPosts: [],
                  };
                  resolveUpdate(
                    new Promise((resolveCreate, rejectCreate) =>
                      Database.collection("users")
                        .add(userToAdd)
                        .then((response: CreateResponse) =>
                          resolveCreate(response.id)
                        )
                        .catch((error: FirestoreError) => rejectCreate(error))
                    )
                  );
                })
                .catch((error) => rejectUpdate(error));
            })
          );
        })
        .catch((error: AuthError) => reject(error));
    });
  }
}
