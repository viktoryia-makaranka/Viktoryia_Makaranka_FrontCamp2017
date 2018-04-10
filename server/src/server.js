import express from 'express'
import path from 'path'
import httpStatus from 'http-status'
import bodyParser from 'body-parser'

const server = express()
server.use(express.static(__dirname))

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(8080)