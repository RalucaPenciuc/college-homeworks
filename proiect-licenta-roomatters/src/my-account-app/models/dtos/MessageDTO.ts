export default interface MessageDTO {
  docRef: string;
  createDate: firebase.firestore.Timestamp;
  senderID: string;
  receiverID: string;
  content: string;
  read: boolean;
}
