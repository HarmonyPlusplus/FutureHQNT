import React from 'react'
import Image from 'next/image'
import SideArrow from '../../../public/assets/sidearrow.png'
import { useVisibility } from "../Content/context";
import { Post } from "../interface/PostMainInt";


interface VeiwRepliesProps {
  post: Post;
  setSelectedPost: (post: Post) => void;
}

const VeiwReplies = ({ post, setSelectedPost }: VeiwRepliesProps) => {
  const { setIsVisible } = useVisibility();

  return (
    <button
      onClick={() => {
        setSelectedPost(post);
        setIsVisible(true);
      }}
      className='flex items-center gap-2 max-md:text-[13px]'
    >
      <p>View Replies</p>
      <Image src={SideArrow} alt="replies" width={5} height={5} />
    </button>
  )
}

export default VeiwReplies
