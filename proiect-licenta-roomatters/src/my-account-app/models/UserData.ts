import { GenderType } from "./constants/GenderType";
import { LocationType } from "./constants/LocationType";

export default interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  gender: GenderType;
  birthdate: firebase.firestore.Timestamp;
  location: LocationType;
  profileImage: string;
}
