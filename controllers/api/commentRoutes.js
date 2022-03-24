const router = require('express').Router();
const { Comment } = require('../../models');

// getAll, getSingle, create, update, delete Routes
// localhost:3001/api/comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// localhost:3001/api/comments/id
router.get('/:id', (req, res) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'Comment with this id not found' });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// localhost:3001/api/comments/
router.post('/', (req, res) => {
  Comment.create({
    // user_id: req.session.user_id,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
    comment_text: req.body.comment_text,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// localhost:3001/api/comments/id
router.put('/:id', (req, res) => {
  Comment.update(
    { comment_text: req.body.comment_text },
    {
      where: { id: req.params.id },
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'Comment with this id not found' });
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
  Comment.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'Comment with this id not found' });
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
