require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)
  .then(() => console.log(`Connected to Mongo`))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

