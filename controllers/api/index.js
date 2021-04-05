const router = require('express').Router();

const userRoutes = require('./user-routes');
const workoutRoutes = require('./workout-routes')
const benchmarkRoutes = require('./benchmark-routes')
const followRoutes = require('./follow-routes')
const searchRoutes = require('./search-routes')

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes)
router.use('/benchmarks', benchmarkRoutes)
router.use('/follows', followRoutes)
router.use('/searches', searchRoutes)

module.exports = router;