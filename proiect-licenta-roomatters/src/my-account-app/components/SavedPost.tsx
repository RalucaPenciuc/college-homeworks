import React, { Component } from "react";
import { connect } from "react-redux";
import RentPost from "../models/RentPost";
import { deleteSavedPostBegin } from "../redux/actions/actions";
import GridListTile from "@material-ui/core/GridListTile";
import { GridListTileBar, IconButton } from "@material-ui/core";
import Carousel from "nuka-carousel";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

interface IProps {
  key: string | undefined;
  post: RentPost;
  deletePost: Function;
}

interface IState {}

class SavedPost extends Component<IProps, IState> {
  handleDeleteButton() {
    this.props.deletePost(this.props.post.docRef);
  }
  render() {
    return (
      <GridListTile>
        <Carousel
          renderCenterLeftControls={({ previousSlide }) => (
            <IconButton
              disabled={this.props.post.photos.length === 1}
              onClick={previousSlide}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <IconButton
              disabled={this.props.post.photos.length === 1}
              onClick={nextSlide}
            >
              <ChevronRightIcon />
            </IconButton>
          )}
        >
          {this.props.post.photos.map((photo: string) => (
            <img key={photo} className="post-image" src={photo} />
          ))}
        </Carousel>{" "}
        <GridListTileBar
          title={
            this.props.post.rentType.toLowerCase() +
            " for " +
            this.props.post.postType.toLowerCase() +
            ": " +
            this.props.post.price
          }
          actionIcon={
            <IconButton
              aria-label={`delete ${"post"}`}
              onClick={this.handleDeleteButton.bind(this)}
              color="secondary"
            >
              <DeleteRoundedIcon />
            </IconButton>
          }
        />
      </GridListTile>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    deletePost: (postID: string) => dispatch(deleteSavedPostBegin(postID)),
  };
};

export default connect(null, mapDispatchToProps)(SavedPost);
