import React, { Component } from "react";
import "../scss/GroupComponent.scss";
import { connect } from "react-redux";
import MyApartmentState from "../redux/store/store";
import {
  leaveGroupBegin,
  searchUserBegin,
  postContentBegin,
} from "../redux/actions/actions";
import Group from "../models/Group";
import Member from "../models/Member";
import JoinRequest from "../models/JoinRequest";
import MemberItem from "./MemberItem";
import JoinRequestItem from "./JoinRequestItem";
import SearchUserResults from "./SearchUserResults";
import { OutlinedInput, Input } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import PostContentDTO from "../models/dtos/PostContentDTO";
import Post from "../models/Post";
import GroupPostItem from "./GroupPostItem";

interface IProps {
  loading: boolean;
  error: string;
  groupData: Group;
  joinRequests: JoinRequest[];
  groupMembers: Member[];
  groupPosts: Post[];
  leaveGroup: Function;
  searchUser: Function;
  postContent: Function;
}

interface IState {
  searchEmail: string;
  postContent: string;
}

class GroupComponent extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchEmail: "",
      postContent: "",
    };
  }

  handleLeaveButton() {
    if (this.props.groupData.docRef !== "") {
      this.props.leaveGroup(this.props.groupData.docRef);
    } else console.log("Invalid group ID");
  }

  handleSearchButton() {
    this.props.searchUser(this.state.searchEmail);
  }

  handlePostButton() {
    const request: PostContentDTO = {
      groupID: this.props.groupData.docRef || "0",
      content: this.state.postContent,
    };
    this.props.postContent(request);
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="group-page-container">
          <p className="group-page-title">{this.props.groupData.name}</p>
          <div className="group-page-content">
            <div className="left-menu-area">
              <div className="create-post-area">
                <h3>Create a post: </h3>
                <FormControl className="post-content-input">
                  <OutlinedInput
                    multiline
                    rows={4}
                    value={this.state.postContent}
                    onChange={this.handlePostContentChange.bind(this)}
                    autoComplete="new-password"
                    placeholder="Something to announce, to ask?"
                  />
                </FormControl>
                <button
                  className="create-post-button"
                  onClick={this.handlePostButton.bind(this)}
                >
                  Post
                </button>
              </div>
              <div className="members-view">
                <h3 className="group-page-subtitle">Members: </h3>
                <div className="members-view-content">
                  {this.props.groupMembers.map((member: Member) => (
                    <MemberItem key={member.docRef} member={member} />
                  ))}
                </div>
              </div>
            </div>
            <div className="posts-list-area">
              {this.props.groupPosts.map((groupPost: Post) => (
                <GroupPostItem key={groupPost.docRef} post={groupPost} />
              ))}
            </div>
            <div className="side-menu-area">
              <div className="search-user-view">
                <h3 className="group-page-subtitle">Search user: </h3>
                <div className="search-user-field">
                  <FormControl className="search-user-input">
                    <Input
                      value={this.state.searchEmail}
                      onChange={this.handleSearchEmailChange.bind(this)}
                      autoComplete="new-password"
                      placeholder="Enter an email"
                    />
                  </FormControl>
                  <button
                    onClick={this.handleSearchButton.bind(this)}
                    className="search-user-button"
                  >
                    Search
                  </button>
                </div>
                <SearchUserResults searchEmail={this.state.searchEmail} />
              </div>
              <div className="join-requests-view">
                <h3 className="group-page-subtitle">Join requests: </h3>
                <div className="join-requests-view-content">
                  {this.props.joinRequests.map((joinRequest: JoinRequest) => (
                    <JoinRequestItem
                      key={joinRequest.docRef}
                      joinRequest={joinRequest}
                    />
                  ))}
                </div>
              </div>
              <div className="leave-group-view">
                <button
                  className="leave-group-button"
                  onClick={this.handleLeaveButton.bind(this)}
                >
                  Leave group
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  handleSearchEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchEmail: event.target.value,
    });
  }

  handlePostContentChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      postContent: event.target.value,
    });
  }
}

const mapStateToProps = (state: MyApartmentState) => {
  return {
    loading: state.loading,
    error: state.error,
    groupData: state.groupData,
    joinRequests: state.joinRequests,
    groupMembers: state.groupMembers,
    groupPosts: state.groupPosts,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    leaveGroup: () => dispatch(leaveGroupBegin()),
    searchUser: (email: string) => dispatch(searchUserBegin(email)),
    postContent: (request: PostContentDTO) =>
      dispatch(postContentBegin(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupComponent);
