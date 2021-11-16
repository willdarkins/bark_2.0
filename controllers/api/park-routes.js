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
        }
        // Will want to include comments and votes here
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
    // expects {name: 'name', latitude: 100, longitude: 100}
    Park.create({
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })
        .then(dbParkData => res.json(dbParkData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



router.put('/upvote', (req, res) => {
    //make sure a session exists
    if(req.session) {
        // pass session id along with all destructured properties on req.body
        Post.upvote()
    }
})



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