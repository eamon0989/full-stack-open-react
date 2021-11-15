const app = require('./app') // the actual Express application

require('dotenv').config()
const http = require('http')
const PORT = 3003

const server = http.createServer(app)

server.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`)
})
