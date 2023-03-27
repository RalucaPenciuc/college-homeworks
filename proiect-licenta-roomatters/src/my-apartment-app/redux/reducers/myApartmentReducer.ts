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
  ACCEPT_JOIN_REQUEST_BEGIN,
  ACCEPT_JOIN_REQUEST_SUCCESS,
  ACCEPT_JOIN_REQUEST_ERROR,
  REJECT_JOIN_REQUEST_BEGIN,
  REJECT_JOIN_REQUEST_SUCCESS,
  REJECT_JOIN_REQUEST_ERROR,
  DELETE_MEMBER_BEGIN,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_ERROR,
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
  POST_CONTENT_ERROR,
  POST_CONTENT_SUCCESS,
} from "../actions/types";
import {
  getGroupDataBeginHandler,
  getGroupDataSuccessHandler,
  getGroupDataErrorHandler,
  createGroupBeginHandler,
  createGroupSuccessHandler,
  createGroupErrorHandler,
  leaveGroupBeginHandler,
  leaveGroupSuccessHandler,
  leaveGroupErrorHandler,
  searchGroupBeginHandler,
  searchGroupSuccessHandler,
  searchGroupErrorHandler,
  joinGroupSuccessHandler,
  joinGroupBeginHandler,
  joinGroupErrorHandler,
  acceptJoinRequestBeginHandler,
  acceptJoinRequestSuccessHandler,
  acceptJoinRequestGroupErrorHandler,
  rejectJoinRequestBeginHandler,
  rejectJoinRequestSuccessHandler,
  rejectJoinRequestErrorHandler,
  deleteMemberBeginHandler,
  deleteMemberSuccessHandler,
  deleteMemberErrorHandler,
  searchUserBeginHandler,
  searchUserSuccessHandler,
  searchUserErrorHandler,
  inviteUserBeginHandler,
  inviteUserSuccessHandler,
  inviteUserErrorHandler,
  acceptInviteRequestBeginHandler,
  acceptInviteRequestSuccessHandler,
  acceptInviteRequestErrorHandler,
  rejectInviteRequestBeginHandler,
  rejectInviteRequestSuccessHandler,
  rejectInviteRequestErrorHandler,
  postContentSuccessHandler,
  postContentBeginHandler,
  postContentErrorHandler,
} from "./reducerHandlers";
import MyApartmentState from "../store/store";

const initialState: MyApartmentState = {
  loading: false,
  loadingSearchResults: false,
  loadingRequestsResults: false,
  error: "",
  groupID: "0",
  searchGroupResult: {
    docRef: "0",
    name: "",
  },
  searchUserResult: {
    docRef: "0",
    firstName: "",
    lastName: "",
    profileImage: "",
  },
  joinRequestSent: false,
  joinRequests: [],
  inviteRequestSent: false,
  inviteRequests: [],
  groupData: {
    docRef: "0",
    name: "",
  },
  groupMembers: [],
  groupPosts: []
};

export default function myApartmentReducer(state = initialState, action: MyApartmentActionType): MyApartmentState {
  switch (action.type) {
    case GET_GROUP_DATA_BEGIN:
      return getGroupDataBeginHandler(state);
    case GET_GROUP_DATA_SUCCESS:
      return getGroupDataSuccessHandler(state, action.payload);
    case GET_GROUP_DATA_ERROR:
      return getGroupDataErrorHandler(state, action.payload);

    case CREATE_GROUP_BEGIN:
      return createGroupBeginHandler(state);
    case CREATE_GROUP_SUCCESS:
      return createGroupSuccessHandler(state, action.payload);
    case CREATE_GROUP_ERROR:
      return createGroupErrorHandler(state, action.payload);

    case LEAVE_GROUP_BEGIN:
      return leaveGroupBeginHandler(state);
    case LEAVE_GROUP_SUCCESS:
      return leaveGroupSuccessHandler(state);
    case LEAVE_GROUP_ERROR:
      return leaveGroupErrorHandler(state, action.payload);

    case SEARCH_GROUP_BEGIN:
      return searchGroupBeginHandler(state);
    case SEARCH_GROUP_SUCCESS:
      return searchGroupSuccessHandler(state, action.payload);
    case SEARCH_GROUP_ERROR:
      return searchGroupErrorHandler(state, action.payload);

    case JOIN_GROUP_BEGIN:
      return joinGroupBeginHandler(state);
    case JOIN_GROUP_SUCCESS:
      return joinGroupSuccessHandler(state);
    case JOIN_GROUP_ERROR:
      return joinGroupErrorHandler(state, action.payload);

    case ACCEPT_JOIN_REQUEST_BEGIN:
      return acceptJoinRequestBeginHandler(state);
    case ACCEPT_JOIN_REQUEST_SUCCESS:
      return acceptJoinRequestSuccessHandler(state, action.payload);
    case ACCEPT_JOIN_REQUEST_ERROR:
      return acceptJoinRequestGroupErrorHandler(state, action.payload);

    case REJECT_JOIN_REQUEST_BEGIN:
      return rejectJoinRequestBeginHandler(state);
    case REJECT_JOIN_REQUEST_SUCCESS:
      return rejectJoinRequestSuccessHandler(state, action.payload);
    case REJECT_JOIN_REQUEST_ERROR:
      return rejectJoinRequestErrorHandler(state, action.payload);

    case DELETE_MEMBER_BEGIN:
      return deleteMemberBeginHandler(state);
    case DELETE_MEMBER_SUCCESS:
      return deleteMemberSuccessHandler(state, action.payload);
    case DELETE_MEMBER_ERROR:
      return deleteMemberErrorHandler(state, action.payload);

    case SEARCH_USER_BEGIN:
      return searchUserBeginHandler(state);
    case SEARCH_USER_SUCCESS:
      return searchUserSuccessHandler(state, action.payload);
    case SEARCH_USER_ERROR:
      return searchUserErrorHandler(state, action.payload);

    case INVITE_USER_BEGIN:
      return inviteUserBeginHandler(state);
    case INVITE_USER_SUCCESS:
      return inviteUserSuccessHandler(state, action.payload);
    case INVITE_USER_ERROR:
      return inviteUserErrorHandler(state, action.payload);

    case ACCEPT_INVITE_REQUEST_BEGIN:
      return acceptInviteRequestBeginHandler(state);
    case ACCEPT_INVITE_REQUEST_SUCCESS:
      return acceptInviteRequestSuccessHandler(state, action.payload);
    case ACCEPT_INVITE_REQUEST_ERROR:
      return acceptInviteRequestErrorHandler(state, action.payload);

    case REJECT_INVITE_REQUEST_BEGIN:
      return rejectInviteRequestBeginHandler(state);
    case REJECT_INVITE_REQUEST_SUCCESS:
      return rejectInviteRequestSuccessHandler(state, action.payload);
    case REJECT_INVITE_REQUEST_ERROR:
      return rejectInviteRequestErrorHandler(state, action.payload);

    case POST_CONTENT_BEGIN:
      return postContentBeginHandler(state);
    case POST_CONTENT_SUCCESS:
      return postContentSuccessHandler(state, action.payload);
    case POST_CONTENT_ERROR:
      return postContentErrorHandler(state, action.payload);

    default:
      return state;
  }
}
