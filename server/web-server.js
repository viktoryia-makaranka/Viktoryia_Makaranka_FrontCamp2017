const express = require('express');
const path = require('path');

const logger = require('./logger');
const blogs = require('./blogs');

const app = express();

app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  logger.log({
    level: 'info',
    message: req.url
  });
  next();
});

app.use('/blogs', blogs);

app.use((req, res) => {
  res.render('template', {title: 'Express', message: `You are at the ${req.url === '/' ? 'root' : req.url} page`});
});

app.listen(3000);