import UserData from "../../models/UserData";
import RentPost from "../../models/RentPost";
import Message from "../../models/Message";

export default interface MyAccountState {
    loading: boolean;
    error: string;
    userData: UserData | undefined;
    myPosts: RentPost[];
    savedPosts: RentPost[];
    messages: Message[];
}