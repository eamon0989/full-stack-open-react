const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('users')
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // if (!request.token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  
  // const user = await User.findById(decodedToken.id)
  const user = request.user

  const blog = new Blog({
    title: body.title,
    url: body.url, 
    likes: body.likes, 
    user:user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // if (!request.token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  
  // const user = await User.findById(decodedToken.id)
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  console.log(blog.user.toString())
  console.log()

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.json({ error: 'You are not authorized to delete this blog' })
  }

})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  
  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    id: request.params.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter