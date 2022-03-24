const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

// get everything, exclude password
// localhost:3001/api/users/
router.get('/', (req, res) => {
  User.findAll({ attributes: { exclude: ['password'] } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
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
