import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, setMessage, userId }) => {
  const [viewDetails, setViewDetails] = useState(false)
  const [blogObj, setBlogObj] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleView = () => {
    setViewDetails(!viewDetails)
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    const response = await blogService.removeBlog(blog.id)
    console.log(response)
    if (response === 204) {
      setBlogs(blogs.filter(blogObj => blogObj.id !== blog.id))
    } else if (response === 200) {
      setMessage('You are not authorized to delete this blog')
    }
  }

  const showDetails = () => (
    <>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes} <button onClick={addLike}>like</button></p>
      <p>{blog.author}</p>
      {userId === blog.user ? 
      <button onClick={removeBlog}>Remove</button>
      : false}
    </>
  )

  const addLike = async (event) => {
    event.preventDefault()
    
    const likes = blog.likes += 1
    const updatedBlog = await blogService.update(`/${blog.id}`, { ...blog, likes })
    setBlogObj(updatedBlog)
  }

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={handleView}>view</button>
    {viewDetails ? showDetails() : false}
  </div>  
)}

export default Blog