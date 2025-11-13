"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

import LikeIcon from "../../../public/assets/liked.png";
import UnlikeIcon from "../../../public/assets/unliked.png";

interface ReactionsProps {
  id: number;               
  initialCount: number;     
  initialIsLiked?: boolean;
}

const Reactions: React.FC<ReactionsProps> = ({ id, initialCount, initialIsLiked = false }) => {
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [count, setCount] = useState<number>(initialCount);
  const [loading, setLoading] = useState<boolean>(false);

  const react = async () => {
    if (loading) return; // avoid double clicks
    setLoading(true);

    try {
      const response = await axios.post(
        `https://titusukpono.pythonanywhere.com/articles/${id}/reaction`,
        { article: id } // REQUIRED BODY FROM YOUR DOCS
      );

      if (response.status === 201) {
        // Toggle like state
        setIsLiked((prev) => !prev);

        // Increase or decrease count instantly
        setCount((prev) => (isLiked ? prev - 1 : prev + 1));
      }
    } catch (error: any) {
      console.error("Reaction failed:", error?.response?.data || error.message);
      alert("Failed to react.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={react}
      disabled={loading}
      className={`flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <Image
        src={isLiked ? LikeIcon : UnlikeIcon}
        alt={isLiked ? "Liked" : "Not liked"}
        width={20}
        height={20}
        className={loading ? "animate-pulse" : "" }
      />

      {/* Desktop text */}
      <span className={`text-sm max-md:hidden ${isLiked ? "text-[#00A58E] font-semibold" : "text-gray-500"}`}>
        {count} {count === 1 ? "Reaction" : "Reactions"}
      </span>

      {/* Mobile only number */}
      <span className={`text-sm md:hidden ${isLiked ? "text-[#00A58E] font-semibold" : "text-gray-500"}`}>
        {count}
      </span>
    </button>
  );
};

export default Reactions;
