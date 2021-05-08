'use strict';

module.exports = {
  succeed({ ctx, res = null, msg = 'success' }) {
    ctx.body = { code: '00000', data: res, message: msg };
    ctx.status = 200;
  },
  failed({ ctx, res = null, msg = 'fail' }) {
    ctx.body = { code: '10000', data: res, message: msg };
    ctx.status = 200;
  },
  formerUser(user) {
    return Object.assign({}, {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
  },
};
