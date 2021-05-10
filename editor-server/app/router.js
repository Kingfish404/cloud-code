'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  const shareDB = require('sharedb');

  app.share = new shareDB();

  router.get('/', controller.home.index);
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.get('/user', jwt, controller.user.getUsers);
  router.get('/user/info', jwt, controller.user.info);

  app.ws.route('/ws', controller.home.ws);
};
