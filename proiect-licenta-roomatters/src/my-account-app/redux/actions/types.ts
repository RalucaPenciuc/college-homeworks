import UserDataResponse from "../../models/dtos/UserDataResponse";
import Message from "../../models/Message";
import SendReplyRequest from "../../models/SendReplyRequest";

export const GET_USER_DATA_BEGIN = "GET_USER_DATA_BEGIN";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_ERROR = "GET_USER_DATA_ERROR";

export interface GetUserDataBegin {
  type: typeof GET_USER_DATA_BEGIN;
  payload: undefined;
}
export interface GetUserDataSuccess {
  type: typeof GET_USER_DATA_SUCCESS;
  payload: UserDataResponse;
}
export interface GetUserDataError {
  type: typeof GET_USER_DATA_ERROR;
  payload: string;
}

export const DELETE_SAVED_POST_BEGIN = "DELETE_SAVED_POST_BEGIN";
export const DELETE_SAVED_POST_SUCCESS = "DELETE_SAVED_POST_SUCCESS";
export const DELETE_SAVED_POST_ERROR = "DELETE_SAVED_POST_ERROR";

export interface DeleteSavedPostBegin {
  type: typeof DELETE_SAVED_POST_BEGIN;
  payload: string;
}
export interface DeleteSavedPostSuccess {
  type: typeof DELETE_SAVED_POST_SUCCESS;
  payload: string;
}
export interface DeleteSavedPostError {
  type: typeof DELETE_SAVED_POST_ERROR;
  payload: string;
}

export const EDIT_POST_BEGIN = "SAVE_POST_BEGIN";
export const EDIT_POST_SUCCESS = "SAVE_POST_SUCCESS";
export const EDIT_POST_ERROR = "SAVE_POST_ERROR";

export interface EditPostBegin {
  type: typeof EDIT_POST_BEGIN;
  payload: string;
}
export interface EditPostSuccess {
  type: typeof EDIT_POST_SUCCESS;
  payload: string;
}
export interface EditPostError {
  type: typeof EDIT_POST_ERROR;
  payload: string;
}

export const DELETE_POST_BEGIN = "DELETE_POST_BEGIN";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_ERROR = "DELETE_POST_ERROR";

export interface DeletePostBegin {
  type: typeof DELETE_POST_BEGIN;
  payload: string;
}
export interface DeletePostSuccess {
  type: typeof DELETE_POST_SUCCESS;
  payload: string;
}
export interface DeletePostError {
  type: typeof DELETE_POST_ERROR;
  payload: string;
}

export const FETCH_MESSAGES_BEGIN = "FETCH_MESSAGES_BEGIN";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_ERROR = "FETCH_MESSAGES_ERROR";

export interface FetchMessagesBegin {
  type: typeof FETCH_MESSAGES_BEGIN;
  payload: undefined
}
export interface FetchMessagesSuccess {
  type: typeof FETCH_MESSAGES_SUCCESS;
  payload: Message[];
}
export interface FetchMessagesError {
  type: typeof FETCH_MESSAGES_ERROR;
  payload: string;
}


export const SEND_REPLY_BEGIN = "SEND_REPLY_BEGIN";
export const SEND_REPLY_SUCCESS = "SEND_REPLY_SUCCESS";
export const SEND_REPLY_ERROR = "SEND_REPLY_ERROR";

export interface SendReplyBegin {
  type: typeof SEND_REPLY_BEGIN;
  payload: SendReplyRequest;
}
export interface SendReplySuccess {
  type: typeof SEND_REPLY_SUCCESS;
  payload: Message;
}
export interface SendReplyError {
  type: typeof SEND_REPLY_ERROR;
  payload: string;
}


export type MyAccountActionType =
  | GetUserDataBegin
  | GetUserDataSuccess
  | GetUserDataError
  | EditPostBegin
  | EditPostSuccess
  | EditPostError
  | DeletePostBegin
  | DeletePostSuccess
  | DeletePostError
  | DeleteSavedPostBegin
  | DeleteSavedPostSuccess
  | DeleteSavedPostError
  | FetchMessagesBegin
  | FetchMessagesSuccess
  | FetchMessagesError
  | SendReplyBegin
  | SendReplySuccess
  | SendReplyError
