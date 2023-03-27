import Member from "./Member";
import JoinRequest from "./JoinRequest";
import InviteRequest from "./InviteRequest";
import Post from "./Post";

export interface GroupData {
  docRef: string;
  name: string;
  members: Member[];
  joinRequests: JoinRequest[];
  inviteRequests: InviteRequest[];
  posts: Post[];
}
