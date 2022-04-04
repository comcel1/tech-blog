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

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/sign-up', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('sign-up');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    // find the post with the id that is in the address bar
    where: { id: req.params.id },
    attributes: ['id', 'title', 'post_text', 'createdAt'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
        include: { model: User, attributes: ['username'] },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((data) => {
      const post = data.get({ plain: true });
      res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
