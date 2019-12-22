const cubeModel = require('../models/cube')

function index(req, res) {
    cubeModel.getAll().then(cubes => {
        res.render('index.hbs', { cubes })
    })
}

module.exports = index;