import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

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
      getUserIdFromServer(user)
    }
  }, [])

  const getUserIdFromServer = async (user) => {
    const users = await userService.getAll()
    const returnedUser = users.filter(usr => usr.username === user.username)
    setUserId(returnedUser[0].id)
  }

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
      getUserIdFromServer(user)
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
    setUserId('')
  }

  const submitNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`A new blog ${newBlog.title} by ${newBlog.author} was added`)
        setTimeout(() => setMessage(null), 5000)
      })
  }

  const loginForm = () => {
    <Togglable buttonLabel={'Login'}>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>

        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

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

      <Togglable buttonLabel="Create New" ref={blogFormRef}>
        <BlogForm
          submitNewBlog={submitNewBlog} />
      </Togglable>


      {blogs.sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} user={user} blogs={blogs} setBlogs={setBlogs} blog={blog} setMessage={setMessage} userId={userId}/>
        )}
    </>
  )
}

export default App