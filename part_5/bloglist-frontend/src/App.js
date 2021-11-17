import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null) 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    blogService.setToken(null)
    window.localStorage.removeItem(
      'loggedBlogappUser'
    )

    setUser(null)
    setUsername('')
    setPassword('')
  }

  const submitNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      url: url,
      author: author,
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setUrl('')
        setAuthor('')
        setMessage(`A new blog ${blogObject.title} by ${blogObject.author} was added`)
        setTimeout(() => setMessage(null), 5000)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />

        {loginForm()}
      </div>
    )
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification message={message} />

      <form onSubmit={handleLogout}>
        <p>{`${user.username} logged in `}</p>
        <button type="submit">Logout</button>
      </form>

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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default App