import RentPost from "../../models/RentPost";
import RentPostDTO from "../../models/dtos/RentPostDTO";
import MessageDTO from "../../models/dtos/MessageDTO";

export const FETCH_RENT_POSTS_BEGIN = "FETCH_RENT_POSTS_BEGIN";
export const FETCH_RENT_POSTS_SUCCESS = "FETCH_RENT_POSTS_SUCCESS";
export const FETCH_RENT_POSTS_ERROR = "FETCH_RENT_POSTS_ERROR";

export interface FetchRentPostsBegin {
  type: typeof FETCH_RENT_POSTS_BEGIN;
  payload: undefined;
}
export interface FetchRentPostsSuccess {
  type: typeof FETCH_RENT_POSTS_SUCCESS;
  payload: RentPost[];
}
export interface FetchRentPostsError {
  type: typeof FETCH_RENT_POSTS_ERROR;
  payload: string;
}

export const CREATE_RENT_POST_BEGIN = "CREATE_RENT_POST_BEGIN";
export const CREATE_RENT_POST_SUCCESS = "CREATE_RENT_POST_SUCCESS";
export const CREATE_RENT_POST_ERROR = "CREATE_RENT_POST_ERROR";

export interface CreateRentPostBegin {
  type: typeof CREATE_RENT_POST_BEGIN;
  payload: RentPostDTO;
}
export interface CreateRentPostSuccess {
  type: typeof CREATE_RENT_POST_SUCCESS;
  payload: RentPost;
}
export interface CreateRentPostError {
  type: typeof CREATE_RENT_POST_ERROR;
  payload: string;
}

export const SAVE_POST_BEGIN = "SAVE_POST_BEGIN";
export const SAVE_POST_SUCCESS = "SAVE_POST_SUCCESS";
export const SAVE_POST_ERROR = "SAVE_POST_ERROR";

export interface SavePostBegin {
  type: typeof SAVE_POST_BEGIN;
  payload: string;
}
export interface SavePostSuccess {
  type: typeof SAVE_POST_SUCCESS;
  payload: string;
}
export interface SavePostError {
  type: typeof SAVE_POST_ERROR;
  payload: string;
}

export const UNSAVE_POST_BEGIN = "UNSAVE_POST_BEGIN";
export const UNSAVE_POST_SUCCESS = "UNSAVE_POST_SUCCESS";
export const UNSAVE_POST_ERROR = "UNSAVE_POST_ERROR";

export interface UnsavePostBegin {
  type: typeof UNSAVE_POST_BEGIN;
  payload: string;
}
export interface UnsavePostSuccess {
  type: typeof UNSAVE_POST_SUCCESS;
  payload: string;
}
export interface UnsavePostError {
  type: typeof UNSAVE_POST_ERROR;
  payload: string;
}

export const TOGGLE_ADD_FORM = "TOGGLE_ADD_FORM";

export interface ToggleAddForm {
  type: typeof TOGGLE_ADD_FORM;
  payload: undefined;
}

export const TOGGLE_VIEW_FORM = "TOGGLE_VIEW_FORM";

export interface ToggleViewForm {
  type: typeof TOGGLE_VIEW_FORM;
  payload: RentPost;
}

export const SEND_MESSAGE = "SEND_MESSAGE";

export interface SendMessage {
  type: typeof SEND_MESSAGE;
  payload: MessageDTO;
}

export type DashboardActionType =
  | FetchRentPostsBegin
  | FetchRentPostsSuccess
  | FetchRentPostsError
  | CreateRentPostBegin
  | CreateRentPostSuccess
  | CreateRentPostError
  | SavePostBegin
  | SavePostSuccess
  | SavePostError
  | UnsavePostBegin
  | UnsavePostSuccess
  | UnsavePostError
  | ToggleAddForm
  | ToggleViewForm
  | SendMessage;
