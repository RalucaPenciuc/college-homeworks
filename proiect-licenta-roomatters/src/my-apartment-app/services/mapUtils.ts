import { GetDocResponse, Doc, QueryResponse, QueryDoc, AddDocResponse } from "./typeAlias";
import UserInfoDTO from "../models/dtos/UserInfoDTO";
import InviteRequest from "../models/InviteRequest";
import Member from "../models/Member";
import JoinRequest from "../models/JoinRequest";
import PostComment from "../models/PostComment";
import Post from "../models/Post";

export function getMemberFromDocResponse(
  response: GetDocResponse
): UserInfoDTO | undefined {
  const responseData: Doc | undefined = response.data();
  if (responseData) {
    return {
      docRef: response.id,
      groupID: responseData.groupID,
      firstName: responseData.firstName,
      lastName: responseData.lastName,
      profileImage: responseData.profileImage,
    };
  }
  return undefined;
}

export function getInvitesFromQueryResponse(
  response: QueryResponse
): InviteRequest[] {
  return response.docs.map((inviteResponse: QueryDoc) => {
    const inviteResponseData: Doc = inviteResponse.data();
    return {
      docRef: inviteResponse.id,
      sender: inviteResponseData.sender,
      receiver: inviteResponseData.receiver,
      group: inviteResponseData.group,
    };
  });
}

export function getMembersFromQueryResponse(response: QueryResponse): Member[] {
  return response.docs.map((memberResponse: QueryDoc) => {
    const memberResponseData: Doc = memberResponse.data();
    return {
      docRef: memberResponse.id,
      firstName: memberResponseData.firstName,
      lastName: memberResponseData.lastName,
      profileImage: memberResponseData.profileImage,
    };
  });
}

export function getJoinsFromQueryResponse(
  response: QueryResponse
): JoinRequest[] {
  return response.docs.map((joinResponse: QueryDoc) => {
    const joinResponseData: Doc = joinResponse.data();
    return {
      docRef: joinResponse.id,
      sender: joinResponseData.sender,
      receiver: joinResponseData.receiver,
    };
  });
}

export function getCommentsFromQueryResponse(
  response: QueryResponse
): PostComment[] {
  return response.docs.map((commentResponse: QueryDoc) => {
    const commentResponseData: Doc = commentResponse.data();
    return {
      docRef: commentResponse.id,
      authorID: commentResponseData.authorID,
      authorName: commentResponseData.authorName,
      authorProfileImage: commentResponseData.profileImage,
      content: commentResponseData.content,
    };
  });
}

export function getPostsFromQueryResponse(response: QueryResponse): Post[] {
  return response.docs.map((postResponse: QueryDoc) => {
    const postResponseData: Doc = postResponse.data();
    return {
      docRef: postResponse.id,
      authorID: postResponseData.authorID,
      authorName: postResponseData.authorUserName,
      authorProfileImage: postResponseData.authorProfileImage,
      content: postResponseData.content,
      comments: [],
    };
  });
}
