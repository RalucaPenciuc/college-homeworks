import PostComment from "./PostComment";

export default interface Post {
  docRef?: string;
  authorID: string;
  authorName: string;
  authorProfileImage: string;
  content: string;
  comments: PostComment[];
}
