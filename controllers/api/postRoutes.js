const router = require('express').Router();
const { Comment, Post } = require('../../models');

// getAll, getSingle, create, update, delete

router.get('/', (req, res) => {
  Post.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    // user_id: req.session.user_id,
    user_id: req.body.user_id,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
