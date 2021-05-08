/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1615443921754_5538';

  config.middleware = [ 'errorHandler' ];

  // add your middleware config here
  config.middleware = [];

  // cluster config
  config.cluster = {
    listen: {
      port: 3210,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://bobo:liyanjia@127.0.0.1/cloudcode', // user是collection(数据库)名称
      options: { useNewUrlParser: true, useUnifiedTopology: true },
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.bcrypt = {
    saltRounds: 10,
  };

  config.jwt = {
    secret: '123456',
  };

  return {
    ...config,
    ...userConfig,
  };
};
