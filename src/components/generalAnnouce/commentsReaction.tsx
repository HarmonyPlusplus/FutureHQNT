"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Like from "../../../public/assets/liked.png";
import Unlike from "../../../public/assets/unliked.png";
import { CommentReactionProps } from "../interface/CommentReactionProps";


const CommentReaction = ({
  article_id,
  comment_id,
  comment_reaction,
}: CommentReactionProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(!!comment_reaction);
  const [loading, setLoading] = useState<boolean>(false);

  const react = async () => {
    if (loading) return; // prevent double clicks
    setLoading(true);

    try {
      const response = await axios.post(
        `https://titusukpono.pythonanywhere.com/articles/${article_id}/comments/${comment_id}/reaction`,
        { comment: comment_id }
      );

      if (response.status === 201) {
        setIsLiked((prev) => !prev);
      }
    } catch (error: any) {
      console.error("Failed to react to comment:", error?.response?.data || error.message);
      alert("Failed to react to comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={react}
        disabled={loading}
        aria-label={isLiked ? "Unlike comment" : "Like comment"}
        className={`cursor-pointer transition-transform hover:scale-110 ${loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        <Image src={isLiked ? Like : Unlike} alt="Reaction icon" width={24} height={24} />
      </button>

      <p>{isLiked ? "1" : "0"}</p>
    </div>
  );
};

export default CommentReaction;
