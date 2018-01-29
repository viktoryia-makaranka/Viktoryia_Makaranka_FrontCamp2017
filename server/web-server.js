const express = require('express');
const path = require('path');
const router = express.Router();

const blogs = require('./blogs');

const app = express();
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/blogs', blogs);

router.get('/', (req, res) => {
  res.render('template');
});

app.listen(3000);