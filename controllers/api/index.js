// boilerplate router
const router = require('express').Router();
const commentRoutes = require('./commentRoutes');

router.use('/comments', commentRoutes);

// add routes (comment, post, user, etc.)
module.exports = router;
