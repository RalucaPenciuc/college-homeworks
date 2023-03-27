import MyAccountState from "../store/store";
import RentPost from "../../models/RentPost";
import UserDataResponse from "../../models/dtos/UserDataResponse";
import Message from "../../models/Message";

export function getUserDataBeginHandler(oldState: MyAccountState): MyAccountState {
    const newState = {...oldState};
    newState.loading = true;
    newState.error = "";
    newState.userData = undefined;
    newState.myPosts = [];
    newState.savedPosts = [];
    return newState;
}
export function getUserDataSuccessHandler(oldState: MyAccountState, userData: UserDataResponse): MyAccountState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    newState.userData = userData.userData;
    newState.myPosts = userData.myPosts;
    newState.savedPosts = userData.savedPosts;
    return newState;
}
export function getUserDataErrorHandler(oldState: MyAccountState, error: string): MyAccountState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    newState.userData = undefined;
    newState.myPosts = [];
    newState.savedPosts = [];
    return newState;
}


export function deleteSavedPostBeginHandler(oldState: MyAccountState): MyAccountState {
    const newState = {...oldState};
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function deleteSavedPostSuccessHandler(oldState: MyAccountState, postID: string): MyAccountState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    newState.savedPosts = oldState.savedPosts.filter((post: RentPost) => post.docRef !== postID);
    return newState;
}
export function deleteSavedPostErrorHandler(oldState: MyAccountState, error: string): MyAccountState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}


export function editPostBeginHandler(oldState: MyAccountState): MyAccountState {
    const newState = {...oldState};
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function editPostSuccessHandler(oldState: MyAccountState, postID: string): MyAccountState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    return newState;
}
export function editPostErrorHandler(oldState: MyAccountState, error: string): MyAccountState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}


export function deletePostBeginHandler(oldState: MyAccountState): MyAccountState {
    const newState = {...oldState};
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function deletePostSuccessHandler(oldState: MyAccountState, postID: string): MyAccountState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    newState.myPosts = oldState.myPosts.filter((id) => id.docRef !== postID);
    return newState;
}
export function deletePostErrorHandler(oldState: MyAccountState, error: string): MyAccountState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}


export function fetchMessagesBeginHandler(oldState: MyAccountState): MyAccountState {
    const newState = {...oldState};
    newState.loading = true;
    newState.error = "";
    newState.messages = [];
    return newState;
}
export function fetchMessagesSuccessHandler(oldState: MyAccountState, messages: Message[]): MyAccountState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    newState.messages = messages;
    return newState;
}
export function fetchMessagesErrorHandler(oldState: MyAccountState, error: string): MyAccountState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    newState.messages = [];
    return newState;
}


export function sendReplyBeginHandler(oldState: MyAccountState): MyAccountState {
    const newState = {...oldState};
    newState.loading = true;
    newState.error = "";
    newState.messages = oldState.messages;
    return newState;
}
export function sendReplySuccessHandler(oldState: MyAccountState, result: Message): MyAccountState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    let newMessage = true;
    newState.messages = oldState.messages.map((message: Message) => {
        if (result.sender === message.sender && result.receiver === message.receiver) {
            const newMessages = message.messages.slice();
            newMessages.splice(0, 0, result.messages[0]);
            message.messages = newMessages;
            newMessage = false;
        }
        return message;
    });
    if (newMessage) {
        const newMessages = newState.messages.slice();
        newMessages.splice(0, 0, result);
        newState.messages = newMessages;    
    }
    return newState;
}
export function sendReplyErrorHandler(oldState: MyAccountState, error: string): MyAccountState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    newState.messages = oldState.messages;
    return newState;
}