"use client";

import { useState, useContext } from "react";
import axios from "axios";
import Image from "next/image";

import Add from "../../../public/assets/add.png";
import Underline from "../../../public/assets/underline.png";
import Emoji from "../../../public/assets/emoji.png";
import Tag from "../../../public/assets/tag.png";
import Facetime from "../../../public/assets/facetime.png";
import Mic from "../../../public/assets/mic.png";
import Send from "../../../public/assets/send.png";
import { TextBoxProps } from "../interface/TextBoxProps";


const TextBox = ({ postId, onCommentAdded }: TextBoxProps) => {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSend = async () => {
        if (!text.trim()) return alert("Please type a comment!");


        setLoading(true);
        try {
            const response = await axios.post(
                `https://titusukpono.pythonanywhere.com/articles/${postId}/comments/`,
                { text, article: postId },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setText("");
            if (onCommentAdded) onCommentAdded(response.data);
        } catch (error: any) {
            console.error("Error sending comment:", error.response?.data || error.message);
            alert("Failed to send comment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border border-gray-300 rounded-lg p-2 mt-1 bg-white shadow-md flex flex-col gap-2 shrink-0">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none  text-sm resize-none"
                placeholder="Write a reply..."
                disabled={loading}
                rows={3}
            />

            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <button
                        type="button"
                        aria-label="Add attachment"
                        title="Add attachment"
                        className="p-1"
                    >
                        <Image src={Add} alt="" width={15} height={15} />
                    </button>

                    <button
                        type="button"
                        aria-label="Format underline"
                        title="Underline"
                        className="p-1"
                    >
                        <Image src={Underline} alt="" width={15} height={15} />
                    </button>

                    <button
                        type="button"
                        aria-label="Open emoji picker"
                        title="Emoji"
                        className="p-1"
                    >
                        <Image src={Emoji} alt="" width={15} height={15} />
                    </button>

                    <button
                        type="button"
                        aria-label="Add tag"
                        title="Tag"
                        className="p-1"
                    >
                        <Image src={Tag} alt="" width={15} height={15} />
                    </button>

                    <button
                        type="button"
                        aria-label="Start video"
                        title="Video"
                        className="p-1"
                    >
                        <Image src={Facetime} alt="" width={15} height={15} />
                    </button>

                    <button
                        type="button"
                        aria-label="Record audio"
                        title="Record"
                        className="p-1"
                    >
                        <Image src={Mic} alt="" width={15} height={15} />
                    </button>
                </div>

                <button
                    onClick={handleSend}
                    disabled={loading}
                    aria-label="Send comment"
                    title="Send"
                    className=" text-white px-3 py-2 rounded-md flex items-center gap-2 disabled:bg-gray-400"
                >
                    <Image src={Send} alt="" width={20} height={20} />
                    <span className="sr-only">Send comment</span>
                </button>
            </div>
        </div>
    );
};

export default TextBox;
