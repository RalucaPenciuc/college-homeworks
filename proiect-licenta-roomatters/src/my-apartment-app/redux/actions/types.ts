import Group from "../../models/Group";
import { GroupData } from "../../models/GroupData";
import JoinRequest from "../../models/JoinRequest";
import Member from "../../models/Member";
import InviteRequestDTO from "../../models/dtos/InviteRequestDTO";
import InviteRequest from "../../models/InviteRequest";
import InviteResponseDTO from "../../models/dtos/InviteResponseDTO";
import Post from "../../models/Post";
import PostContentDTO from "../../models/dtos/PostContentDTO";

export const GET_GROUP_DATA_BEGIN = "GET_GROUP_DATA_BEGIN";
export const GET_GROUP_DATA_SUCCESS = "GET_GROUP_DATA_SUCCESS";
export const GET_GROUP_DATA_ERROR = "GET_GROUP_DATA_ERROR";

export interface GetGroupDataBegin {
  type: typeof GET_GROUP_DATA_BEGIN;
  payload: undefined;
}

export interface GetGroupDataSuccess {
  type: typeof GET_GROUP_DATA_SUCCESS;
  payload: GroupData;
}

export interface GetGroupDataError {
  type: typeof GET_GROUP_DATA_ERROR;
  payload: string;
}

export const CREATE_GROUP_BEGIN = "CREATE_GROUP_BEGIN";
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS";
export const CREATE_GROUP_ERROR = "CREATE_GROUP_ERROR";

export interface CreateGroupBegin {
  type: typeof CREATE_GROUP_BEGIN;
  payload: string;
}

export interface CreateGroupSuccess {
  type: typeof CREATE_GROUP_SUCCESS;
  payload: GroupData;
}

export interface CreateGroupError {
  type: typeof CREATE_GROUP_ERROR;
  payload: string;
}

export const LEAVE_GROUP_BEGIN = "LEAVE_GROUP_BEGIN";
export const LEAVE_GROUP_SUCCESS = "LEAVE_GROUP_SUCCESS";
export const LEAVE_GROUP_ERROR = "LEAVE_GROUP_ERROR";

export interface LeaveGroupBegin {
  type: typeof LEAVE_GROUP_BEGIN;
  payload: undefined;
}

export interface LeaveGroupSuccess {
  type: typeof LEAVE_GROUP_SUCCESS;
  payload: undefined;
}

export interface LeaveGroupError {
  type: typeof LEAVE_GROUP_ERROR;
  payload: string;
}

export const SEARCH_GROUP_BEGIN = "SEARCH_GROUP_BEGIN";
export const SEARCH_GROUP_SUCCESS = "SEARCH_GROUP_SUCCESS";
export const SEARCH_GROUP_ERROR = "SEARCH_GROUP_ERROR";

export interface SearchGroupBegin {
  type: typeof SEARCH_GROUP_BEGIN;
  payload: string;
}

export interface SearchGroupSuccess {
  type: typeof SEARCH_GROUP_SUCCESS;
  payload: Group;
}

export interface SearchGroupError {
  type: typeof SEARCH_GROUP_ERROR;
  payload: string;
}

export const JOIN_GROUP_BEGIN = "JOIN_GROUP_BEGIN";
export const JOIN_GROUP_SUCCESS = "JOIN_GROUP_SUCCESS";
export const JOIN_GROUP_ERROR = "JOIN_GROUP_ERROR";

export interface JoinGroupBegin {
  type: typeof JOIN_GROUP_BEGIN;
  payload: string;
}

export interface JoinGroupSuccess {
  type: typeof JOIN_GROUP_SUCCESS;
  payload: undefined;
}

export interface JoinGroupError {
  type: typeof JOIN_GROUP_ERROR;
  payload: string;
}

export const ACCEPT_JOIN_REQUEST_BEGIN = "ACCEPT_JOIN_REQUEST_BEGIN";
export const ACCEPT_JOIN_REQUEST_SUCCESS = "ACCEPT_JOIN_REQUEST_SUCCESS";
export const ACCEPT_JOIN_REQUEST_ERROR = "ACCEPT_JOIN_REQUEST_ERROR";

export interface AcceptJoinRequestBegin {
  type: typeof ACCEPT_JOIN_REQUEST_BEGIN;
  payload: JoinRequest;
}

export interface AcceptJoinRequestSuccess {
  type: typeof ACCEPT_JOIN_REQUEST_SUCCESS;
  payload: JoinRequest;
}

export interface AcceptJoinRequestError {
  type: typeof ACCEPT_JOIN_REQUEST_ERROR;
  payload: string;
}

export const REJECT_JOIN_REQUEST_BEGIN = "REJECT_JOIN_REQUEST_BEGIN";
export const REJECT_JOIN_REQUEST_SUCCESS = "REJECT_JOIN_REQUEST_SUCCESS";
export const REJECT_JOIN_REQUEST_ERROR = "REJECT_JOIN_REQUEST_ERROR";

export interface RejectJoinRequestBegin {
  type: typeof REJECT_JOIN_REQUEST_BEGIN;
  payload: JoinRequest;
}

export interface RejectJoinRequestSuccess {
  type: typeof REJECT_JOIN_REQUEST_SUCCESS;
  payload: string;
}

export interface RejectJoinRequestError {
  type: typeof REJECT_JOIN_REQUEST_ERROR;
  payload: string;
}

export const DELETE_MEMBER_BEGIN = "DELETE_MEMBER_BEGIN";
export const DELETE_MEMBER_SUCCESS = "DELETE_MEMBER_SUCCESS";
export const DELETE_MEMBER_ERROR = "DELETE_MEMBER_ERROR";

export interface DeleteMemberBegin {
  type: typeof DELETE_MEMBER_BEGIN;
  payload: string;
}

export interface DeleteMemberSuccess {
  type: typeof DELETE_MEMBER_SUCCESS;
  payload: string;
}

export interface DeleteMemberError {
  type: typeof DELETE_MEMBER_ERROR;
  payload: string;
}

export const SEARCH_USER_BEGIN = "SEARCH_USER_BEGIN";
export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
export const SEARCH_USER_ERROR = "SEARCH_USER_ERROR";

export interface SearchUserBegin {
  type: typeof SEARCH_USER_BEGIN;
  payload: string;
}

export interface SearchUserSuccess {
  type: typeof SEARCH_USER_SUCCESS;
  payload: Member;
}

export interface SearchUserError {
  type: typeof SEARCH_USER_ERROR;
  payload: string;
}

export const INVITE_USER_BEGIN = "INVITE_USER_BEGIN";
export const INVITE_USER_SUCCESS = "INVITE_USER_SUCCESS";
export const INVITE_USER_ERROR = "INVITE_USER_ERROR";

export interface InviteUserBegin {
  type: typeof INVITE_USER_BEGIN;
  payload: InviteRequestDTO;
}

export interface InviteUserSuccess {
  type: typeof INVITE_USER_SUCCESS;
  payload: InviteRequest;
}

export interface InviteUserError {
  type: typeof INVITE_USER_ERROR;
  payload: string;
}

export const ACCEPT_INVITE_REQUEST_BEGIN = "ACCEPT_INVITE_REQUEST_BEGIN";
export const ACCEPT_INVITE_REQUEST_SUCCESS = "ACCEPT_INVITE_REQUEST_SUCCESS";
export const ACCEPT_INVITE_REQUEST_ERROR = "ACCEPT_INVITE_REQUEST_ERROR";

export interface AcceptInviteRequestBegin {
  type: typeof ACCEPT_INVITE_REQUEST_BEGIN;
  payload: InviteRequest;
}
export interface AcceptInviteRequestSuccess {
  type: typeof ACCEPT_INVITE_REQUEST_SUCCESS;
  payload: InviteResponseDTO;
}
export interface AcceptInviteRequestError {
  type: typeof ACCEPT_INVITE_REQUEST_ERROR;
  payload: string;
}

export const REJECT_INVITE_REQUEST_BEGIN = "REJECT_INVITE_REQUEST_BEGIN";
export const REJECT_INVITE_REQUEST_SUCCESS = "REJECT_INVITE_REQUEST_SUCCESS";
export const REJECT_INVITE_REQUEST_ERROR = "REJECT_INVITE_REQUEST_ERROR";

export interface RejectInviteRequestBegin {
  type: typeof REJECT_INVITE_REQUEST_BEGIN;
  payload: InviteRequest;
}
export interface RejectInviteRequestSuccess {
  type: typeof REJECT_INVITE_REQUEST_SUCCESS;
  payload: string;
}
export interface RejectInviteRequestError {
  type: typeof REJECT_INVITE_REQUEST_ERROR;
  payload: string;
}

export const POST_CONTENT_BEGIN = "POST_CONTENT_BEGIN";
export const POST_CONTENT_SUCCESS = "POST_CONTET_SUCCESS";
export const POST_CONTENT_ERROR = "POST_CONTETN_ERROR";

export interface PostContentBegin {
  type: typeof POST_CONTENT_BEGIN;
  payload: PostContentDTO;
}
export interface PostContentSuccess {
  type: typeof POST_CONTENT_SUCCESS;
  payload: Post;
}
export interface PostContentError {
  type: typeof POST_CONTENT_ERROR;
  payload: string;
}

export type MyApartmentActionType =
  | GetGroupDataBegin
  | GetGroupDataSuccess
  | GetGroupDataError
  | CreateGroupBegin
  | CreateGroupSuccess
  | CreateGroupError
  | LeaveGroupBegin
  | LeaveGroupSuccess
  | LeaveGroupError
  | SearchGroupBegin
  | SearchGroupSuccess
  | SearchGroupError
  | JoinGroupBegin
  | JoinGroupSuccess
  | JoinGroupError
  | AcceptJoinRequestBegin
  | AcceptJoinRequestSuccess
  | AcceptJoinRequestError
  | RejectJoinRequestBegin
  | RejectJoinRequestSuccess
  | RejectJoinRequestError
  | DeleteMemberBegin
  | DeleteMemberSuccess
  | DeleteMemberError
  | SearchUserBegin
  | SearchUserSuccess
  | SearchUserError
  | InviteUserBegin
  | InviteUserSuccess
  | InviteUserError
  | AcceptInviteRequestBegin
  | AcceptInviteRequestSuccess
  | AcceptInviteRequestError
  | RejectInviteRequestBegin
  | RejectInviteRequestSuccess
  | RejectInviteRequestError
  | PostContentBegin
  | PostContentSuccess
  | PostContentError;
