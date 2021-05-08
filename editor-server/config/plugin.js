'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // config/ ws plugin
  websocket: {
    enable: true,
    package: 'egg-websocket-plugin',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  bcrypt: {
    enable: true,
    package: 'egg-bcrypt',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};
