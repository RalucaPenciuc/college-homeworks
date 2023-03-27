import React, { Component } from "react";
import "../scss/RentPostItem.scss";
import RentPost from "../models/RentPost";
import { connect } from "react-redux";
import {
  savePostBegin,
  unsavePostBegin,
  toggleViewForm,
} from "../redux/actions/actions";
import DashboardState from "../redux/store/store";
import { getCookie } from "../services/CookieService";
import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import Carousel from "nuka-carousel";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";

interface IProps {
  key: string;
  rentPost: RentPost;
  savedRentPosts: string[];
  savePost: Function;
  unsavePost: Function;
  toggleViewForm: Function;
}

class RentPostItem extends Component<IProps, {}> {
  handleSavePostButton() {
    this.props.savePost(this.props.rentPost.docRef);
  }

  handleUnsavePostButton() {
    this.props.unsavePost(this.props.rentPost.docRef);
  }

  handleViewButton() {
    this.props.toggleViewForm(this.props.rentPost);
  }

  render() {
    return (
      <GridListTile>
        <Carousel
          renderCenterLeftControls={({ previousSlide }) => (
            <IconButton
              disabled={this.props.rentPost.photos.length === 1}
              onClick={previousSlide}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <IconButton
              disabled={this.props.rentPost.photos.length === 1}
              onClick={nextSlide}
            >
              <ChevronRightIcon />
            </IconButton>
          )}
        >
          {this.props.rentPost.photos.map((photo: string) => (
            <img key={photo} className="post-image" src={photo} />
          ))}
        </Carousel>

        <GridListTileBar
          title={
            <div
              className="clickable-area"
              onClick={this.handleViewButton.bind(this)}
            >
              {this.props.rentPost.rentType.toLowerCase() +
                " for " +
                (this.props.rentPost.postType.toLowerCase() === "sell" ? "sale" : "rent") +
                ": " +
                this.props.rentPost.price}{" "}
            </div>
          }
          actionIcon={
            this.props.rentPost.docRef ? (
              this.props.rentPost.authorID === getCookie("not-token") ? (
                <></>
              ) : this.props.savedRentPosts.includes(
                  this.props.rentPost.docRef
                ) ? (
                <IconButton
                  aria-label={`unsave ${"post"}`}
                  onClick={this.handleUnsavePostButton.bind(this)}
                  color="primary"
                >
                  <StarRoundedIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label={`save ${"post"}`}
                  onClick={this.handleSavePostButton.bind(this)}
                >
                  <StarBorderRoundedIcon />
                </IconButton>
              )
            ) : (
              <></>
            )
          }
        />
      </GridListTile>
    );
  }
}

const mapStateToProps = (state: DashboardState) => {
  return {
    savedRentPosts: state.rentPostSaved,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    savePost: (docRef: string) => dispatch(savePostBegin(docRef)),
    unsavePost: (docRef: string) => dispatch(unsavePostBegin(docRef)),
    toggleViewForm: (content: RentPost) => dispatch(toggleViewForm(content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RentPostItem);
