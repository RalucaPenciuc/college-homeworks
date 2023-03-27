import React, { Component } from "react";
import "../scss/JoinRequestItem.scss";
import { connect } from "react-redux";
import JoinRequest from "../models/JoinRequest";
import {
  acceptJoinRequestBegin,
  rejectJoinRequestBegin,
} from "../redux/actions/actions";

interface IProps {
  key: string | undefined;
  joinRequest: JoinRequest;
  acceptJoinRequest: Function;
  rejectJoinRequest: Function;
}

class JoinRequestItem extends Component<IProps, {}> {
  handleAcceptButton() {
    this.props.acceptJoinRequest(this.props.joinRequest);
  }

  handleRejectButton() {
    this.props.rejectJoinRequest(this.props.joinRequest);
  }

  render() {
    return (
      <div className="join-request-item">
        <div className="join-request-content">
          <img
            className="join-sender-profile-image"
            src={this.props.joinRequest.sender.profileImage}
          />
          <p className="join-request-message">
            {this.props.joinRequest.sender.firstName +
              " " +
              this.props.joinRequest.sender.lastName +
              " wants to join your group "}
          </p>
        </div>
        <div className="join-request-actions">
          <button
            className="reject-join-request-button"
            onClick={this.handleRejectButton.bind(this)}
          >
            Reject
          </button>
          <button
            className="accept-join-request-button"
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
    acceptJoinRequest: (joinRequest: JoinRequest) =>
      dispatch(acceptJoinRequestBegin(joinRequest)),
    rejectJoinRequest: (joinRequest: JoinRequest) =>
      dispatch(rejectJoinRequestBegin(joinRequest)),
  };
};

export default connect(null, mapDispatchToProps)(JoinRequestItem);
