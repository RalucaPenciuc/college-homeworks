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
} from "../actions/types";
import DashboardState from "../store/store";
import {
  fetchRentPostsBeginHandler,
  fetchRentPostsSuccessHandler,
  fetchRentPostsErrorHandler,
  savePostBeginHandler,
  savePostSuccessHandler,
  savePostErrorHandler,
  toggleAddFormHandler,
  unsavePostBeginHandler,
  unsavePostSuccessHandler,
  unsavePostErrorHandler,
  createRentPostBeginHandler,
  createRentPostSuccessHandler,
  createRentPostErrorHandler,
  toggleViewFormHandler,
} from "./reducerHandlers";

const initialState: DashboardState = {
  loading: false,
  error: "",
  rentPosts: [],
  rentPostSaved: [],
  toggleAddForm: false,
  toggleViewForm: false,
  viewFormContent: undefined
};

export default function dashboardReducer(state = initialState, action: DashboardActionType): DashboardState {
  switch (action.type) {
    case FETCH_RENT_POSTS_BEGIN:
      return fetchRentPostsBeginHandler(state);
    case FETCH_RENT_POSTS_SUCCESS:
      return fetchRentPostsSuccessHandler(state, action.payload);
    case FETCH_RENT_POSTS_ERROR:
      return fetchRentPostsErrorHandler(state, action.payload);

    case CREATE_RENT_POST_BEGIN:
      return createRentPostBeginHandler(state);
    case CREATE_RENT_POST_SUCCESS:
      return createRentPostSuccessHandler(state, action.payload);
    case CREATE_RENT_POST_ERROR:
      return createRentPostErrorHandler(state, action.payload);
  
    case SAVE_POST_BEGIN:
      return savePostBeginHandler(state);
    case SAVE_POST_SUCCESS:
      return savePostSuccessHandler(state, action.payload);
    case SAVE_POST_ERROR:
      return savePostErrorHandler(state, action.payload);

    case UNSAVE_POST_BEGIN:
      return unsavePostBeginHandler(state);
    case UNSAVE_POST_SUCCESS:
      return unsavePostSuccessHandler(state, action.payload);
    case UNSAVE_POST_ERROR:
      return unsavePostErrorHandler(state, action.payload);

    case TOGGLE_ADD_FORM:
      return toggleAddFormHandler(state);

    case TOGGLE_VIEW_FORM:
      return toggleViewFormHandler(state, action.payload);

    default:
      return state;
  }
}
