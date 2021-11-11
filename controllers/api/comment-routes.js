const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

//GET route - Find all comments 
router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;