const cubeModel = require('../models/cube')

function index(req, res, next) {
    // const { from, to, search } = req.query;
    // const findFn = item => {
    //     let result = true;
    //     if (search) {
    //         result = item.name.toLowerCase().includes(search);
    //     }
    //     if (result && from) {
    //         result = Number(item.difficultyLevel) >= Number(from);
    //     }
    //     if (result && to) {
    //         result = Number(item.difficultyLevel) <= Number(to);
    //     }
    //     return result;
    // }

    cubeModel.find().then(cubes => {
        res.render('index.hbs', {
            cubes,
            // search, from, to 
        })
    }).catch(next)
}

function details(req, res, next) {
    const id = req.params.id;
    cubeModel.findById(id).then(cube => {
        res.render('details.hbs', { cube })
    }).catch(next)
}

module.exports = { index, details };