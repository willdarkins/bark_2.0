const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const parkRoutes = require('./park-routes');

const commentRoutes = require('./comment-routes');

router.use('/comments', commentRoutes)

router.use('/users', userRoutes);
router.use('/parks', parkRoutes);

module.exports = router;