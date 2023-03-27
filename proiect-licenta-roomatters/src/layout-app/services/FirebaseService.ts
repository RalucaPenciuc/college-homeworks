import firebase from "firebase/app";
import "firebase/auth";
import FirebaseApp from "./firebase-init";

type AuthError = firebase.auth.Error;

export default class FirebaseService {
  private static instance: FirebaseService;

  private constructor() {}

  static getInstance() {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  async logoutUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      FirebaseApp.auth()
        .signOut()
        .then(() => resolve(true))
        .catch((error: AuthError) => reject(error.message));
    });
  }
}
