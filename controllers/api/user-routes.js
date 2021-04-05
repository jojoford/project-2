const router = require('express').Router()
const { User, Workout, Benchmark, Follow } = require('../../models')

// get users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']},
        include: [
            {
                model: Workout,
                attributes: ['id', 'date', 'category', 'time', 'level', 'description']
            },
            {
                model: Benchmark,
                attributes: ['id', 'boulder_grade', 'route_grade']

            }
        ]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// get one use by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Workout,
                attributes: ['id', 'date', 'category', 'time', 'level', 'description']
            },
            {
                model: Benchmark,
                attributes: ['id', 'boulder_grade', 'route_grade']
            },
            {
                model: Follow,
                attributes: ['id', 'user_id']
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id '})
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// post a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
      
          res.json(dbUserData);
        });
    })
})

// login route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that username'})
            return
        }
        
        //verify user
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
      
            res.json({ user: dbUserData, message: 'You are now logged in!' });
          });
    });
})

// logout route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
})


// update a user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        // make sure password is hashed
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// delete a user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
          id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


// export the router
module.exports = router