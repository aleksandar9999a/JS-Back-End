const index = module.require('../controllers/cube')
module.exports = (app) => {
    app.get('/', index)
};