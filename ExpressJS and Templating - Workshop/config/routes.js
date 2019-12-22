const cubeController = module.require('../controllers/cube')
const aboutController = module.require('../controllers/about')
const createController = module.require('../controllers/create')

module.exports = (app) => {
    app.get('/', cubeController)
    app.get('/create', createController)
    app.get('/about', aboutController)
};