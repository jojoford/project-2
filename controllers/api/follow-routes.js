const router = require('express').Router()
const { Benchmark, User, Workout, Follow } = require('../../models')

router.get('/', (req, res) => {
    Follow.findAll({
        attributes: ['id', 'loggedin_user_id', 'followed_user_id']
    })
    .then(dbFollowData => res.json(dbFollowData))
    .catch(err => {
        console.log(err)
        res.status(500).json
    })
})

// post a follower
router.post('/', (req, res) => {
    Follow.create({
        followed_user_id: req.body.user_id,
        where: {
            // this is where req.session.user_id
            logged_in_user: 3
        }
    })
    .then(dbFollowData => res.json(dbFollowData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router