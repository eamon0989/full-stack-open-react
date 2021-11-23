import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
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

  const showDetails = () => (
    <>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes} <button onClick={addLike}>like</button></p>
      <p>{blog.author}</p>
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