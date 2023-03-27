import { call, put } from "@redux-saga/core/effects";
import FirebaseService from "../../services/FirebaseService";
import { MyAccountActionType } from "../actions/types";
import {
  getUserDataSuccess,
  getUserDataError,
  editPostSuccess,
  editPostError,
  deletePostSuccess,
  deletePostError,
  deleteSavedPostSuccess,
  deleteSavedPostError,
  fetchMessagesSuccess,
  fetchMessagesError,
  sendReplySuccess,
  sendReplyError,
} from "../actions/actions";
import SendReplyRequest from "../../models/SendReplyRequest";

const firebaseService: FirebaseService = FirebaseService.getInstance();

export function* getUserDataListener(action: MyAccountActionType) {
  try {
    const response = yield call(firebaseService.getUserData);
    yield put(getUserDataSuccess(response));
  } catch (error) {
    yield put(getUserDataError(error));
  }
}

export function* deleteSavedPostListener(action: MyAccountActionType) {
  const postID: string = action.payload as string;
  try {
    const response = yield call(firebaseService.deleteSavedPost, postID);
    yield put(deleteSavedPostSuccess(response));
  } catch (error) {
    yield put(deleteSavedPostError(error));
  }
}

export function* editPostListener(action: MyAccountActionType) {
  const rentPostID: string = action.payload as string;
  try {
    const response = yield call(firebaseService.editPost, rentPostID);
    yield put(editPostSuccess(rentPostID));
  } catch (error) {
    yield put(editPostError(error));
  }
}

export function* deletePostListener(action: MyAccountActionType) {
  const rentPostID: string = action.payload as string;
  try {
    const response = yield call(firebaseService.deletePost, rentPostID);
    yield put(deletePostSuccess(rentPostID));
  } catch (error) {
    yield put(deletePostError(error));
  }
}

export function* fetchMessagesListener(action: MyAccountActionType) {
  try {
    const response = yield call(firebaseService.fetchMessages);
    yield put(fetchMessagesSuccess(response));
  } catch (error) {
    yield put(fetchMessagesError(error));
  }
}

export function* sendReplyListener(action: MyAccountActionType) {
  const request: SendReplyRequest = action.payload as SendReplyRequest;
  try {
    const response = yield call(firebaseService.sendReply, request);
    yield put(sendReplySuccess(response));
  } catch (error) {
    yield put(sendReplyError(error));
  }
}
