require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const mongoUrl = process.env.MONGODB_URI

console.log(mongoUrl);
mongoose.connect(mongoUrl)
  .then(() => console.log(`Connected to Mongo`))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app