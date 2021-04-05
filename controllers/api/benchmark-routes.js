const router = require('express').Router()
const { Benchmark, User } = require('../../models')

// get benchmarks
router.get('/', (req, res) => {
    Benchmark.findAll({
        attributes: ['id', 'boulder_grade', 'route_grade'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbBenchmarkData => res.json(dbBenchmarkData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// get one benchmark by id
router.get('/:id', (req, res) => {
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
        if (!dbBenchmarkData) {
            res.status(404).json({ message: 'No benchmark found with this id' });
            return;
        }
        res.json(dbBenchmarkData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// post a benchmark
router.post('/', (req, res) => {
    Benchmark.create({
        route_grade: req.body.route_grade,
        boulder_grade: req.body.boulder_grade,
        user_id: req.session.user_id
    })
    .then(dbBenchmarkData => res.json(dbBenchmarkData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
})

// update benchmark
router.put('/:id', (req, res) => {
    Benchmark.update(
        {
            route_grade: req.body.route_grade,
            boulder_grade: req.body.boulder_grade
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbBenchmarkData => {
        if (!dbBenchmarkData) {
            res.status(404).json({ message: 'No benchmark found with this id' });
            return;
        }
    res.json(dbBenchmarkData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router