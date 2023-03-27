import { takeEvery } from "@redux-saga/core/effects";
import {
  FETCH_RENT_POSTS_BEGIN,
  SAVE_POST_BEGIN,
  UNSAVE_POST_BEGIN,
  CREATE_RENT_POST_BEGIN,
  SEND_MESSAGE,
} from "../actions/types";
import {
  fetchRentPostsListener,
  savePostListener,
  unsavePostListener,
  createRentPostListener,
  sendMessageListener,
} from "./listeners";

export function* generalSaga(): IterableIterator<any> {
  yield takeEvery(FETCH_RENT_POSTS_BEGIN, fetchRentPostsListener);
  yield takeEvery(SAVE_POST_BEGIN, savePostListener);
  yield takeEvery(UNSAVE_POST_BEGIN, unsavePostListener);
  yield takeEvery(CREATE_RENT_POST_BEGIN, createRentPostListener);
  yield takeEvery(SEND_MESSAGE, sendMessageListener);
}
