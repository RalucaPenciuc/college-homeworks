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
  SEND_REPLY_BEGIN,
  SEND_REPLY_SUCCESS,
  SEND_REPLY_ERROR,
} from "./types";
import UserDataResponse from "../../models/dtos/UserDataResponse";
import Message from "../../models/Message";
import SendReplyRequest from "../../models/SendReplyRequest";

export function getUserDataBegin(): MyAccountActionType {
  return {
    type: GET_USER_DATA_BEGIN,
    payload: undefined,
  };
}
export function getUserDataSuccess(userData: UserDataResponse): MyAccountActionType {
  return {
    type: GET_USER_DATA_SUCCESS,
    payload: userData,
  };
}
export function getUserDataError(error: string): MyAccountActionType {
  return {
    type: GET_USER_DATA_ERROR,
    payload: error,
  };
}


export function deleteSavedPostBegin(postID: string): MyAccountActionType {
  return {
    type: DELETE_SAVED_POST_BEGIN,
    payload: postID,
  };
}
export function deleteSavedPostSuccess(postID: string): MyAccountActionType {
  return {
    type: DELETE_SAVED_POST_SUCCESS,
    payload: postID,
  };
}
export function deleteSavedPostError(error: string): MyAccountActionType {
  return {
    type: DELETE_SAVED_POST_ERROR,
    payload: error,
  };
}


export function editPostBegin(postID: string): MyAccountActionType {
  return {
    type: EDIT_POST_BEGIN,
    payload: postID,
  };
}
export function editPostSuccess(postID: string): MyAccountActionType {
  return {
    type: EDIT_POST_SUCCESS,
    payload: postID,
  };
}
export function editPostError(error: string): MyAccountActionType {
  return {
    type: EDIT_POST_ERROR,
    payload: error,
  };
}


export function deletePostBegin(postID: string): MyAccountActionType {
  return {
    type: DELETE_POST_BEGIN,
    payload: postID,
  };
}
export function deletePostSuccess(postID: string): MyAccountActionType {
  return {
    type: DELETE_POST_SUCCESS,
    payload: postID,
  };
}
export function deletePostError(error: string): MyAccountActionType {
  return {
    type: DELETE_POST_ERROR,
    payload: error,
  };
}


export function fetchMessagesBegin(): MyAccountActionType {
  return {
    type: FETCH_MESSAGES_BEGIN,
    payload: undefined
  }
}
export function fetchMessagesSuccess(messages: Message[]): MyAccountActionType {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: messages
  }
}
export function fetchMessagesError(error: string): MyAccountActionType {
  return {
    type: FETCH_MESSAGES_ERROR,
    payload: error
  }
}


export function sendReplyBegin(request: SendReplyRequest): MyAccountActionType {
  return {
    type: SEND_REPLY_BEGIN,
    payload: request
  }
}
export function sendReplySuccess(result: Message): MyAccountActionType {
  return {
    type: SEND_REPLY_SUCCESS,
    payload: result
  }
}
export function sendReplyError(error: string): MyAccountActionType {
  return {
    type: SEND_REPLY_ERROR,
    payload: error
  }
}