import {
  MyApartmentActionType,
  GET_GROUP_DATA_BEGIN,
  GET_GROUP_DATA_SUCCESS,
  GET_GROUP_DATA_ERROR,
  CREATE_GROUP_BEGIN,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_ERROR,
  LEAVE_GROUP_BEGIN,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_ERROR,
  SEARCH_GROUP_BEGIN,
  SEARCH_GROUP_SUCCESS,
  SEARCH_GROUP_ERROR,
  JOIN_GROUP_BEGIN,
  JOIN_GROUP_SUCCESS,
  JOIN_GROUP_ERROR,
  DELETE_MEMBER_BEGIN,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_ERROR,
  ACCEPT_JOIN_REQUEST_BEGIN,
  ACCEPT_JOIN_REQUEST_SUCCESS,
  ACCEPT_JOIN_REQUEST_ERROR,
  REJECT_JOIN_REQUEST_BEGIN,
  REJECT_JOIN_REQUEST_SUCCESS,
  REJECT_JOIN_REQUEST_ERROR,
  SEARCH_USER_BEGIN,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_ERROR,
  INVITE_USER_BEGIN,
  INVITE_USER_SUCCESS,
  INVITE_USER_ERROR,
  ACCEPT_INVITE_REQUEST_BEGIN,
  ACCEPT_INVITE_REQUEST_SUCCESS,
  ACCEPT_INVITE_REQUEST_ERROR,
  REJECT_INVITE_REQUEST_BEGIN,
  REJECT_INVITE_REQUEST_SUCCESS,
  REJECT_INVITE_REQUEST_ERROR,
  POST_CONTENT_BEGIN,
  POST_CONTENT_SUCCESS,
  POST_CONTENT_ERROR,
} from "./types";
import Group from "../../models/Group";
import { GroupData } from "../../models/GroupData";
import JoinRequest from "../../models/JoinRequest";
import Member from "../../models/Member";
import InviteRequestDTO from "../../models/dtos/InviteRequestDTO";
import InviteRequest from "../../models/InviteRequest";
import InviteResponseDTO from "../../models/dtos/InviteResponseDTO";
import Post from "../../models/Post";
import PostContentDTO from "../../models/dtos/PostContentDTO";

export function getGroupDataBegin(): MyApartmentActionType {
  return {
    type: GET_GROUP_DATA_BEGIN,
    payload: undefined,
  };
}
export function getGroupDataSuccess(groupData: GroupData): MyApartmentActionType {
  return {
    type: GET_GROUP_DATA_SUCCESS,
    payload: groupData,
  };
}
export function getGroupDataError(error: string): MyApartmentActionType {
  return {
    type: GET_GROUP_DATA_ERROR,
    payload: error,
  };
}


export function createGroupBegin(name: string): MyApartmentActionType {
  return {
    type: CREATE_GROUP_BEGIN,
    payload: name,
  };
}
export function createGroupSuccess(group: GroupData): MyApartmentActionType {
  return {
    type: CREATE_GROUP_SUCCESS,
    payload: group,
  };
}
export function createGroupError(error: string): MyApartmentActionType {
  return {
    type: CREATE_GROUP_ERROR,
    payload: error,
  };
}


export function leaveGroupBegin(): MyApartmentActionType {
  return {
    type: LEAVE_GROUP_BEGIN,
    payload: undefined,
  };
}
export function leaveGroupSuccess(): MyApartmentActionType {
  return {
    type: LEAVE_GROUP_SUCCESS,
    payload: undefined,
  };
}
export function leaveGroupError(error: string): MyApartmentActionType {
  return {
    type: LEAVE_GROUP_ERROR,
    payload: error,
  };
}


export function searchGroupBegin(name: string): MyApartmentActionType {
  return {
    type: SEARCH_GROUP_BEGIN,
    payload: name,
  };
}
export function searchGroupSuccess(group: Group): MyApartmentActionType {
  return {
    type: SEARCH_GROUP_SUCCESS,
    payload: group,
  };
}
export function searchGroupError(error: string): MyApartmentActionType {
  return {
    type: SEARCH_GROUP_ERROR,
    payload: error,
  };
}


export function joinGroupBegin(groupID: string): MyApartmentActionType {
  return {
    type: JOIN_GROUP_BEGIN,
    payload: groupID,
  };
}
export function joinGroupSuccess(): MyApartmentActionType {
  return {
    type: JOIN_GROUP_SUCCESS,
    payload: undefined,
  };
}
export function joinGroupError(error: string): MyApartmentActionType {
  return {
    type: JOIN_GROUP_ERROR,
    payload: error,
  };
}


export function acceptJoinRequestBegin(joinRequest: JoinRequest): MyApartmentActionType {
  return {
    type: ACCEPT_JOIN_REQUEST_BEGIN,
    payload: joinRequest,
  };
}
export function acceptJoinRequestSuccess(joinRequest: JoinRequest): MyApartmentActionType {
  return {
    type: ACCEPT_JOIN_REQUEST_SUCCESS,
    payload: joinRequest,
  };
}
export function acceptJoinRequestError(error: string): MyApartmentActionType {
  return {
    type: ACCEPT_JOIN_REQUEST_ERROR,
    payload: error,
  };
}


export function rejectJoinRequestBegin(joinRequest: JoinRequest): MyApartmentActionType {
  return {
    type: REJECT_JOIN_REQUEST_BEGIN,
    payload: joinRequest,
  };
}
export function rejectJoinRequestSuccess(requestID: string): MyApartmentActionType {
  return {
    type: REJECT_JOIN_REQUEST_SUCCESS,
    payload: requestID,
  };
}
export function rejectJoinRequestError(error: string): MyApartmentActionType {
  return {
    type: REJECT_JOIN_REQUEST_ERROR,
    payload: error,
  };
}


export function deleteMemberBegin(memberID: string): MyApartmentActionType {
  return {
    type: DELETE_MEMBER_BEGIN,
    payload: memberID,
  };
}

export function deleteMemberSuccess(memberID: string): MyApartmentActionType {
  return {
    type: DELETE_MEMBER_SUCCESS,
    payload: memberID,
  };
}
export function deleteMemberError(error: string): MyApartmentActionType {
  return {
    type: DELETE_MEMBER_ERROR,
    payload: error,
  };
}


export function searchUserBegin(email: string): MyApartmentActionType {
  return {
    type: SEARCH_USER_BEGIN,
    payload: email,
  };
}
export function searchUserSuccess(user: Member): MyApartmentActionType {
  return {
    type: SEARCH_USER_SUCCESS,
    payload: user,
  };
}
export function searchUserError(error: string): MyApartmentActionType {
  return {
    type: SEARCH_USER_ERROR,
    payload: error,
  };
}


export function inviteUserBegin(request: InviteRequestDTO): MyApartmentActionType {
  return {
    type: INVITE_USER_BEGIN,
    payload: request,
  };
}
export function inviteUserSuccess(inviteRequest: InviteRequest): MyApartmentActionType {
  return {
    type: INVITE_USER_SUCCESS,
    payload: inviteRequest,
  };
}
export function inviteUserError(error: string): MyApartmentActionType {
  return {
    type: INVITE_USER_ERROR,
    payload: error,
  };
}


export function acceptInviteRequestBegin(inviteRequest: InviteRequest): MyApartmentActionType {
  return {
    type: ACCEPT_INVITE_REQUEST_BEGIN,
    payload: inviteRequest,
  };
}
export function acceptInviteRequestSuccess(inviteRequest: InviteResponseDTO): MyApartmentActionType {
  return {
    type: ACCEPT_INVITE_REQUEST_SUCCESS,
    payload: inviteRequest,
  };
}
export function acceptInviteRequestError(error: string): MyApartmentActionType {
  return {
    type: ACCEPT_INVITE_REQUEST_ERROR,
    payload: error,
  };
}


export function rejectInviteRequestBegin(inviteRequest: InviteRequest): MyApartmentActionType {
  return {
    type: REJECT_INVITE_REQUEST_BEGIN,
    payload: inviteRequest,
  };
}
export function rejectInviteRequestSuccess(requestID: string): MyApartmentActionType {
  return {
    type: REJECT_INVITE_REQUEST_SUCCESS,
    payload: requestID,
  };
}
export function rejectInviteRequestError(error: string): MyApartmentActionType {
  return {
    type: REJECT_INVITE_REQUEST_ERROR,
    payload: error,
  };
}


export function postContentBegin(request: PostContentDTO): MyApartmentActionType {
  return {
    type: POST_CONTENT_BEGIN,
    payload: request
  }
}
export function postContentSuccess(post: Post): MyApartmentActionType {
  return {
    type: POST_CONTENT_SUCCESS,
    payload: post
  }
} 
export function postContentError(error: string): MyApartmentActionType {
  return {
    type: POST_CONTENT_ERROR,
    payload: error
  }
}
