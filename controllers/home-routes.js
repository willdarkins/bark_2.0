const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, User, Park } = require('../models');

router.get('/', (req, res) => {
    res.render('home', {
    });
});

//GET route to display login information
router.get('/login', (req, res) => {
    res.render('login');
});

//GET and display single park information via searched id
router.get('/park/:id', (req, res) => {
    Park.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
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

