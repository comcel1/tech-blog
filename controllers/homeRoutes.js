const router = require('express').Router();
const { Post, Comment, User } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage');
});

module.exports = router;
