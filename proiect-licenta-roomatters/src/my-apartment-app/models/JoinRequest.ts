import Member from "./Member";

export default interface JoinRequest {
  docRef?: string;
  sender: Member; // user info
  receiver: string; // group ID
}
