const router = require('express').Router()
const { User, Workout, Follow, Kudos } = require('../../models')
const sequelize = require('../../config/connection');

//route to search user workouts
router.get('/:username', (req, res) => {
    User.findOne({
        where: {
            username: req.params.username
        }
    })
    .then(dbUserData => {
        return Workout.findAll({
            where: {
                user_id: dbUserData.id
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
    })
    .then(dbUserData => {
        let data = []
        const searchedWorkout = dbUserData.forEach(element => { let newElement = element.get({ plain: true })
        data.push(newElement) })

        res.render('search', { 
            data,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router