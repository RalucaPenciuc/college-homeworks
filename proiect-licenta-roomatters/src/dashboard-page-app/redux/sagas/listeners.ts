import { call, put } from "@redux-saga/core/effects";
import FirebaseService from "../../services/FirebaseService";
import { DashboardActionType } from "../actions/types";
import {
  fetchRentPostsSuccess,
  fetchRentPostsError,
  savePostSuccess,
  savePostError,
  unsavePostSuccess,
  unsavePostError,
  createRentPostSuccess,
  createRentPostError,
} from "../actions/actions";
import RentPostDTO from "../../models/dtos/RentPostDTO";
import MessageDTO from "../../models/dtos/MessageDTO";

const firebaseService: FirebaseService = FirebaseService.getInstance();

export function* fetchRentPostsListener(action: DashboardActionType) {
  try {
    const response = yield call(firebaseService.fetchRentPosts);
    yield put(fetchRentPostsSuccess(response));
  } catch (error) {
    yield put(fetchRentPostsError(error));
  }
}

export function* createRentPostListener(action: DashboardActionType) {
  const createRequest: RentPostDTO = action.payload as RentPostDTO;
  try {
    const response = yield call(firebaseService.createRentPost, createRequest);
    yield put(createRentPostSuccess(response));
  } catch (error) {
    yield put(createRentPostError(error));
  }
}

export function* savePostListener(action: DashboardActionType) {
  const rentPostID: string = action.payload as string;
  try {
    const response = yield call(firebaseService.savePost, rentPostID);
    yield put(savePostSuccess(rentPostID));
  } catch (error) {
    yield put(savePostError(error));
  }
}

export function* unsavePostListener(action: DashboardActionType) {
  const rentPostID: string = action.payload as string;
  try {
    const response = yield call(firebaseService.unsavePost, rentPostID);
    yield put(unsavePostSuccess(rentPostID));
  } catch (error) {
    yield put(unsavePostError(error));
  }
}

export function* sendMessageListener(action: DashboardActionType) {
  const request: MessageDTO = action.payload as MessageDTO;
  try {
    const response = yield call(firebaseService.sendMessage, request);
  } catch (error) {
    console.log(error);
  }
}
