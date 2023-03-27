import RentPost from "../../models/RentPost";

export default interface DashboardState {
    loading: boolean;
    error: string;
    rentPosts: RentPost[];
    rentPostSaved: string[];
    toggleAddForm: boolean;
    toggleViewForm: boolean;
    viewFormContent: RentPost | undefined;
}