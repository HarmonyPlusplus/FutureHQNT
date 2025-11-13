export interface DeleteCommentProps {
  comment_id: number;
  article_id: number;
  onDeleteSuccess?: (id: number) => void;
}