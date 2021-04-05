const router = require('express').Router()
const sequelize = require('../config/connection');
const { User, Workout, Benchmark, Kudos, Follow } = require('../models');

// homepage route
router.get('/', (req, res) => {
    console.log(req.session.loggedIn)
    if (!req.session.loggedIn) {
        res.render('login')
    } else {
    Workout.findAll({
        attributes: [
            'id',
            'date',
            'category',
            'time',
            'level',
            'description',
            [sequelize.literal('(SELECT COUNT(*) FROM kudos WHERE workout.id = kudos.workout_id)'), 'kudos_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbWorkoutData => {
        const workouts = dbWorkoutData.map(workout => workout.get({ plain: true }))
        res.render('homepage', { 
            workouts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
    }
})

// render signup screen
router.get('/signup', (req, res) => {
    res.render('signup');
});

// renter login screen
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

// view single workout
router.get('/workout/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.render('login')
    } else {
    Workout.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'date',
            'category',
            'time',
            'level',
            'description',
            [sequelize.literal('(SELECT COUNT(*) FROM kudos WHERE workout.id = kudos.workout_id)'), 'kudos_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbWorkoutData => {
        if (!dbWorkoutData) {
            res.status(404).json({ message: 'No workout found with this id' })
            return
        }

        const workout = dbWorkoutData.get({ plain: true });

        res.render('single-workout', { 
            workout,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
    }
})

// route to search a user
router.get('/search', (req, res) => {
    res.render('search', {
        loggedIn: req.session.loggedIn
    })
})




module.exports = router