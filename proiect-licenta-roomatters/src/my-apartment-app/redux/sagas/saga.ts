import { takeEvery, takeLeading } from "@redux-saga/core/effects";
import {
  GET_GROUP_DATA_BEGIN,
  CREATE_GROUP_BEGIN,
  LEAVE_GROUP_BEGIN,
  SEARCH_GROUP_BEGIN,
  JOIN_GROUP_BEGIN,
  REJECT_INVITE_REQUEST_BEGIN,
  ACCEPT_JOIN_REQUEST_BEGIN,
  REJECT_JOIN_REQUEST_BEGIN,
  DELETE_MEMBER_BEGIN,
  SEARCH_USER_BEGIN,
  INVITE_USER_BEGIN,
  ACCEPT_INVITE_REQUEST_BEGIN,
  POST_CONTENT_BEGIN,
} from "../actions/types";
import {
  getGroupDataListener,
  createGroupListener,
  leaveGroupListener,
  searchGroupListener,
  joinGroupListener,
  acceptJoinRequestListener,
  rejectJoinRequestListener,
  deleteMemberListener,
  searchUserListener,
  inviteUserListener,
  acceptInviteRequestListener,
  rejectInviteRequestListener,
  postContentListener,
} from "./listeners";

export function* generalSaga(): IterableIterator<any> {
  yield takeEvery(GET_GROUP_DATA_BEGIN, getGroupDataListener);
  yield takeLeading(CREATE_GROUP_BEGIN, createGroupListener);
  yield takeLeading(LEAVE_GROUP_BEGIN, leaveGroupListener);
  yield takeEvery(SEARCH_GROUP_BEGIN, searchGroupListener);
  yield takeLeading(JOIN_GROUP_BEGIN, joinGroupListener);
  yield takeLeading(ACCEPT_JOIN_REQUEST_BEGIN, acceptJoinRequestListener);
  yield takeLeading(REJECT_JOIN_REQUEST_BEGIN, rejectJoinRequestListener);
  yield takeLeading(DELETE_MEMBER_BEGIN, deleteMemberListener);
  yield takeEvery(SEARCH_USER_BEGIN, searchUserListener);
  yield takeLeading(INVITE_USER_BEGIN, inviteUserListener);
  yield takeLeading(ACCEPT_INVITE_REQUEST_BEGIN, acceptInviteRequestListener);
  yield takeLeading(REJECT_INVITE_REQUEST_BEGIN, rejectInviteRequestListener);
  yield takeEvery(POST_CONTENT_BEGIN, postContentListener);
}
