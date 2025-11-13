'use client';
import Reply from "@/components/generalAnnouce/reply";
import Reactions from "@/components/generalAnnouce/reactions";
import Share from "@/components/generalAnnouce/share";
import GenFoot from "@/components/generalAnnouce/genFoot";

import Image from "next/image";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Author } from "../interface/Author";
import { Post } from "../interface/PostMainInt";
import { GenAnnouncementProps } from "../interface/GenAnnouncementProps";


function GenAnnoucement({ setSelectedPost }: GenAnnouncementProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://titusukpono.pythonanywhere.com/articles/');

        const data = response.data.results;

        setPosts(data || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 animate-pulse">
        <div className="w-full h-50 rounded-[20px] bg-gray-300">
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
        <div className="w-full h-50 rounded-[20px] bg-gray-300"></div>
        <div className="w-full h-50 rounded-[20px] bg-gray-300"></div>


      </div>
    );
  }
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6  h-screen">

      {posts.length === 0 && (
        <p className="text-center">No posts available.</p>
      )}

      {posts.map((post) => (
        <div key={post.id} className="p-4 rounded-md shadow-sm bg-white">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10">
                {post.author?.avatar && post.author.avatar.trim() !== "" ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.fullname}
                    width={50}
                    height={50}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : post.image && post.image.trim() !== "" ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={50}
                    height={50}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                )}

              </div>
              <div>
                <h1>{post.author.fullname}</h1>
                <div className='flex gap-1 text-gray-500 text-sm max-md:text-[10px] max-md:overflow-hidden'>
                  <p>{new Date(post.created_at).toLocaleDateString()}</p>
                  <p>{new Date(post.created_at).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-7 max-md:gap-2">
              <Reactions
                id={post.id}
                initialCount={post.reaction ? Number(post.reaction) : 0}
                initialIsLiked={false} // or true if backend provides it
              />

              <Reply />
              <Share />
            </div>
          </div>


          <div className="my-4">
            <h1 className="font-bold text-lg mb-2">{post.title}</h1>
            <p>{post.text}</p>
            {post.image && (
              <div className="mx-auto w-full max-w-[1000]">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1000}
                  height={50}
                  className=" mt-2"
                />
              </div>
            )}
          </div>
          <div>
            <GenFoot post={post} setSelectedPost={setSelectedPost} />
          </div>
        </div>
      ))}
    </div>
  );

}

export default GenAnnoucement
