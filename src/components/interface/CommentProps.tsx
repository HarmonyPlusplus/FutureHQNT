import { Comment } from "../interface/CommentInt";
export interface CommentsProps {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  postId: number;
}