import React from "react";
import Image from "next/image";
import CommentReaction from "./commentsReaction";
import DeleteComment from "./deleteComment";
import { CommentsProps } from "../interface/CommentProps";

const Comments = ({ comments, setComments, postId }: CommentsProps) => {
  if (comments.length === 0) {
    return <p className="text-gray-400 text-sm">No comments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border-b pb-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {comment.user.avatar ? (
                <Image
                  src={comment.user.avatar}
                  alt={comment.user.fullname}
                  width={30}
                  height={30}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
              )}
              <p className="text-sm font-medium">{comment.user.fullname}</p>
            </div>

            <div className="ml-10 mt-1">
              <CommentReaction
                article_id={postId}
                comment_id={comment.id}
                comment_reaction={comment.has_reacted}
              />
            </div>
          </div>

          <div className="text-sm mt-1">{comment.text}</div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {new Date(comment.created_at).toLocaleDateString()} •{" "}
              {new Date(comment.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <DeleteComment
              comment_id={comment.id}
              article_id={postId}
              onDeleteSuccess={(id) =>
                setComments((prev) => prev.filter((c) => c.id !== id))
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
