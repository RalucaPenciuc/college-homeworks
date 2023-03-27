import {
  DashboardActionType,
  FETCH_RENT_POSTS_BEGIN,
  FETCH_RENT_POSTS_SUCCESS,
  FETCH_RENT_POSTS_ERROR,
  SAVE_POST_BEGIN,
  SAVE_POST_SUCCESS,
  SAVE_POST_ERROR,
  TOGGLE_ADD_FORM,
  UNSAVE_POST_BEGIN,
  UNSAVE_POST_SUCCESS,
  UNSAVE_POST_ERROR,
  CREATE_RENT_POST_BEGIN,
  CREATE_RENT_POST_SUCCESS,
  CREATE_RENT_POST_ERROR,
  TOGGLE_VIEW_FORM,
  SEND_MESSAGE,
} from "./types";
import RentPost from "../../models/RentPost";
import RentPostDTO from "../../models/dtos/RentPostDTO";
import MessageDTO from "../../models/dtos/MessageDTO";

export function fetchRentPostsBegin(): DashboardActionType {
    return {
        type: FETCH_RENT_POSTS_BEGIN,
        payload: undefined,
    };
}
export function fetchRentPostsSuccess(rentPosts: RentPost[]): DashboardActionType {
    return {
        type: FETCH_RENT_POSTS_SUCCESS,
        payload: rentPosts,
    };
}
export function fetchRentPostsError(error: string): DashboardActionType {
    return {
        type: FETCH_RENT_POSTS_ERROR,
        payload: error,
    };
}


export function createRentPostBegin(request: RentPostDTO): DashboardActionType {
    return {
        type: CREATE_RENT_POST_BEGIN,
        payload: request
    }
}
export function createRentPostSuccess(rentPost: RentPost): DashboardActionType {
    return {
        type: CREATE_RENT_POST_SUCCESS,
        payload: rentPost
    }
}
export function createRentPostError(error: string): DashboardActionType {
    return {
        type: CREATE_RENT_POST_ERROR,
        payload: error
    }
}


export function savePostBegin(postID: string): DashboardActionType {
    return {
        type: SAVE_POST_BEGIN,
        payload: postID,
    };
}
export function savePostSuccess(postID: string): DashboardActionType {
    return {
        type: SAVE_POST_SUCCESS,
        payload: postID,
    };
}
export function savePostError(error: string): DashboardActionType {
    return {
        type: SAVE_POST_ERROR,
        payload: error,
    };
}


export function unsavePostBegin(postID: string): DashboardActionType {
    return {
        type: UNSAVE_POST_BEGIN,
        payload: postID,
    };
}
export function unsavePostSuccess(postID: string): DashboardActionType {
    return {
        type: UNSAVE_POST_SUCCESS,
        payload: postID,
    };
}
export function unsavePostError(error: string): DashboardActionType {
    return {
        type: UNSAVE_POST_ERROR,
        payload: error,
    };
}


export function toggleAddForm(): DashboardActionType {
    return {
        type: TOGGLE_ADD_FORM,
        payload: undefined
    }
}


export function toggleViewForm(content: RentPost): DashboardActionType {
    return {
        type: TOGGLE_VIEW_FORM,
        payload: content
    }
}


export function sendMessage(request: MessageDTO): DashboardActionType {
    return {
        type: SEND_MESSAGE,
        payload: request
    }
}