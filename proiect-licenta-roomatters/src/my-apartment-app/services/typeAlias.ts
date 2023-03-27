export type Doc = firebase.firestore.DocumentData;
export type UploadResponse = firebase.storage.UploadTaskSnapshot;

export type GetDocResponse = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
export type QueryResponse = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
export type QueryDocResponse = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
export type QueryDoc = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
export type AddDocResponse = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>

export type FirestoreError = firebase.firestore.FirestoreError;