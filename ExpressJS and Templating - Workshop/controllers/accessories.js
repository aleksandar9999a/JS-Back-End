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

function attach(req, res, next){
    const { id: cubeId } = req.params;
    cubeModel.findById(cubeId).then(cube => {
        res.render('attachAccessory.hbs', { cube })
    }).catch(next)
}

module.exports = { create, loadForm, attach };