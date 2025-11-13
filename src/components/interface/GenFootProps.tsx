import { Post } from "../interface/PostMainInt";
export interface GenFootProps {
  post: Post;
  setSelectedPost: (post: Post) => void;
}
