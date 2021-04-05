const User = require('./User');
const Workout = require('./Workout');
const Benchmark = require('./Benchmark');
const Follow = require('./Follow')
const Kudos = require('./Kudos')

User.hasMany(Workout, {
    foreignKey: 'user_id'
});

Workout.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasOne(Benchmark, {
    foreignKey: 'user_id'
})

Benchmark.belongsTo(User, {
    foreignKey: 'user_id'
})

User.belongsToMany(Workout, {
    through: Kudos,
    as: 'kudos_workouts',
    foreignKey: 'user_id'
})

Workout.belongsToMany(User, {
    through: Kudos,
    as: 'kudos_workouts',
    foreignKey: 'workout_id'
})

Kudos.belongsTo(User, {
    foreignKey: 'user_id'
})

Kudos.belongsTo(Workout, {
    foreignKey: 'workout_id'
})

User.hasMany(Kudos, {
    foreignKey: 'user_id'
})

Workout.hasMany(Kudos, {
    foreignKey: 'workout_id'
})

// follow associations - not complete
User.hasMany(Follow, {
    foreignKey: 'user_id'
})

Follow.belongsTo(User, {
    foreignKey: 'user_id' 
})

module.exports = { User, Workout, Benchmark, Follow, Kudos };