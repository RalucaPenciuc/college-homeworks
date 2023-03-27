import React, { Component } from "react";
import "../scss/NoGroupComponent.scss";
import { connect } from "react-redux";
import { createGroupBegin, searchGroupBegin } from "../redux/actions/actions";
import SearchGroupResults from "./SearchGroupResults";
import InviteRequest from "../models/InviteRequest";
import MyApartmentState from "../redux/store/store";
import InviteRequestItem from "./InviteRequestItem";

interface IProps {
  loading: boolean;
  error: string;
  inviteRequests: InviteRequest[];
  createGroup: Function;
  searchGroup: Function;
}

interface IState {
  groupName: string;
  searchName: string;
}

class NoGroupComponent extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      groupName: "",
      searchName: "",
    };
  }

  handleCreateButton() {
    this.props.createGroup(this.state.groupName);
  }

  handleSearchButton() {
    this.props.searchGroup(this.state.searchName);
  }

  render() {
    return (
      <div className="no-group-page-container">
        <p className="no-group-page-title">
          You don't belong to a group. Here is what you can do:{" "}
        </p>
        <div className="no-group-page-content">
          <div className="no-group-page-actions">
            <div className="create-group-view">
              <h3 className="no-group-subtitle">Create a new group: </h3>
              <input
                className="create-group-input"
                value={this.state.groupName}
                onChange={this.handleNameChange.bind(this)}
                placeholder="Enter a name for the group"
              />
              <button
                className="no-group-action-button"
                onClick={this.handleCreateButton.bind(this)}
              >
                Create group
              </button>
            </div>
            <div className="search-group-view">
              <h3 className="no-group-subtitle">Search a group by name: </h3>
              <input
                className="search-group-input"
                value={this.state.searchName}
                onChange={this.handleSearchNameChange.bind(this)}
                placeholder="Search a group by its name"
              />
              <button
                className="no-group-action-button"
                onClick={this.handleSearchButton.bind(this)}
              >
                Search
              </button>
              <SearchGroupResults searchName={this.state.searchName} />
            </div>
          </div>
          <div className="invite-requests-view">
            <h3 className="no-group-subtitle">Invitations</h3>
            {this.props.inviteRequests.map((inviteRequest: InviteRequest) => (
              <InviteRequestItem
                key={inviteRequest.docRef}
                inviteRequest={inviteRequest}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      groupName: event.target.value,
    });
  }

  handleSearchNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchName: event.target.value,
    });
  }
}

const mapStateToProps = (state: MyApartmentState) => {
  return {
    loading: state.loading,
    error: state.error,
    inviteRequests: state.inviteRequests,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createGroup: (name: string) => dispatch(createGroupBegin(name)),
    searchGroup: (name: string) => dispatch(searchGroupBegin(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoGroupComponent);
