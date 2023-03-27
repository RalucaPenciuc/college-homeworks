import React, { Component } from "react";
import "../scss/SearchGroupResults.scss";
import { connect } from "react-redux";
import { searchGroupBegin, joinGroupBegin } from "../redux/actions/actions";
import Group from "../models/Group";
import MyApartmentState from "../redux/store/store";

interface IProps {
  loading: boolean;
  error: string;
  searchName: string;
  searchResult: Group;
  joinRequestSent: boolean;
  searchGroup: Function;
  joinGroup: Function;
}

class SearchGroupResults extends Component<IProps, {}> {
  constructor(props: any) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.joinRequestSent) {
      alert("Join request sent");
    }
  }

  handleJoinButton() {
    this.props.joinGroup(this.props.searchResult.docRef);
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    } else if (this.props.searchResult.docRef !== "0") {
      return (
        <div className="search-group-results-view">
          <div>{this.props.searchResult.name}</div>
          <button className="send-join-request-button" onClick={this.handleJoinButton.bind(this)}>Join</button>
        </div>
      );
    } else return <div></div>;
  }
}

const mapStateToProps = (state: MyApartmentState) => {
  return {
    loading: state.loadingSearchResults,
    error: state.error,
    searchResult: state.searchGroupResult,
    joinRequestSent: state.joinRequestSent,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchGroup: (name: string) => dispatch(searchGroupBegin(name)),
    joinGroup: (groupID: string) => dispatch(joinGroupBegin(groupID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchGroupResults);
