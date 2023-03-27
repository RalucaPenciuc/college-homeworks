import React, { Component } from "react";
import "../scss/MyProfileComponent.scss";
import { connect } from "react-redux";
import { getUserDataBegin } from "../redux/actions/actions";
import UserData from "../models/UserData";
import RentPost from "../models/RentPost";
import MyAccountState from "../redux/store/store";
import MyPost from "./MyPost";
import SavedPost from "./SavedPost";

interface IProps {
  loading: boolean;
  error: string;
  userData: UserData | undefined;
  myPosts: RentPost[];
  savedPosts: RentPost[];
  getUserData: Function;
}

interface IState {
  seeMyPosts: boolean;
  seeSavedPosts: boolean;
}

class MyProfileComponent extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      seeMyPosts: false,
      seeSavedPosts: false,
    };
  }

  componentDidMount() {
    this.props.getUserData();
  }

  showMyPosts() {
    this.setState({
      seeMyPosts: true,
      seeSavedPosts: false,
    });
  }

  showSavedPosts() {
    this.setState({
      seeMyPosts: false,
      seeSavedPosts: true,
    });
  }

  render() {
    if (this.props.loading) {
      return <div className="my-profile-container">Loading...</div>;
    } else {
      return (
        <div className="my-profile-container">
          <div className="user-info">
            <div className="user-info-content">
              <img
                className="user-profile-image"
                src={this.props.userData?.profileImage}
              />
              <p className="user-display-name">
                {this.props.userData?.firstName + " " + this.props.userData?.lastName}
              </p>
              <p className="user-email">{this.props.userData?.email}</p>
              <p className="user-location">{this.props.userData?.location}</p>
            </div>
            <div className="posts-menu">
              <button className="posts-menu-item" onClick={this.showMyPosts.bind(this)}>My Posts</button>
              <button className="posts-menu-item" onClick={this.showSavedPosts.bind(this)}>Saved Posts</button>
            </div>
          </div>
          <div className="posts-list">
            {this.state.seeMyPosts && !this.state.seeSavedPosts ? (
              <div className="posts-grid-list" >
                {this.props.myPosts.map((post: RentPost) => (
                  <MyPost key={post.docRef} post={post} />
                ))}
              </div>
            ) : !this.state.seeMyPosts && this.state.seeSavedPosts ? (
              <div className="posts-grid-list">
                {this.props.savedPosts.map((post: RentPost) => (
                  <SavedPost key={post.docRef} post={post} />
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: MyAccountState) => {
  return {
    loading: state.loading,
    error: state.error,
    userData: state.userData,
    myPosts: state.myPosts,
    savedPosts: state.savedPosts,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserData: () => dispatch(getUserDataBegin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileComponent);
