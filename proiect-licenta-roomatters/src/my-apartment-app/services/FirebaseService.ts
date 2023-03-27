import { Database } from "./firebase-init";
import { getCookie } from "./CookieService";
import Group from "../models/Group";
import Member from "../models/Member";
import { GroupData } from "../models/GroupData";
import JoinRequest from "../models/JoinRequest";
import InviteRequest from "../models/InviteRequest";
import InviteRequestDTO from "../models/dtos/InviteRequestDTO";
import InviteResponseDTO from "../models/dtos/InviteResponseDTO";
import Post from "../models/Post";
import { 
  getMemberFromDocResponse, 
  getInvitesFromQueryResponse, 
  getMembersFromQueryResponse, 
  getJoinsFromQueryResponse, 
  getCommentsFromQueryResponse, getPostsFromQueryResponse } from "./mapUtils";
import UserInfoDTO from "../models/dtos/UserInfoDTO";
import { QueryResponse, QueryDoc, GetDocResponse } from "./typeAlias";
import PostComment from "../models/PostComment";
import PostContentDTO from "../models/dtos/PostContentDTO";
import firebase from "firebase";

export default class FirebaseService {
  private static instance: FirebaseService;

  private constructor() {}

  static getInstance() {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  async getGroupData(): Promise<GroupData> {
    const currentUserID = getCookie("not-token");
    return await Database.collection("users")
      .doc(currentUserID)
      .get()
      .then((userResponse: GetDocResponse) => {
        return getMemberFromDocResponse(userResponse);
      })
      .then(async (member: UserInfoDTO | undefined) => {
        if (member) {
          if (member?.groupID === "0") {
            const inviteRequests = await FirebaseService.getInviteRequests(member.docRef);
            const noGroupResponse: GroupData = {
              docRef: "0",
              name: "",
              members: [],
              joinRequests: [],
              inviteRequests: inviteRequests,
              posts: []
            }
            return noGroupResponse;
          } else {
            const groupName = await FirebaseService.getGroupName(member.groupID);
            const groupMembers = await FirebaseService.getGroupMembers(member.groupID);
            const joinRequests = await FirebaseService.getJoinRequests(member.groupID);
            const groupPosts = await FirebaseService.getGroupPosts(member.groupID);
            const groupResponse: GroupData = {
              docRef: member.groupID,
              name: groupName,
              members: groupMembers,
              joinRequests: joinRequests,
              inviteRequests: [],
              posts: groupPosts
            }
            return groupResponse;
          }  
        } else throw("Group data not found.");
      })
      .catch();
  }

  async postContent(request: PostContentDTO): Promise<Post> {
    const currentUserID: string = getCookie("not-token") || "0";
    const currentUserName: string = firebase.auth().currentUser?.displayName || "";
    const currentUserProfileImage: string = firebase.auth().currentUser?.photoURL || "";
    const postData = {
      authorID: currentUserID,
      authorUserName: currentUserName,
      authorProfileImage: currentUserProfileImage,
      groupID: request.groupID,
      content: request.content,
      createDate: firebase.firestore.Timestamp.fromDate(new Date())
    }
    return await Database.collection("group-posts")
      .add(postData)
      .then((postResponse) => {
        return {
          docRef: postResponse.id,
          authorID: currentUserID,
          authorName: currentUserName,
          authorProfileImage: currentUserProfileImage,
          content: request.content,
          comments: []
        }
      })
      .catch()
  }

  static async getInviteRequests(userID: string): Promise<InviteRequest[]> {
    return await Database.collection("invite-requests")
      .where("receiver", "==", userID)
      .get()
      .then((inviteRequestsResponse: QueryResponse) => getInvitesFromQueryResponse(inviteRequestsResponse))
      .catch()
  }

  static async getGroupName(groupID: string): Promise<string> {
    return await Database.collection("groups")
      .doc(groupID)
      .get()
      .then((groupResponse: GetDocResponse) => groupResponse.data()?.name)
      .catch()
  }

  static async getGroupMembers(groupID: string): Promise<Member[]> {
    return await Database.collection("users")
      .where("groupID", "==", groupID)
      .get()
      .then((membersResponse: QueryResponse) => getMembersFromQueryResponse(membersResponse))
      .catch()
  }

  static async getJoinRequests(groupID: string): Promise<JoinRequest[]> {
    return await Database.collection("join-requests")
      .where("receiver", "==", groupID)
      .get()
      .then((joinRequestsResponse: QueryResponse) => getJoinsFromQueryResponse(joinRequestsResponse))
      .catch()
  }

  static async getGroupPosts(groupID: string): Promise<Post[]> {
    return await Database.collection("group-posts")
      .where("groupID", "==", groupID)
      .orderBy("createDate", "desc")
      .get()
      .then((postsResponse: QueryResponse) => getPostsFromQueryResponse(postsResponse))
      .then(async (posts: Post[]) => {
        for(const post of posts) {
          const comments = await FirebaseService.getPostComments(groupID, post.docRef || "0");
          post.comments = comments;
        }
        return posts;
      })
      .catch()
  }

  static async getPostComments(groupID: string, postID: string): Promise<PostComment[]> {
    return await Database.collection("comments")
      .where("groupID", "==", groupID)
      .where("groupPostID", "==", postID)
      .get()
      .then((commentsResponse: QueryResponse) => getCommentsFromQueryResponse(commentsResponse))
      .catch()
  }


  async createGroup(name: string): Promise<GroupData> {
    return new Promise((resolve, reject) => {
      const newGroup: Group = {
        name: name,
      };
      Database.collection("groups")
        .add(newGroup)
        .then((response) => {
          newGroup.docRef = response.id;

          Database.collection("users")
            .doc(getCookie("not-token"))
            .update({
              groupID: response.id,
            })
            .then(() => {
              Database.collection("users")
                .doc(getCookie("not-token"))
                .get()
                .then((userResponse) => {
                  const userData = userResponse.data();
                  if (userData) {
                    resolve({
                      docRef: response.id,
                      name: name,
                      members: [
                        {
                          docRef: userResponse.id,
                          firstName: userData.firstName,
                          lastName: userData.lastName,
                          profileImage: userData.profileImage,
                        },
                      ],
                      joinRequests: [],
                      inviteRequests: [],
                      posts: []
                    });
                  } else reject("User is undefined.");
                })
                .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }

  async leaveGroup(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Database.collection("users")
        .doc(getCookie("not-token"))
        .update({
          groupID: "0",
        })
        .then(() => resolve(true))
        .catch((error) => reject(error));
    });
  }

  async searchGroup(searchName: string): Promise<Group> {
    return new Promise((resolve, reject) => {
      Database.collection("groups")
        .where("name", "==", searchName)
        .get()
        .then((response) => {
          if (response) {
            const responseData = response.docs[0].data();
            if (responseData) {
              resolve({
                docRef: response.docs[0].id,
                name: responseData.name,
              });
            } else reject("Group not found");
          } else reject("Group not found");
        })
        .catch((error) => reject(error));
    });
  }

  async joinGroup(groupID: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Database.collection("users")
        .doc(getCookie("not-token"))
        .get()
        .then((response) => {
          const userData = response.data();
          if (userData) {
            const member: Member = {
              docRef: response.id,
              firstName: userData.firstName,
              lastName: userData.lastName,
              profileImage: userData.profileImage,
            };
            Database.collection("join-requests")
              .add({
                sender: member,
                receiver: groupID,
                accepted: false,
              })
              .then(() => resolve(true))
              .catch((error) => reject(error));
          } else reject("User is undefined");
        })
        .catch((error) => reject(error));
    });
  }

  async acceptJoinRequest(joinRequest: JoinRequest): Promise<JoinRequest> {
    return new Promise((resolve, reject) => {
      Database.collection("users")
        .doc(joinRequest.sender.docRef)
        .update({
          groupID: joinRequest.receiver,
        })
        .then(() => {
          Database.collection("join-requests")
            .doc(joinRequest.docRef)
            .delete()
            .then(() => resolve(joinRequest))
            .catch((error) => resolve(error));
        })
        .catch((error) => reject(error));
    });
  }

  async rejectJoinRequest(joinRequest: JoinRequest): Promise<string> {
    return new Promise((resolve, reject) => {
      Database.collection("join-requests")
        .doc(joinRequest.docRef)
        .delete()
        .then(() => resolve(joinRequest.docRef))
        .catch((error) => reject(error));
    });
  }

  async deleteMember(memberID: string): Promise<string> {
    return new Promise((resolve, reject) => {
      Database.collection("users")
        .doc(memberID)
        .update({
          groupID: "0",
        })
        .then(() => resolve(memberID))
        .catch((error) => reject(error));
    });
  }

  async searchUser(email: string): Promise<Member> {
    return new Promise((resolve, reject) => {
      Database.collection("users")
        .where("email", "==", email)
        .get()
        .then((response) => {
          const responseData = response.docs[0].data();
          const memberToAdd: Member = {
            docRef: response.docs[0].id,
            firstName: responseData.firstName,
            lastName: responseData.lastName,
            profileImage: responseData.profileImage,
          };
          resolve(memberToAdd);
        })
        .catch((error) => reject(error));
    });
  }

  async inviteUser(request: InviteRequestDTO): Promise<InviteRequest> {
    return new Promise((resolve, reject) => {
      Database.collection("users")
        .doc(getCookie("not-token"))
        .get()
        .then((response) => {
          const responseData = response.data();
          if (responseData) {
            const member: Member = {
              docRef: response.id,
              firstName: responseData.firstName,
              lastName: responseData.lastName,
              profileImage: responseData.profileImage,
            };
            const inviteRequest: InviteRequest = {
              sender: member,
              receiver: request.userID,
              group: request.group,
            };
            Database.collection("invite-requests")
              .add(inviteRequest)
              .then((addResp) => {
                inviteRequest.docRef = addResp.id;
                resolve(inviteRequest);
              })
              .catch((error) => reject(error));
          } else reject("User is undefined");
        })
        .catch((error) => reject(error));
    });
  }

  async acceptInviteRequest(inviteRequest: InviteRequest): Promise<InviteResponseDTO> {
    return new Promise((resolve, reject) => {
      Database.collection("users")
        .doc(inviteRequest.receiver)
        .update({
          groupID: inviteRequest.group.docRef,
        })
        .then(() => {
          Database.collection("users")
            .doc(inviteRequest.receiver)
            .get()
            .then((resp) => {
              const userData = resp.data();
              if (userData) {
                const newMember: Member = {
                  docRef: resp.id,
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  profileImage: userData.profileImage,
                };
                Database.collection("users")
                  .where("groupID", "==", inviteRequest.group.docRef)
                  .get()
                  .then((membersResp) => {
                    const members: Member[] = membersResp.docs.map(
                      (memberResp) => {
                        return {
                          docRef: memberResp.id,
                          firstName: memberResp.data().firstName,
                          lastName: memberResp.data().lastName,
                          profileImage: memberResp.data().profileImage,
                        };
                      }
                    );
                    Database.collection("join-requests")
                      .where("receiver", "==", inviteRequest.group.docRef)
                      .get()
                      .then((reqResp) => {
                        const joinReqs: JoinRequest[] = reqResp.docs.map(
                          (req) => {
                            return {
                              docRef: req.id,
                              sender: req.data().sender,
                              receiver: req.data().receiver,
                            };
                          }
                        );
                        const groupData: GroupData = {
                          docRef: inviteRequest.group.docRef || "",
                          name: inviteRequest.group.name,
                          members: members,
                          joinRequests: joinReqs,
                          inviteRequests: [],
                          posts: []
                        };
                        const response: InviteResponseDTO = {
                          requestID: inviteRequest.docRef || "",
                          sender: inviteRequest.sender,
                          receiver: newMember,
                          groupData: groupData,
                        };
                        Database.collection("invite-requests")
                          .doc(inviteRequest.docRef)
                          .delete()
                          .then(() => resolve(response))
                          .catch((error) => resolve(error));
                      })
                      .catch();
                  })
                  .catch();
              } else reject("User is undefined");
            })
            .catch((error) => resolve(error));
        })
        .catch((error) => reject(error));
    });
  }

  async rejectInviteRequest(inviteRequest: InviteRequest): Promise<string> {
    return new Promise((resolve, reject) => {
      Database.collection("invite-requests")
        .doc(inviteRequest.docRef)
        .delete()
        .then(() => resolve(inviteRequest.docRef))
        .catch((error) => reject(error));
    });
  }
}
