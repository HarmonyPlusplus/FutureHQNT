import React from 'react'
import Replies from './replies'
import VeiwReplies from './veiwReplies'
// import { Post } from './genAnnoucement'
import EditPost from '@/components/editPost/editPost'
import DeletePost from '../deletePost/deletePost'
import { GenFootProps } from '../interface/GenFootProps'

const GenFoot = ({ post, setSelectedPost }: GenFootProps) => {
  return (
    <div className='h-8 justify-between flex items-center'>
      <Replies articleId={post.id} />
      <div className='flex gap-2'>
        <DeletePost post={post}/>
        <EditPost post={post} />
        <VeiwReplies post={post} setSelectedPost={setSelectedPost} />
      </div>
    </div>
  )
}

export default GenFoot
