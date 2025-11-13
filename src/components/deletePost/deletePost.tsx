'use client'
import React, { useState } from 'react'
import axios from 'axios'
// import { Post } from '../interface/PostInt'
import { DeletePostProps } from '../interface/DeletePostProps'


// interface DeletePostProps {
//   post: Post
// }

const DeletePost: React.FC<DeletePostProps> = ({ post }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!post?.id) {
      alert('Post ID not found.')
      return
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this post?')
    if (!confirmDelete) return

    setLoading(true)

    try {
      await axios.delete(`https://titusukpono.pythonanywhere.com/articles/${post.id}`)
      alert('Post deleted successfully!')
      window.location.reload()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 font-semibold hover:underline disabled:opacity-50 max-md:text-[12px]"
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}

export default DeletePost
