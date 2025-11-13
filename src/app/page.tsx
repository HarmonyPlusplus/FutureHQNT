'use client'
import { useState } from 'react'
import GenAnnoucement from "@/components/generalAnnouce/genAnnoucement"
import SideArticle from "@/components/generalAnnouce/sideArticle"
import { Post } from '../components/interface/PostMainInt'


export default function Home() {
   const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  return (  
    <div className='flex  '>
      <div className=' overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-6 py-6 max-md:px-2 max-md:py-0 w-full  mx-auto'>
        <GenAnnoucement setSelectedPost={setSelectedPost}/>
      </div>
      <div className=''>
        <SideArticle post={selectedPost} />

      </div>
    </div>
  )
}
