import React, { Component } from "react";
import "../scss/DashboardComponent.scss";
import { connect } from "react-redux";
import DashboardState from "../redux/store/store";
import RentPost from "../models/RentPost";
import { fetchRentPostsBegin, toggleAddForm } from "../redux/actions/actions";
import RentPostItem from "./RentPostItem";
import AddPostForm from "./AddPostForm";
import ViewPostForm from "./ViewPostForm";

interface IProps {
  loading: boolean;
  error: string;
  rentPosts: RentPost[];

  fetchRentPosts: Function;
  toggleAddForm: Function;
}

interface IState {
  addFormVisible: boolean;
}

class DashboardComponent extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      addFormVisible: false,
    };
  }

  componentDidMount() {
    this.props.fetchRentPosts();
  }

  handleAddPostButton() {
    this.props.toggleAddForm();
  }

  render() {
    if (this.props.loading) {
      return <div className="dasboard-page-container">Loading...</div>;
    } else {
      return (
        <div className="dashboard-page-container">
          <div className="dashboard-list-container">
            {this.props.rentPosts.map((rentPost: RentPost) => {
              return (
                <RentPostItem
                  key={String(rentPost.docRef)}
                  rentPost={rentPost}
                />
              );
            })}
          </div>
          <button
            className="toggle-add-form-button"
            onClick={this.handleAddPostButton.bind(this)}
          >
            Create Post
          </button>
          <div className="create-post-form">
            <AddPostForm />
            <ViewPostForm />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: DashboardState) => {
  return {
    loading: state.loading,
    error: state.error,
    rentPosts: state.rentPosts,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchRentPosts: () => dispatch(fetchRentPostsBegin()),
    toggleAddForm: () => dispatch(toggleAddForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
