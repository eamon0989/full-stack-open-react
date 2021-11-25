import React, { useState } from 'react'

const BlogForm = ({ submitNewBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()
    submitNewBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createNewBlog}>
      <label name='title'>Title:</label>
      <input
        id='title'
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
      <button type='submit'>Create</button>
    </form>
  )
}

export default BlogForm