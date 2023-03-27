import { takeEvery } from "@redux-saga/core/effects";
import {
  GET_USER_DATA_BEGIN,
  EDIT_POST_BEGIN,
  DELETE_POST_BEGIN,
  DELETE_SAVED_POST_BEGIN,
  FETCH_MESSAGES_BEGIN,
  SEND_REPLY_BEGIN,
} from "../actions/types";
import {
  getUserDataListener,
  editPostListener,
  deletePostListener,
  deleteSavedPostListener,
  fetchMessagesListener,
  sendReplyListener,
} from "./listeners";

export function* generalSaga(): IterableIterator<any> {
  yield takeEvery(GET_USER_DATA_BEGIN, getUserDataListener);
  yield takeEvery(DELETE_SAVED_POST_BEGIN, deleteSavedPostListener);
  yield takeEvery(EDIT_POST_BEGIN, editPostListener);
  yield takeEvery(DELETE_POST_BEGIN, deletePostListener);
  yield takeEvery(FETCH_MESSAGES_BEGIN, fetchMessagesListener);
  yield takeEvery(SEND_REPLY_BEGIN, sendReplyListener);
}
