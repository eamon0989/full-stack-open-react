const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

let headers = {}
beforeEach(async () => {

  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  const testUser = {
    username: 'tester',
    password: 'password',
  }

  await api
    .post('/api/users')
    .send(testUser)

  const result = await api
    .post('/api/login')
    .send(testUser)

  headers = {
    'Authorization': `bearer ${result.body.token}`
  }
})

test('blogs are returned as json', async () => {
  await api 
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id property is present', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Me',
    url: 'https://testingblogs.com/',
    likes: 70,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .set(headers)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).toContain(
    'Test Blog'
  )
})

test('posting a blog without authorisation results in a 401 ', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Me',
    url: 'https://testingblogs.com/',
    likes: 70,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)
})

test('if likes is missing, defaults to 0', async () => {
  const newBlog = {
    title: 'Should have 0 likes',
    author: 'Me',
    url: 'https://nolikey.com/',
  }

  const response = await api
    .post('/api/blogs')
    .set(headers)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('if title is missing, responds with 400', async () => {
  const newBlog = {
    author: 'Me',
    url: 'https://nolikey.com/'
  }

  await api
    .post('/api/blogs')
    .set(headers)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('if url is missing, responds with 400', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Me'
  }

  await api
    .post('/api/blogs')
    .set(headers)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('deleting a blog recieves a 204 response', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Me',
    url: 'https://testingblogs.com/',
    likes: 70,
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set(headers)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  await api
    .delete(`/api/blogs/${response.body.id}`)
    .set(headers)
    .expect(204)
})

test('a blogs like count is updated successfully', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 70,
  }
  
  const response = await api
    .put('/api/blogs/5a422a851b54a676234d17f7')
    .set(headers)
    .send(blog)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(70)
})

afterAll(() => {
  mongoose.connection.close()
})