import Member from "./Member";
import Group from "./Group";

export default interface InviteRequest {
  docRef?: string;
  sender: Member; // sender user info
  receiver: string; // receiver user ID
  group: Group;
}
