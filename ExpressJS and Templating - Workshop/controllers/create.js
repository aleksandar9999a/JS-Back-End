const cubeModel = require('../models/cube');

function loadCreateForm(req, res) {
    res.render('create.hbs')
}

function createCube(req, res) {
    const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
    console.log(difficultyLevel);
    
    cubeModel.create({ name, description, imageUrl, difficultyLevel }).then(insertedCube => res.redirect('/'));
}

module.exports = { loadCreateForm, createCube };