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

//POST route - Create a comment 
router.post('/', withAuth, (req,res) => {
// Check the session
if(req.session) {
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        //Use the id from the session
        user_id: req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
}
});

router.delete('/:id', withAuth, (req, res) => {
    if (req.session) {
        Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbCommentData => {
            if(!dbCommentData) {
                res.status(404).json({ message: 'There was no comment found with this id'})
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
})

module.exports = router;