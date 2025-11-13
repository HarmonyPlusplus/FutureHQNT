'use client';

import {  useState } from "react";
import axios from "axios";
import { DeleteCommentProps } from "../interface/DeleteCommentProps";

const DeleteComment = ({ comment_id, article_id, onDeleteSuccess }: DeleteCommentProps) => {
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    
    try {
      setDeleting(true);

      await axios.delete(
        `https://titusukpono.pythonanywhere.com/articles/${article_id}/comments/${comment_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Comment deleted successfully.");
      if (onDeleteSuccess) onDeleteSuccess(comment_id);

    } catch (error: any) {
      console.error("Error deleting comment:", error?.response?.data || error.message);
      alert("Failed to delete comment.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleDelete}
        disabled={deleting}
        className={`text-red-500 hover:text-red-700 ${
          deleting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default DeleteComment;
