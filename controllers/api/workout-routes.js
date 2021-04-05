const router = require('express').Router()
const { Workout, User, Kudos, Benchmark } = require('../../models')
const sequelize = require('../../config/connection');

// get all sessions
router.get('/', (req, res) => {
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
        order: [['date', 'DESC']], 
        include: [
          {
              model: User,
              attributes: ['username'],
              include: {
                  model: Benchmark,
                  attributes: ['route_grade', 'boulder_grade']
              }
          },
          {
                model: User,
                attributes: ['username']
          }
        ]
    })
    .then(dbWorkoutData => res.json(dbWorkoutData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});


// get one session by id
router.get('/:id', (req, res) => {
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
            res.status(404).json({ message: 'No workout found with this id' });
            return;
        }
        res.json(dbWorkoutData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


// post a new session
router.post('/', (req, res) => {
    Workout.create({
        date: req.body.date,
        category: req.body.category,
        time: req.body.time,
        level: req.body.level,
        description: req.body.description,
        user_id: req.session.user_id
    })
    .then(dbWorkoutData => res.json(dbWorkoutData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


// route for updating posts with a kudos
router.put('/kudos', (req, res) => {
    Kudos.create({
        user_id: req.body.user_id,
        workout_id: req.body.workout_id
      }).then(() => {
        // then find the post we just voted on
        return Workout.findOne({
          where: {
            id: req.body.workout_id
          },
          attributes: [
            'id',
            'date',
            'category',
            'time',
            'level',
            'description',
            [
                sequelize.literal('(SELECT COUNT(*) FROM kudos WHERE workout.id = kudos.workout_id)'),
                'kudos_count'
            ]
          ]
        })
        .then(dbWorkoutData => res.json(dbWorkoutData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    })
})


// update a session by id
router.put('/:id', (req, res) => {
    Workout.update(
        {
            category: req.body.category,
            time: req.body.time,
            level: req.body.level,
            description: req.body.description
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbWorkoutData => {
        if (!dbWorkoutData) {
            res.status(404).json({ message: 'No workout found with this id' });
            return;
        }
    res.json(dbWorkoutData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


// delete a session
router.delete('/:id', (req, res) => {
    Workout.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbWorkoutData => {
        if (!dbWorkoutData) {
          res.status(404).json({ message: 'No workout found with this id' });
          return;
        }
    res.json(dbWorkoutData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


module.exports = router