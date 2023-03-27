import UserData from "../UserData";
import RentPost from "../RentPost";

export default interface UserDataResponse {
  userData: UserData;
  myPosts: RentPost[];
  savedPosts: RentPost[];
}
