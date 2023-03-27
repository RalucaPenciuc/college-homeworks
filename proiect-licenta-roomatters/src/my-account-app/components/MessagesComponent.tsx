import React, { Component } from "react";
import "../scss/MessagesComponent.scss";
import { connect } from "react-redux";
import Message from "../models/Message";
import MyAccountState from "../redux/store/store";
import SenderData from "../models/SenderData";
import MessageDTO from "../models/dtos/MessageDTO";
import { fetchMessagesBegin, sendReplyBegin } from "../redux/actions/actions";
import { FormControl, OutlinedInput } from "@material-ui/core";
import { getCookie } from "../services/CookieService";
import SendReplyRequest from "../models/SendReplyRequest";

interface IProps {
  loading: boolean;
  error: string;
  messages: Message[];
  fetchMessages: Function;
  sendReply: Function;
}

interface IState {
  selectedUser: SenderData;
  replyContent: string;
}

class MessagesComponent extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedUser: {
        docRef: "",
        email: "",
        firstName: "",
        lastName: "",
        profileImage: "",
      },
      replyContent: "",
    };
  }

  componentDidMount() {
    this.props.fetchMessages();
  }

  handleReplyMessage() {
    const request: SendReplyRequest = {
      receiver: this.state.selectedUser,
      content: this.state.replyContent,
    };
    this.props.sendReply(request);
    this.setState({
      replyContent: "",
    });
  }

  render() {
    return (
      <div className="messages-page-container">
        <h1 className="messages-page-title">Messages</h1>
        <div className="messages-page-content">
          <div className="messages-page-menu-view">
            <div className="messages-page-menu">
              {this.props.messages
                .filter(
                  (message: Message) =>
                    message.sender.docRef !== getCookie("not-token")
                )
                .map((message: Message) => {
                  return (
                    <div
                      className="messages-page-menu-item"
                      key={message.sender.docRef}
                      onClick={() => {
                        this.setState({
                          selectedUser: message.sender,
                        });
                      }}
                    >
                      <img
                        className="message-sender-image"
                        src={message.sender.profileImage}
                      />
                      <p className="message-sender-name">
                        {message.sender.firstName +
                          " " +
                          message.sender.lastName}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="messages-page-form-view">
            <div className="messages-page-form-container">
              <div className="message-view-header">
                {this.state.selectedUser.profileImage === "" ? (
                  <></>
                ) : (
                  <img
                    className="sender-image-header"
                    src={this.state.selectedUser?.profileImage}
                  />
                )}
                <div className="sender-info-header">
                  <p className="sender-name-header">
                    {this.state.selectedUser?.firstName +
                      " " +
                      this.state.selectedUser?.lastName}
                  </p>
                  <p className="sender-email-header">
                    {this.state.selectedUser?.email}
                  </p>
                </div>
              </div>
              <div className="messages-view">
                {this.state.selectedUser.docRef !== "" ? (
                  this.props.messages
                    .filter(
                      (m: Message) => m.sender === this.state.selectedUser
                    )[0]
                    .messages.concat(
                      this.props.messages.filter(
                        (m: Message) => m.receiver === this.state.selectedUser
                      )[0]?.messages
                    )
                    .sort(
                      (a, b) =>
                        b.createDate.toMillis() - a.createDate.toMillis()
                    )
                    .map((message) => {
                      if (message) {
                        if (message.senderID === getCookie("not-token")) {
                          return (
                            <p className="piece-of-reply" key={message.docRef}>
                              {message.content}
                            </p>
                          );
                        } else {
                          return (
                            <p
                              className="piece-of-message"
                              key={message.docRef}
                            >
                              {message.content}
                            </p>
                          );
                        }
                      } else return <></>;
                    })
                ) : (
                  <></>
                )}
              </div>
              <div className="reply-message-view">
                <FormControl className="reply-message-input">
                  <OutlinedInput
                    multiline
                    rows={1}
                    value={this.state.replyContent}
                    onChange={this.handleReplyContentChange.bind(this)}
                    autoComplete="new-password"
                    placeholder="Type a reply..."
                  />
                </FormControl>
                <button
                  className="reply-message-button"
                  onClick={this.handleReplyMessage.bind(this)}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleReplyContentChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      replyContent: event.target.value,
    });
  }
}

const mapStateToProps = (state: MyAccountState) => {
  return {
    loading: state.loading,
    error: state.error,
    messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchMessages: () => dispatch(fetchMessagesBegin()),
    sendReply: (request: SendReplyRequest) => dispatch(sendReplyBegin(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesComponent);
