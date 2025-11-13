"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useVisibility } from "../Content/context";
// import { Post } from "./genAnnoucement";
import Image from "next/image";
import TextBox from "@/components/generalAnnouce/textBox";
import Comments from "./comments";
import { SideArticleProps } from "../interface/SideArticleProps";
import { Comment } from "../interface/CommentInt";

const SideArticle = ({ post }: SideArticleProps) => {
    const { isVisible, setIsVisible } = useVisibility();
    const [comments, setComments] = useState<Comment[]>([]);
    

    useEffect(() => {
        if (!post) return;
        const fetchComments = async () => {
            try {
                const res = await axios.get(
                    `https://titusukpono.pythonanywhere.com/articles/${post.id}/comments/`
                );
                setComments(res.data.results || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchComments();
    }, [post]);

    if (!post || !isVisible) return null;

    return (
        <div className="h-full bg-white w-[300px] border-l shadow-lg p-4 flex flex-col max-lg:w-full max-lg:z-50 max-lg:fixed top-0 left-0   transform transition-transform duration-300 lg:static ">
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold">General Announcement</h1>
                <button onClick={() => setIsVisible(false)}>✕</button>
            </div>

            <div className="h-[460px] overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-1">
                {/* POST */}
                <div className="flex items-center gap-2 mb-3">
                    {post.author.avatar ? (
                        <Image
                            src={post.author.avatar}
                            alt={post.author.fullname}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    )}

                    <div>
                        <p>{post.author.fullname}</p>
                        <small className="text-xs text-gray-500">
                            {new Date(post.created_at).toLocaleDateString()} •{" "}
                            {new Date(post.created_at).toLocaleTimeString()}
                        </small>
                    </div>
                </div>

                <h2 className="font-semibold mb-2">{post.title}</h2>
                <p className="mb-3">{post.text}</p>

                {post.image && (
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={200}
                        height={200}
                        className="w-full rounded-md mb-4"
                    />
                )}

                <Comments comments={comments} setComments={setComments} postId={post.id} />

            </div>

            <div className="mt-2 shrink-0">
                <TextBox
                    postId={post.id}
                    onCommentAdded={(newComment) =>
                        setComments((prev) => [newComment, ...prev])
                    }
                />
            </div>
        </div>
    );
};

export default SideArticle;
