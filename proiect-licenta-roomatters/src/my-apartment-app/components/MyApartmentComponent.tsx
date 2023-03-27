import React, { Component } from "react";
import "../scss/MyApartmentComponent.scss";
import { connect } from "react-redux";
import MyApartmentState from "../redux/store/store";
import { getGroupDataBegin } from "../redux/actions/actions";
import NoGroupComponent from "./NoGroupComponent";
import GroupComponent from "./GroupComponent";

interface IProps {
  loading: boolean;
  error: string;
  groupID: string;
  getGroupData: Function;
}

class MyApartmentComponent extends Component<IProps, {}> {
  componentDidMount() {
    this.props.getGroupData();
  }

  render() {
    if (this.props.loading) {
      return <div className="my-ap-page-container">Loading...</div>;
    } else {
      return (
        <div className="my-ap-page-container">
          {this.props.groupID === "0" ? (
            <NoGroupComponent />
          ) : (
            <GroupComponent />
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = (state: MyApartmentState) => {
  return {
    loading: state.loading,
    error: state.error,
    groupID: state.groupID,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getGroupData: () => dispatch(getGroupDataBegin()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApartmentComponent);
