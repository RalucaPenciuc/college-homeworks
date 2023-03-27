import React, { Component } from "react";
import "../scss/InviteRequestItem.scss";
import { connect } from "react-redux";
import {
  acceptInviteRequestBegin,
  rejectInviteRequestBegin,
} from "../redux/actions/actions";
import InviteRequest from "../models/InviteRequest";

interface IProps {
  key: string | undefined;
  inviteRequest: InviteRequest;
  acceptInviteRequest: Function;
  rejectInviteRequest: Function;
}

class InviteRequestItem extends Component<IProps, {}> {
  handleAcceptButton() {
    this.props.acceptInviteRequest(this.props.inviteRequest);
  }

  handleRejectButton() {
    this.props.rejectInviteRequest(this.props.inviteRequest);
  }

  render() {
    return (
      <div className="invite-request-item">
        <div className="invite-request-content">
          <img
            className="invite-sender-profile-image"
            src={this.props.inviteRequest.sender.profileImage}
          />
          <p className="invite-request-message">
            {this.props.inviteRequest.sender.firstName +
              " " +
              this.props.inviteRequest.sender.lastName +
              " invited you to join the group " +
              this.props.inviteRequest.group.name}
          </p>
        </div>
        <div className="invite-request-actions">
          <button
            className="reject-invite-request-button"
            onClick={this.handleRejectButton.bind(this)}
          >
            Reject
          </button>
          <button
            className="accept-invite-request-button"
            onClick={this.handleAcceptButton.bind(this)}
          >
            Accept
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    acceptInviteRequest: (inviteRequest: InviteRequest) =>
      dispatch(acceptInviteRequestBegin(inviteRequest)),
    rejectInviteRequest: (inviteRequest: InviteRequest) =>
      dispatch(rejectInviteRequestBegin(inviteRequest)),
  };
};

export default connect(null, mapDispatchToProps)(InviteRequestItem);
