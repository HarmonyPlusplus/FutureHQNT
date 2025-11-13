import React from 'react'
import Replies from './replies'
import ViewReplies from './veiwReplies'
import { Post } from '../interface/PostInt'
import EditPost from '@/components/editPost/editPost'
import DeletePost from '../deletePost/deletePost'
import { GenFootProps } from '../interface/GenFootProps'

const GenFoot: React.FC<GenFootProps> = ({ post, setSelectedPost }) => {
  return (
    <div className='flex items-center justify-between'>
      <Replies articleId={post.id} />
      <div className='flex gap-2'>
        <DeletePost post={post} />
        <EditPost post={post} />
        <ViewReplies post={post} setSelectedPost={setSelectedPost} />
      </div>
    </div>
  )
}

export default GenFoot
