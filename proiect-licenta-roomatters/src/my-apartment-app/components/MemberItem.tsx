import React, { Component } from "react";
import "../scss/MemberItem.scss";
import { connect } from "react-redux";
import Member from "../models/Member";
import { getCookie } from "../services/CookieService";
import { deleteMemberBegin } from "../redux/actions/actions";

interface IProps {
  key: string;
  member: Member;
  deleteMember: Function;
}

class MemberItem extends Component<IProps, {}> {
  handleKickOutButton() {
    this.props.deleteMember(this.props.member.docRef);
  }

  render() {
    return (
      <div className="member-item">
        <div className="member-info">
          <img
            className="member-profile-image"
            src={this.props.member.profileImage}
          />
          <div>
            {this.props.member.firstName + " " + this.props.member.lastName}
          </div>
        </div>
        {this.props.member.docRef === getCookie("not-token") ? (
          <></>
        ) : (
          <button
            className="remove-member-button"
            onClick={this.handleKickOutButton.bind(this)}
          >
            Kick out
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteMember: (memberID: string) => dispatch(deleteMemberBegin(memberID)),
  };
};

export default connect(null, mapDispatchToProps)(MemberItem);
