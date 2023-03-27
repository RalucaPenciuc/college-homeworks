import MyApartmentState from "../store/store";
import Group from "../../models/Group";
import { GroupData } from "../../models/GroupData";
import JoinRequest from "../../models/JoinRequest";
import Member from "../../models/Member";
import InviteRequest from "../../models/InviteRequest";
import InviteResponseDTO from "../../models/dtos/InviteResponseDTO";
import Post from "../../models/Post";

export function getGroupDataBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState};
    newState.loading = true;
    newState.joinRequestSent = false;
    newState.error = "";
    newState.groupID = "0";
    newState.groupData = { docRef: "0", name: ""}
    newState.groupMembers = [];
    newState.joinRequests = [];
    newState.inviteRequests = [];
    newState.groupPosts = [];
    return newState;
}
export function getGroupDataSuccessHandler(oldState: MyApartmentState, groupData: GroupData): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    newState.groupID = groupData.docRef;
    newState.groupData.docRef = groupData.docRef;
    newState.groupData.name = groupData.name;
    newState.groupMembers = groupData.members;
    newState.joinRequests = groupData.joinRequests;
    newState.inviteRequests = groupData.inviteRequests;
    newState.groupPosts = groupData.posts;
    return newState;
}
export function getGroupDataErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    newState.groupID = "0";
    newState.groupData = { docRef: "0", name: ""}
    newState.groupMembers = [];
    newState.joinRequests = [];
    newState.inviteRequests = [];
    newState.groupPosts = [];
    return newState;
}


export function createGroupBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState};
    newState.loading = true;
    newState.joinRequestSent = false;
    newState.error = "";
    return newState;
}
export function createGroupSuccessHandler(oldState: MyApartmentState, group: GroupData): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    newState.groupData = {
        docRef: group.docRef,
        name: group.name
    }
    newState.groupID = group.docRef;
    newState.groupMembers = group.members
    return newState;
}
export function createGroupErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}


export function leaveGroupBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState};
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function leaveGroupSuccessHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    newState.groupID = "0";
    newState.groupData = {
        docRef: "0",
        name: ""
    }
    newState.groupMembers = [];
    return newState;
}
export function leaveGroupErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}


export function searchGroupBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState};
    newState.loadingSearchResults = true;
    newState.joinRequestSent = false;
    newState.error = "";
    newState.searchGroupResult = {
        docRef: "0",
        name: ""
    }
    return newState;
}
export function searchGroupSuccessHandler(oldState: MyApartmentState, result: Group): MyApartmentState {
    const newState = {...oldState};
    newState.loadingSearchResults = false;
    newState.error = "";
    newState.searchGroupResult = result;
    return newState;
}
export function searchGroupErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loadingSearchResults = false;
    newState.error = error;
    newState.searchGroupResult = {
        docRef: "0",
        name: ""
    }
    return newState;
}


export function joinGroupBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState};
    newState.loadingSearchResults = true;
    newState.joinRequestSent = false;
    newState.error = "";
    return newState;
}
export function joinGroupSuccessHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState};
    newState.loadingSearchResults = false;
    newState.joinRequestSent = true;
    newState.error = "";
    newState.searchGroupResult = {
        docRef: "0",
        name: ""
    }
    return newState;
}
export function joinGroupErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loadingSearchResults = false;
    newState.joinRequestSent = false;
    newState.error = error;
    return newState;
}


export function acceptJoinRequestBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState}
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function acceptJoinRequestSuccessHandler(oldState: MyApartmentState, request: JoinRequest): MyApartmentState {
    const newState = {...oldState}
    newState.loading = false;
    newState.error = "";
    newState.joinRequests = oldState.joinRequests.filter((req: JoinRequest) => req.docRef !== request.docRef);
    newState.groupMembers.push(request.sender);
    return newState;
}
export function acceptJoinRequestGroupErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}


export function rejectJoinRequestBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState}
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function rejectJoinRequestSuccessHandler(oldState: MyApartmentState, requestID: string): MyApartmentState {
    const newState = {...oldState}
    newState.loading = false;
    newState.error = "";
    newState.joinRequests = oldState.joinRequests.filter((req: JoinRequest) => req.docRef !== requestID);
    return newState;
}
export function rejectJoinRequestErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}


export function deleteMemberBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState}
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function deleteMemberSuccessHandler(oldState: MyApartmentState, memberID: string): MyApartmentState {
    const newState = {...oldState}
    newState.loading = false;
    newState.error = "";
    newState.groupMembers = oldState.groupMembers.filter((member: Member) => member.docRef !== memberID);
    return newState;
}
export function deleteMemberErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}


export function searchUserBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState}
    newState.loadingSearchResults = true;
    newState.inviteRequestSent = false;
    newState.error = "";
    newState.searchUserResult = {
        docRef: "0",
        firstName: "",
        lastName: "",
        profileImage: ""
    }
    return newState;
}
export function searchUserSuccessHandler(oldState: MyApartmentState, user: Member): MyApartmentState {
    const newState = {...oldState}
    newState.loadingSearchResults = false;
    newState.error = "";
    newState.searchUserResult = user;
    return newState;
}
export function searchUserErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loadingSearchResults = false;
    newState.error = error;
    newState.searchUserResult = {
        docRef: "0",
        firstName: "",
        lastName: "",
        profileImage: ""
    }
    return newState;
}


export function inviteUserBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState}
    newState.loadingSearchResults = true;
    newState.inviteRequestSent = false;
    newState.error = "";
    return newState;
}
export function inviteUserSuccessHandler(oldState: MyApartmentState, inviteRequest: InviteRequest): MyApartmentState {
    const newState = {...oldState}
    newState.loadingSearchResults = false;
    newState.inviteRequestSent = true;
    newState.error = "";
    newState.searchUserResult = {
        docRef: "0",
        firstName: "",
        lastName: "",
        profileImage: ""
    }
    return newState;
}
export function inviteUserErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loadingSearchResults = false;
    newState.inviteRequestSent = false;
    newState.error = error;
    return newState;
}


export function acceptInviteRequestBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState}
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function acceptInviteRequestSuccessHandler(oldState: MyApartmentState, response: InviteResponseDTO): MyApartmentState {
    const newState = {...oldState}
    newState.loading = false;
    newState.error = "";
    newState.groupID = response.groupData.docRef || "0";
    newState.joinRequests = response.groupData.joinRequests;
    newState.inviteRequests = oldState.inviteRequests.filter((req: InviteRequest) => req.docRef !== response.requestID);
    newState.groupMembers = response.groupData.members;
    newState.groupData = {
        docRef: response.groupData.docRef,
        name: response.groupData.name
    }
    return newState;
}
export function acceptInviteRequestErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}


export function rejectInviteRequestBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState}
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function rejectInviteRequestSuccessHandler(oldState: MyApartmentState, requestID: string): MyApartmentState {
    const newState = {...oldState}
    newState.loading = false;
    newState.error = "";
    newState.inviteRequests = oldState.inviteRequests.filter((req: InviteRequest) => req.docRef !== requestID);
    return newState;
}
export function rejectInviteRequestErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}


export function postContentBeginHandler(oldState: MyApartmentState): MyApartmentState {
    const newState = {...oldState};
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function postContentSuccessHandler(oldState: MyApartmentState, post: Post): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    let newGroupPosts = newState.groupPosts.slice();
    newGroupPosts.splice(0, 0, post);
    newState.groupPosts = newGroupPosts;
    return newState;
}
export function postContentErrorHandler(oldState: MyApartmentState, error: string): MyApartmentState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}