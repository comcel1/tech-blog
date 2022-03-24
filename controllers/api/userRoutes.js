const router = require('express').Router();
const { User, Post } = require('../../models');
const { restore } = require('../../models/User');

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

router.get('/:id', (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['password'] },
    include: {
      model: Post,
      attributes: ['id', 'title', 'post_text', 'createdAt'],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'User with this id not found' });
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

// log in
router.post('/login', (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No user found with this username' });
        return;
      }

      const validPassword = data.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(404).json({ message: 'Password is invalid.' });
        return;
      }

      req.session.save(() => {
        // session variables (this follows you from page to page)
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.loggedIn = true;

        res.json({ user: data, message: 'You are now logged in!' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// log out the user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
