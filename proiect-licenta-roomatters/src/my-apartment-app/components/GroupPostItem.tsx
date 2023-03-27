import React, { Component } from "react";
import "../scss/GroupPostItem.scss";
import { connect } from "react-redux";
import Post from "../models/Post";

interface IProps {
  key: string | undefined;
  post: Post;
}

interface IState {}

class GroupPostItem extends Component<IProps, IState> {
  render() {
    return (
      <div className="group-post-item-container">
        <div className="group-post-author-identity">
          <img
            src={this.props.post.authorProfileImage}
            className="group-post-author-image"
          />
          <p className="group-post-author-name">{this.props.post.authorName}</p>
        </div>
        <div className="group-post-content">{this.props.post.content}</div>
      </div>
    );
  }
}

export default connect(null, null)(GroupPostItem);
