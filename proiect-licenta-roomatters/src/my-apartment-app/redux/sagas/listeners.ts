import { call, put } from "@redux-saga/core/effects";
import FirebaseService from "../../services/FirebaseService";
import { MyApartmentActionType } from "../actions/types";
import {
  getGroupDataSuccess,
  getGroupDataError,
  createGroupSuccess,
  createGroupError,
  leaveGroupSuccess,
  leaveGroupError,
  searchGroupSuccess,
  searchGroupError,
  joinGroupSuccess,
  joinGroupError,
  acceptJoinRequestSuccess,
  acceptJoinRequestError,
  rejectJoinRequestSuccess,
  rejectJoinRequestError,
  deleteMemberSuccess,
  deleteMemberError,
  searchUserSuccess,
  searchUserError,
  inviteUserSuccess,
  inviteUserError,
  acceptInviteRequestSuccess,
  acceptInviteRequestError,
  rejectInviteRequestSuccess,
  rejectInviteRequestError,
  postContentSuccess,
  postContentError,
} from "../actions/actions";
import JoinRequest from "../../models/JoinRequest";
import InviteRequestDTO from "../../models/dtos/InviteRequestDTO";
import InviteRequest from "../../models/InviteRequest";
import PostContentDTO from "../../models/dtos/PostContentDTO";

const firebaseService: FirebaseService = FirebaseService.getInstance();

export function* getGroupDataListener(action: MyApartmentActionType) {
  try {
    const response = yield call(firebaseService.getGroupData);
    yield put(getGroupDataSuccess(response));
  } catch (error) {
    yield put(getGroupDataError(error));
  }
}

export function* createGroupListener(action: MyApartmentActionType) {
  const groupName: string = action.payload as string;
  try {
    const response = yield call(firebaseService.createGroup, groupName);
    yield put(createGroupSuccess(response));
  } catch (error) {
    yield put(createGroupError(error));
  }
}

export function* leaveGroupListener(action: MyApartmentActionType) {
  try {
    const response = yield call(firebaseService.leaveGroup);
    yield put(leaveGroupSuccess());
  } catch (error) {
    yield put(leaveGroupError(error));
  }
}

export function* searchGroupListener(action: MyApartmentActionType) {
  const groupName: string = action.payload as string;
  try {
    const response = yield call(firebaseService.searchGroup, groupName);
    yield put(searchGroupSuccess(response));
  } catch (error) {
    yield put(searchGroupError(error));
  }
}

export function* joinGroupListener(action: MyApartmentActionType) {
  const groupID: string = action.payload as string;
  try {
    const response = yield call(firebaseService.joinGroup, groupID);
    yield put(joinGroupSuccess());
  } catch (error) {
    yield put(joinGroupError(error));
  }
}

export function* acceptJoinRequestListener(action: MyApartmentActionType) {
  const joinRequest: JoinRequest = action.payload as JoinRequest;
  try {
    const response = yield call(firebaseService.acceptJoinRequest, joinRequest);
    yield put(acceptJoinRequestSuccess(response));
  } catch (error) {
    yield put(acceptJoinRequestError(error));
  }
}

export function* rejectJoinRequestListener(action: MyApartmentActionType) {
  const joinRequest: JoinRequest = action.payload as JoinRequest;
  try {
    const response = yield call(firebaseService.rejectJoinRequest, joinRequest);
    yield put(rejectJoinRequestSuccess(response));
  } catch (error) {
    yield put(rejectJoinRequestError(error));
  }
}

export function* deleteMemberListener(action: MyApartmentActionType) {
  const memberID: string = action.payload as string;
  try {
    const response = yield call(firebaseService.deleteMember, memberID);
    yield put(deleteMemberSuccess(response));
  } catch (error) {
    yield put(deleteMemberError(error));
  }
}

export function* searchUserListener(action: MyApartmentActionType) {
  const email: string = action.payload as string;
  try {
    const response = yield call(firebaseService.searchUser, email);
    yield put(searchUserSuccess(response));
  } catch (error) {
    yield put(searchUserError(error));
  }
}

export function* inviteUserListener(action: MyApartmentActionType) {
  const request: InviteRequestDTO = action.payload as InviteRequestDTO;
  try {
    const response = yield call(firebaseService.inviteUser, request);
    yield put(inviteUserSuccess(response));
  } catch (error) {
    yield put(inviteUserError(error));
  }
}

export function* acceptInviteRequestListener(action: MyApartmentActionType) {
  const inviteRequest: InviteRequest = action.payload as InviteRequest;
  try {
    const response = yield call(firebaseService.acceptInviteRequest, inviteRequest);
    yield put(acceptInviteRequestSuccess(response));
  } catch (error) {
    yield put(acceptInviteRequestError(error));
  }
}

export function* rejectInviteRequestListener(action: MyApartmentActionType) {
  const inviteRequest: InviteRequest = action.payload as InviteRequest;
  try {
    const response = yield call(firebaseService.rejectInviteRequest, inviteRequest);
    yield put(rejectInviteRequestSuccess(response));
  } catch (error) {
    yield put(rejectInviteRequestError(error));
  }
}

export function* postContentListener(action: MyApartmentActionType) {
  const postRequest: PostContentDTO = action.payload as PostContentDTO;
  try {
    const response = yield call(firebaseService.postContent, postRequest);
    yield put(postContentSuccess(response));
  } catch (error) {
    yield put(postContentError(error));
  }
}

