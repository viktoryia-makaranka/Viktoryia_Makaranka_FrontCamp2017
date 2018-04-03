import express from 'express'
import path from 'path'

const server = express();
server.use(express.static(__dirname));
server.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})

server.listen(8080)