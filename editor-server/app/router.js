'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const shareDB = require('sharedb');

  app.share = new shareDB();

  router.get('/', controller.home.index);
  router.get('/users', controller.user.getUsers);
  router.post('/register', controller.user.register);

  app.ws.route('/ws', controller.home.ws);
};
