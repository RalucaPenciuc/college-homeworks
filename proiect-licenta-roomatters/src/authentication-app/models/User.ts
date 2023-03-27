export default interface User {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: firebase.firestore.Timestamp;
  location: string;
  profileImage: string;
  groupID: string;
  savedPosts: string[];
}
