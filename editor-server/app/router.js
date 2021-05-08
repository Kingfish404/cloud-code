'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  const shareDB = require('sharedb');

  app.share = new shareDB();

  router.get('/', controller.home.index);
  router.get('/user', jwt, controller.user.getUsers);
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);

  app.ws.route('/ws', controller.home.ws);
};
