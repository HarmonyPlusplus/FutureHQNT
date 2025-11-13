"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import RepliedIcon from "../../../public/assets/replies.png";

interface RepliesProps {
    articleId: number;
}

const Replies: React.FC<RepliesProps> = ({ articleId }) => {
    const [repliesCount, setRepliesCount] = useState<number>(0);

    useEffect(() => {
        const fetchRepliesCount = async () => {
            try {
                const response = await axios.get(
                    `https://titusukpono.pythonanywhere.com/articles/${articleId}/comments/`
                );

                // Assuming backend response structure includes `count`
                setRepliesCount(response.data.count ?? 0);
            } catch (error) {
                console.error("Error fetching replies count:", error);
            }
        };

        fetchRepliesCount();
    }, [articleId]);

    return (
        <div className="flex items-center gap-1 cursor-pointer">
            <Image
                src={RepliedIcon}
                alt="Replies Icon"
                width={28}
                height={28}
                className="object-contain"
            />

            <p className="max-md:hidden">{repliesCount} Replies</p>

            <p className="md:hidden">{repliesCount}</p>
        </div>
    );
};

export default Replies;
