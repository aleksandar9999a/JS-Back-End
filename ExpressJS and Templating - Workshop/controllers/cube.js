const { cubeModel, accessoryModel } = require('../models/index')

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
        console.log(cube);
        const accessories = [];
        cube.accessories.map(x => accessoryModel.findById(x).then(e => accessories.push(e)));
        res.render('details.hbs', { cube, accessories })
    }).catch(next)
}

module.exports = { index, details };