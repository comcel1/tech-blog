const router = require('express').Router();
const { User, Comment, Post } = require('../../models');

// getAll, getSingle, create, update, delete
// Get ALL posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'post_text', 'createdAt'],
    include: {
      model: Comment,
      attributes: ['id', 'comment_text', 'createdAt'],
      include: {
        model: User,
        attributes: ['username'],
      },
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get ONE post
router.get('/:id', (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'title', 'post_text', 'createdAt'],
    include: {
      model: Comment,
      attributes: ['id', 'comment_text', 'createdAt'],
      include: {
        model: User,
        attributes: ['username'],
      },
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'Post with this id not found' });
        return;
      }
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
    user_id: req.session.user_id,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_text: req.body.post_text,
    },
    { where: { id: req.params.id } }
  )
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'Post with this id not found' });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'Post with this id not found' });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
