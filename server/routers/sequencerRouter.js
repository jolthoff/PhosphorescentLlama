var sequencerController = require('../controllers/sequencerController.js');

module.exports = function (app) {
  app.route('/')
    .get(/*  */)
    .post(/* */);

  app.route('/level')
    .get(sequencerController.getData())
    .post(sequencerController.saveData());
};
