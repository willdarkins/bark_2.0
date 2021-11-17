const router = require('express').Router();



router.get('/', (req, res) => {
    res.render('home', {
    });
  });

  module.exports = router;

const sequelize = require('../config/connection');
const { Comment, User, Park } = require('../models');

//POST route to populate page with all posts in the database
router.get('/', (req, res) => {
    Park.findAll({
        attributes: [
            'id',
            'name',
            'likes'
            [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE park.id = vote.post_id)'), 'like_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id','comment_text', 'user_id', 'park_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            /*Loops over and maps each Sequelize object into a serialized version of itself
            saving the results in a new posts array*/
            const parks = dbPostData.map(park => park.get({ plain: true }));
            res.render('homepage', {
                parks,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET route to display login information
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// //GET route to display signup information from clicked link
// router.get('/signup', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/');
//         return;
//     }

//     res.render('signup');
// });

//GET and display single post information via searched id
router.get('/park/:id', (req, res) => {
    Park.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'likes'
            [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE park.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'park_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            // serialize the data
            const post = dbPostData.get({ plain: true });

            // pass data to template
            res.render('dashboard', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

