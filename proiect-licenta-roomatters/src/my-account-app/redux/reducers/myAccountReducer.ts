import {
  MyAccountActionType,
  GET_USER_DATA_BEGIN,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  EDIT_POST_BEGIN,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST_BEGIN,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_SAVED_POST_BEGIN,
  DELETE_SAVED_POST_SUCCESS,
  DELETE_SAVED_POST_ERROR,
  FETCH_MESSAGES_BEGIN,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_ERROR,
  SEND_REPLY_SUCCESS,
  SEND_REPLY_BEGIN,
  SEND_REPLY_ERROR,
} from "../actions/types";
import MyAccountState from "../store/store";
import {
  getUserDataBeginHandler,
  getUserDataSuccessHandler,
  getUserDataErrorHandler,
  editPostBeginHandler,
  editPostSuccessHandler,
  editPostErrorHandler,
  deletePostBeginHandler,
  deletePostSuccessHandler,
  deletePostErrorHandler,
  deleteSavedPostBeginHandler,
  deleteSavedPostSuccessHandler,
  deleteSavedPostErrorHandler,
  fetchMessagesBeginHandler,
  fetchMessagesSuccessHandler,
  fetchMessagesErrorHandler,
  sendReplyBeginHandler,
  sendReplySuccessHandler,
  sendReplyErrorHandler,
} from "./reducerHandlers";
import { GenderType } from "../../models/constants/GenderType";
import firebase from "firebase";
import { LocationType } from "../../models/constants/LocationType";

const initialState: MyAccountState = {
  loading: false,
  error: "",
  userData: {
    email: "",
    firstName: "",
    lastName: "",
    gender: GenderType.OTHER,
    birthdate: firebase.firestore.Timestamp.fromDate(new Date()),
    location: LocationType.Cluj,
    profileImage: ""
  },
  myPosts: [],
  savedPosts: [],
  messages: []
};

export default function myAccountReducer(state = initialState, action: MyAccountActionType): MyAccountState {
  switch (action.type) {
    case GET_USER_DATA_BEGIN:
      return getUserDataBeginHandler(state);
    case GET_USER_DATA_SUCCESS:
      return getUserDataSuccessHandler(state, action.payload);
    case GET_USER_DATA_ERROR:
      return getUserDataErrorHandler(state, action.payload);
  
    case DELETE_SAVED_POST_BEGIN:
      return deleteSavedPostBeginHandler(state);
    case DELETE_SAVED_POST_SUCCESS:
      return deleteSavedPostSuccessHandler(state, action.payload);
    case DELETE_SAVED_POST_ERROR:
      return deleteSavedPostErrorHandler(state, action.payload);
  
    case EDIT_POST_BEGIN:
      return editPostBeginHandler(state);
    case EDIT_POST_SUCCESS:
      return editPostSuccessHandler(state, action.payload);
    case EDIT_POST_ERROR:
      return editPostErrorHandler(state, action.payload);

    case DELETE_POST_BEGIN:
      return deletePostBeginHandler(state);
    case DELETE_POST_SUCCESS:
      return deletePostSuccessHandler(state, action.payload);
    case DELETE_POST_ERROR:
      return deletePostErrorHandler(state, action.payload);

    case FETCH_MESSAGES_BEGIN:
      return fetchMessagesBeginHandler(state);
    case FETCH_MESSAGES_SUCCESS:
      return fetchMessagesSuccessHandler(state, action.payload);
    case FETCH_MESSAGES_ERROR:
      return fetchMessagesErrorHandler(state, action.payload);

    case SEND_REPLY_BEGIN:
      return sendReplyBeginHandler(state);
    case SEND_REPLY_SUCCESS:
      return sendReplySuccessHandler(state, action.payload);
    case SEND_REPLY_ERROR:
      return sendReplyErrorHandler(state, action.payload);

    default:
      return state;
  }
}
