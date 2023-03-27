import React, { Component } from "react";
import "../scss/MyPost.scss";
import { connect } from "react-redux";
import RentPost from "../models/RentPost";
import GridListTile from "@material-ui/core/GridListTile";
import { GridListTileBar, IconButton } from "@material-ui/core";
import Carousel from "nuka-carousel";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { deletePostBegin } from "../redux/actions/actions";

interface IProps {
  key: string | undefined;
  post: RentPost;
  deleteRentPost: Function;
}

interface IState {}

class MyPost extends Component<IProps, IState> {
  handleDeleteButton() {
    this.props.deleteRentPost(this.props.post.docRef);
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
        </Carousel>
        <GridListTileBar
          title={
            this.props.post.rentType.toLowerCase() +
            " for " +
            this.props.post.postType.toLowerCase() +
            ": " +
            this.props.post.price
          }
          actionIcon={
            <div>
              <IconButton aria-label={`edit ${"post"}`} color="primary">
                <EditRoundedIcon />
              </IconButton>
              <IconButton
                aria-label={`delete ${"post"}`}
                color="secondary"
                onClick={this.handleDeleteButton.bind(this)}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </div>
          }
        />
      </GridListTile>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteRentPost: (postID: string) => dispatch(deletePostBegin(postID))
  }
}

export default connect(null, mapDispatchToProps)(MyPost);
