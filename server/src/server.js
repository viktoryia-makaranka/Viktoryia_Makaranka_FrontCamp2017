import express from 'express';

import router from './router';

const server = express();
server.use(express.static(__dirname));

server.use('/', router);

server.listen(8080);