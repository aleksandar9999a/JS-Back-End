const cubeController = module.require('../controllers/cube')
const aboutController = module.require('../controllers/about')
const createController = module.require('../controllers/create')
const accessoryController = module.require('../controllers/accessories')
const notFound = module.require('../controllers/notFound')

module.exports = (app) => {

    app.get('/attach/accessory/:id', accessoryController.attachGet);
    app.get('/create/accessory', accessoryController.loadForm);
    app.post('/create/accessory', accessoryController.create);

    app.get('/create', createController.loadCreateForm);
    app.post('/create', createController.createCube);

    app.get('/details/:id', cubeController.details);
    app.get('/about', aboutController);
    app.get('/', cubeController.index);
    app.get('/*', notFound);
};