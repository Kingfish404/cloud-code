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
};
