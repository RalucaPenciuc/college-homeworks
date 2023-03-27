import React, { Component } from "react";
import { connect } from "react-redux";
import "../scss/ViewPostForm.scss";
import DashboardState from "../redux/store/store";
import { toggleViewForm, sendMessage } from "../redux/actions/actions";
import RentPost from "../models/RentPost";
import Carousel from "nuka-carousel";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { IconButton } from "@material-ui/core";
import { OutlinedInput } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import MessageDTO from "../models/dtos/MessageDTO";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

interface IProps {
  visible: boolean;
  post: RentPost | undefined;
  toggleForm: Function;
  sendMessage: Function;
}

interface IState {
  message: string;
}

class ViewPostForm extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      message: "",
    };
  }

  handleMessageChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      message: event.target.value,
    });
  }

  handleCloseViewForm() {
    this.props.toggleForm(this.props.post);
  }

  handleSendMessageButton() {
    const sendRequest: MessageDTO = {
      authorID: this.props.post?.authorID || "0",
      message: this.state.message,
    };
    this.props.sendMessage(sendRequest);
    this.setState({
      message: "",
    });
    alert("Message sent.");
  }

  render() {
    return (
      <div
        className="view-form-container"
        style={{
          display: this.props.visible && this.props.post ? "flex" : "none",
        }}
      >
        <div className="view-form-header">
          <h2 className="view-form-title">
            {this.props.post?.postType.toLowerCase() +
              "ing " +
              this.props.post?.rentType.toLowerCase() +
              " in " +
              this.props.post?.location}
          </h2>
          <IconButton onClick={this.handleCloseViewForm.bind(this)} color="secondary">
            <HighlightOffRoundedIcon />
          </IconButton>
        </div>
        <div className="view-form-content">
          <div className="post-images">
            <Carousel
              renderCenterLeftControls={({ previousSlide }) => (
                <IconButton
                  disabled={this.props.post?.photos.length === 1}
                  onClick={previousSlide}
                >
                  <ChevronLeftIcon />
                </IconButton>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <IconButton
                  disabled={this.props.post?.photos.length === 1}
                  onClick={nextSlide}
                >
                  <ChevronRightIcon />
                </IconButton>
              )}
            >
              {this.props.post?.photos.map((photo: string) => (
                <img key={photo} className="post-image" src={photo} />
              ))}
            </Carousel>
          </div>
          <div className="post-infos">
            <div className="post-infoss">
              <div className="post-numbers">
                <label className="post-label">
                  Price: <p className="post-value">{this.props.post?.price}</p>
                </label>
                <label className="post-label">
                  Guaranty:
                  <p className="post-value">{this.props.post?.guaranty}</p>
                </label>
                <label className="post-label">
                  Rooms: <p className="post-value">{this.props.post?.rooms}</p>
                </label>
                <label className="post-label">
                  Bathrooms:
                  <p className="post-value">{this.props.post?.bathrooms}</p>
                </label>
                <label className="post-label">
                  Balcony:
                  <p className="post-value">{this.props.post?.bathrooms}</p>
                </label>
              </div>
              <div className="description">{this.props.post?.description}</div>
            </div>
            <div className="author-info">
              <label className="post-label">
                Posted by:
                <p className="post-value">{this.props.post?.authorName}</p>
              </label>
              <div className="author-contact">
                <label className="post-label">
                  Contact:
                  <p className="post-value">{this.props.post?.authorPhone}</p>
                </label>
                <div className="message-field">
                  <FormControl>
                    <OutlinedInput
                      multiline
                      rows={3}
                      value={this.state.message}
                      onChange={this.handleMessageChange.bind(this)}
                      autoComplete="new-password"
                      placeholder="Or send a message"
                    />
                  </FormControl>
                  <button
                    className="send-message-button"
                    onClick={this.handleSendMessageButton.bind(this)}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: DashboardState) => {
  return {
    visible: state.toggleViewForm,
    post: state.viewFormContent,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sendMessage: (request: MessageDTO) => dispatch(sendMessage(request)),
    toggleForm: (post: RentPost) => dispatch(toggleViewForm(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPostForm);
