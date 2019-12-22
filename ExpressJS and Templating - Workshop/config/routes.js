const cubeController = module.require('../controllers/cube')
const aboutController = module.require('../controllers/about')
const createController = module.require('../controllers/create')
const notFound = module.require('../controllers/notFound')

module.exports = (app) => {
    app.get('/', cubeController.index)
    app.get('/details/:id', cubeController.details)
    app.get('/create', createController)
    app.get('/about', aboutController)
    app.get('/*', notFound)
};