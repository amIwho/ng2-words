module.exports = function (app) {

    const TextController = require('../controllers/text.controller');

    app.get('/api/timeline/:month', TextController.timeline);
    app.post('/api/texts', TextController.create);
    app.get('/api/text/:date', TextController.read);
};