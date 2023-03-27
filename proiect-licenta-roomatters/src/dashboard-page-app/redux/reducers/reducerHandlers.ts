import DashboardState from "../store/store";
import RentPost from "../../models/RentPost";

export function fetchRentPostsBeginHandler(oldState: DashboardState): DashboardState {
    const newState = {...oldState};
    newState.loading = true;
    newState.error = "";
    newState.rentPosts = [];
    return newState;
}
export function fetchRentPostsSuccessHandler(oldState: DashboardState, rentPosts: RentPost[]): DashboardState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    newState.rentPosts = rentPosts;
    return newState;
}
export function fetchRentPostsErrorHandler(oldState: DashboardState, error: string): DashboardState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    newState.rentPosts = [];
    return newState;
}


export function createRentPostBeginHandler(oldState: DashboardState): DashboardState {
    const newState = {...oldState};
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function createRentPostSuccessHandler(oldState: DashboardState, rentPost: RentPost): DashboardState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    let newRentPosts = newState.rentPosts.slice();
    newRentPosts.splice(0, 0, rentPost);
    newState.rentPosts = newRentPosts;
    return newState;
}
export function createRentPostErrorHandler(oldState: DashboardState, error: string): DashboardState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}


export function savePostBeginHandler(oldState: DashboardState): DashboardState {
    const newState = {...oldState};
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function savePostSuccessHandler(oldState: DashboardState, postID: string): DashboardState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    let newSavedPosts = newState.rentPostSaved.slice();
    newSavedPosts.splice(0, 0, postID);
    newState.rentPostSaved = newSavedPosts;
    return newState;
}
export function savePostErrorHandler(oldState: DashboardState, error: string): DashboardState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    newState.rentPostSaved = [];
    return newState;
}


export function unsavePostBeginHandler(oldState: DashboardState): DashboardState {
    const newState = {...oldState};
    newState.loading = true;
    newState.error = "";
    return newState;
}
export function unsavePostSuccessHandler(oldState: DashboardState, postID: string): DashboardState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = "";
    newState.rentPostSaved = oldState.rentPostSaved.filter(rentPostID => rentPostID !== postID);    
    return newState;
}
export function unsavePostErrorHandler(oldState: DashboardState, error: string): DashboardState {
    const newState = {...oldState};
    newState.loading = false;
    newState.error = error;
    return newState;
}


export function toggleAddFormHandler(oldState: DashboardState): DashboardState {
    const newState = {...oldState};
    newState.toggleAddForm = !oldState.toggleAddForm;
    newState.toggleViewForm = false;
    newState.viewFormContent = undefined;
    return newState;
}


export function toggleViewFormHandler(oldState: DashboardState, content: RentPost): DashboardState {
    const newState = {...oldState};
    if (oldState.toggleViewForm) {
        newState.toggleViewForm = false;
        newState.viewFormContent = undefined;
    } else {
        newState.toggleViewForm = true;
        newState.viewFormContent = content;
        newState.toggleAddForm = false;
    }
    return newState;
}