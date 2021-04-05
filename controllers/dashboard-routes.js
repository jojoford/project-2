const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Workout, Benchmark, Kudos, Follow } = require('../models')

// main dashboard view
router.get('/', (req, res) => {
    Workout.findAll({
        where: {
            user_id: req.session.user_id
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
                attributes: ['username'],
                include: {
                model: Benchmark,
                    attributes: ['boulder_grade', 'route_grade', 'id']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbWorkoutData => {
        const workouts = dbWorkoutData.map(workout => workout.get({ plain: true }));
        if (workouts[0]) {
            const benchmarks = workouts[0].user.benchmark
            res.render('dashboard', { workouts, benchmarks, loggedIn: true });
        } else {
            res.render('dashboard', { loggedIn: true });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/add', (req, res) => {
    res.render('add-workout', { loggedIn: true });
});

router.get('/addbenchmark', (req, res) => {
    res.render('add-benchmark', { loggedIn: true })
})

router.get('/updatebenchmark/:id', (req, res) => {
    Benchmark.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'boulder_grade', 'route_grade'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbBenchmarkData => {
        if (dbBenchmarkData) {
          const benchmark = dbBenchmarkData.get({ plain: true });
          
          res.render('update-benchmark', {
            benchmark,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
})

router.get('/updateworkout/:id', (req, res) => {
    Workout.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'date', 'category', 'time', 'level', 'description'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbWorkoutData => {
        if (dbWorkoutData) {
          const workout = dbWorkoutData.get({ plain: true });
          
          res.render('update-workout', {
            workout,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
})

module.exports = router