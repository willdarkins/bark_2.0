const router = require('express').Router();
const { User, Park, Comment, Vote } = require('../../models');

// get all parks
router.get('/', (req, res) => {
    Park.findAll()
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single park by id (will be used by single park page)
router.get('/:id', (req, res) => {
    Park.findOne({
        where: {
            id: req.params.id
        },
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
            if (!dbParkData) {
                res.status(404).json({ message: 'No park found with this id' });
                return;
            }
            res.json(dbParkData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new park
router.post('/', (req, res) => {
    // expects {name: 'name'}
    Park.create({
        name: req.body.name
    })
        .then(dbParkData => res.json(dbParkData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// used to upvote (like) a park
router.put('/upvote', (req, res) => {
    // custom static method created in models/Post.js
    // expects {user_id: , park_id: }
    Park.upvote(req.body, { Vote, Comment, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



// update the name of a park (might not need this but just in case)
router.put('/:id', (req, res) => {
    // expects {name: 'name'}
    Park.update(
        {
            name: req.body.name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbParkData => {
            if (!dbParkData) {
                res.status(404).json({ message: 'No park found with this id' });
                return;
            }
            res.json(dbParkData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete a park
router.delete('/:id', (req, res) => {
    Park.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbParkData => {
            if (!dbParkData) {
                res.status(404).json({ message: 'No park found with this id' });
                return;
            }
            res.json(dbParkData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;