const cubeController = module.require('../controllers/cube')
module.exports = (app) => {
    app.get('/', cubeController)
};