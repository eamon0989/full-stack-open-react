import React from "react";

const BlogForm = ({ submitNewBlog, title, setTitle, setAuthor, author, url, setUrl }) => {
  return (
    <form onSubmit={submitNewBlog}>
    <label name='title'>Title:</label>
    <input 
      type='text' 
      name='title' 
      value={title}
      onChange={({ target }) => setTitle(target.value)}
    />
    <label name='author'>Author:</label>
    <input 
      type='text' 
      name='author' 
      value={author}
      onChange={({ target }) => setAuthor(target.value)}
    />
    <label name='url'>URL:</label>
    <input 
      type='text' 
      name='url' 
      value={url}
      onChange={({ target }) => setUrl(target.value)}
    />
    <button type="submit">Create</button>
  </form>
  )
}

export default BlogForm