const router = require('express').Router();
const { Post, Comment, User } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'post_text', 'createdAt'],
    include: { model: User, attributes: ['username'] },
  })
    .then((data) => {
      const posts = data.map((post) => post.get({ plain: true }));
      res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
