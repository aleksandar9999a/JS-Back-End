const { accessoryModel, cubeModel } = require('../models/index');

function loadForm(req, res) {
    res.render('createAccessory.hbs')
}

function create(req, res) {
    const { name = null, description = null, imageUrl = null } = req.body;
    accessoryModel.create({ name, description, imageUrl })
        .then(e => res.redirect('/'))
        .catch(console.error)
}

function attachGet(req, res, next) {
    const { id: cubeId } = req.params;
    cubeModel.findById(cubeId).then(
        cube => Promise.all([cube, accessoryModel.find({ cubes: { $nin: cube.accessories } })])
    ).then(([cube, filterAccessories]) => {
        res.render('attachAccessory.hbs', { cube, accessories: filterAccessories })
    }).catch(next)
}

function attachPost(req, res, next) {
    const { id } = req.params;
    const { accessory: accessoryId } = req.body;

    Promise.all([
        cubeModel.update({ _id: id }, { $push: { accessories: accessoryId } }),
        accessoryModel.update({ _id: accessoryId }, { $push: { cubes: id } })
    ]).then(() => {
        res.redirect('/')
    });
}

module.exports = { create, loadForm, attachGet, attachPost };