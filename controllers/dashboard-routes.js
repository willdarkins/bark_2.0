const router = require('express').Router();
const sequelize = require('../config/connection');

const { User, Comment, Vote, Park } = require('../models');

// get all parks for dashboard
router.get('/', (req, res) => {
  console.log(req.session);
  console.log('======================');
  Park.findAll({
    attributes: [
      'id',
      'name',
      [sequelize.literal('(SELECT COUNT(*) FROM park LEFT JOIN vote ON park.id = vote.park_id)'), 'like_count']
  ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'park_id', 'user_id', 'created_at'],
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
      const parks = dbParkData.map(park => park.get({ plain: true }));
      res.render('dashboard', { parks, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//find a dashboard by id
router.get('/edit/:id', (req, res) => {
  Park.findByPk(req.params.id, {
    attributes: [
      'id',
      'name',
      [sequelize.literal('(SELECT COUNT(*) FROM park LEFT JOIN vote ON park.id = vote.park_id)'), 'like_count']
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
        model: User, as: "voted_parks",
        attributes: ['username']
      }
    ]
  })
    .then(dbParktData => {
      if (dbParktData) {
        const park = dbParktData.get({ plain: true });
        
        res.render('edit-park', {
          park,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;

