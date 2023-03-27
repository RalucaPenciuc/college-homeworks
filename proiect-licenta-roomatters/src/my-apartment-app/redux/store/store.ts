import Group from "../../models/Group";
import Member from "../../models/Member";
import JoinRequest from "../../models/JoinRequest";
import InviteRequest from "../../models/InviteRequest";
import Post from "../../models/Post";

export default interface MyApartmentState {
  loading: boolean;
  loadingSearchResults: boolean;
  loadingRequestsResults: boolean;
  error: string;

  groupID: string;

  searchGroupResult: Group;
  searchUserResult: Member; 

  joinRequestSent: boolean;
  joinRequests: JoinRequest[];

  inviteRequestSent: boolean;
  inviteRequests: InviteRequest[];
  
  groupData: Group;
  groupMembers: Member[];
  groupPosts: Post[];
}
