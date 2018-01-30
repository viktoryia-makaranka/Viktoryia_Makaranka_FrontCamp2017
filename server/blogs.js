const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => res.send('get blogs'));

router.get('/:id', (req, res) => res.send(`get blog id: ${req.params.id}`));

router.post('/', (req, res) => res.send(req.body));

router.put('/:id', (req, res) => res.send(req.body));

router.delete('/:id', (req, res) => res.send(`delete blog id: ${req.params.id}`));

module.exports = router;