const express = require('express');
const router = express.Router();
const Blog = require('./blog-model');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => Blog.find().exec((err, blogs) => res.send(blogs)));

router.get('/:id', (req, res) => Blog.findById(req.params.id).exec((err, blog) => res.send(blog)));

router.post('/', (req, res) => {
  let success = false;
  const data = req.body;
  if (data && data.length) {
      Blog.insertMany(data);
      success = true;
  }
  res.send({ success: success, text: `Blogs were ${success ? '' : 'not'} created`});
});

router.put('/:id', (req, res) => {
  let success = false;
  const data = req.body;
  const blogId = req.params.id;
  if (data && data.title) {
    Blog.findByIdAndUpdate(blogId, data, { upsert: true }).exec(() =>  success = true);
  }
  res.send({ success: success, text: `Blog with id: ${blogId} was${success ? '' : 'n\'t'} updated`});
});

router.delete('/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id).exec(() =>  res.send(`blog with id: ${req.params.id} deleted`));
});

module.exports = router;