'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { NewPostProps } from '../interface/NewPostProps'
import { PostData } from '../interface/PostData'

const NewPost: React.FC<NewPostProps> = ({ onClose }) => {

  const [postData, setPostData] = useState<PostData>({
    title: '',
    text: '',
    image: null,
  })

  const { title, text, image } = postData;

  const handleAddPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('text', text)
    if (image) formData.append('image', image)

    try {
      await axios.post('https://titusukpono.pythonanywhere.com/articles/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      alert('Post added successfully!')
      onClose()
      window.location.reload()
    } catch (error) {
      alert('Failed to add post')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleAddPost} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">New Post</h2>

      <input
        type="text"
        value={title}
        onChange={(e) =>
          setPostData(prev => ({ ...prev, title: e.target.value }))
        }
        placeholder="Title"
        className="border rounded p-2"
        required
      />

      <textarea
        value={text}
        onChange={(e) =>
          setPostData(prev => ({ ...prev, text: e.target.value }))
        }
        placeholder="Write your post..."
        className="border rounded p-2 h-40"
        required
      />

      <input
        placeholder='file'
        type="file"
        accept="image/*"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPostData(prev => ({
            ...prev,
            image: e.target.files ? e.target.files[0] : null
          }))
        }
        className="border p-2"
      />

      <button
        type="submit"
        className="bg-[#00A58E] text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  )
}

export default NewPost
