const router = require('express').Router();



router.get('/', (req, res) => {
    res.render('home', {
    });
  });

  module.exports = router;

const sequelize = require('../config/connection');
const { Comment, User, Park } = require('../models');

//GET route to populate page with all parks in the database
router.get('/', (req, res) => {
    console.log(req.session);
    Park.findAll({
        attributes: [
            'id',
            'name',
            //'likes',
             [sequelize.literal('(SELECT COUNT(*) FROM park LEFT JOIN vote ON park.id = vote.park_id)'), 'like_count']
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
                  model: User, as: "voted_parks",
                  attributes: ['username']
              }
         ]
    })
        .then(dbParkData => {
            /*Loops over and maps each Sequelize object into a serialized version of itself
            saving the results in a new parks array*/
            const parks = dbParkData.map(park => park.get({ plain: true }));
            // res.json(parks);
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

//GET and display single park information via searched id
router.get('/park/:id', (req, res) => {
    Park.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            //'likes'
            [sequelize.literal('(SELECT COUNT(*) FROM park LEFT JOIN vote ON park.id = vote.park_id)'), 'like_count']
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
                model: User, as: "voted_parks",
                attributes: ['username']
            }
        ]
    })
        .then(dbParkData => {
            if (!dbParkData) {
                res.status(404).json({ message: 'No park found with this id' });
                return;
            }

            // serialize the data
            const park = dbParkData.get({ plain: true });

            // pass data to template
            res.render('dashboard', {
                park,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

