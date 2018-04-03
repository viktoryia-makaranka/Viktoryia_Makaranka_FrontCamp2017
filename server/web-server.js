import express from 'express';
import createWebpackMiddleware from 'webpack-express-middleware';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';

import logger from './logger';
import blogs from './blogs';

import passportRouter from './passport/passport-routes';

import cors from 'cors'

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('node-env', 'development');

mongoose.connect('mongodb://localhost/frontcamp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// app.use(session({
//   secret: 'veryverysecret',
//   resave: false,
//   saveUninitialized: true,
// }));

app.use((req, res, next) => {
  logger.log({
    level: 'info',
    message: req.url,
  });
  next();
});
app.options('*', cors());
app.use(cors({
  origin: '*'
}));

app.use('/blogs', blogs);

app.use((req, res) => {
  res.render('template', { title: 'Express', message: `You are at the ${ req.url === '/' ? 'root' : req.url } page` });
});

app.listen(3001);
console.log('listen 3001')