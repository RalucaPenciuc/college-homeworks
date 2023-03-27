import React, { Component } from "react";
import "../scss/SearchUserResults.scss";
import { connect } from "react-redux";
import { searchUserBegin, inviteUserBegin } from "../redux/actions/actions";
import MyApartmentState from "../redux/store/store";
import Member from "../models/Member";
import Group from "../models/Group";
import InviteRequestDTO from "../models/dtos/InviteRequestDTO";

interface IProps {
  loading: boolean;
  error: string;
  group: Group;
  searchEmail: string;
  searchResult: Member;
  inviteRequestSent: boolean;
  searchUser: Function;
  inviteUser: Function;
}

class SearchUserResults extends Component<IProps, {}> {
  constructor(props: any) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.inviteRequestSent) {
      alert("Join request sent");
    }
  }

  handleInviteButton() {
    const request: InviteRequestDTO = {
      userID: this.props.searchResult.docRef,
      group: this.props.group,
    };
    this.props.inviteUser(request);
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    } else if (this.props.searchResult.docRef !== "0") {
      return (
        <div className="search-user-results-view">
          <div className="search-user-result-content">
            <img
              className="searched-user-profile-image"
              src={this.props.searchResult.profileImage}
            />
            <div>
              {this.props.searchResult.firstName +
                " " +
                this.props.searchResult.lastName}
            </div>
          </div>
          <button
            className="send-invite-button"
            onClick={this.handleInviteButton.bind(this)}
          >
            Invite
          </button>
        </div>
      );
    } else return <div></div>;
  }
}

const mapStateToProps = (state: MyApartmentState) => {
  return {
    loading: state.loadingSearchResults,
    error: state.error,
    group: state.groupData,
    searchResult: state.searchUserResult,
    inviteRequestSent: state.inviteRequestSent,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchUser: (email: string) => dispatch(searchUserBegin(email)),
    inviteUser: (request: InviteRequestDTO) =>
      dispatch(inviteUserBegin(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUserResults);
