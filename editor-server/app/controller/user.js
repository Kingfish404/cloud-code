'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { service, ctx } = this;
    ctx.validate({
      email: 'email',
      username: 'string',
      password: 'password',
      role: [ 'admin', 'custom' ],
    });
    const res = await service.user.register(ctx.request.body);
    console.log(res);
    const newUser = ctx.helper.formerUser(res);
    console.log(newUser);
    if (!res) {
      ctx.helper.failed({ ctx, res: '邮箱已被注册' });
    } else {
      ctx.helper.succeed({ ctx, res: newUser });
    }
  }

  async getUsers() {
    const { service, ctx } = this;
    const res = await service.user.find(ctx.request.query);
    const users = res.list.map(user => {
      return ctx.helper.formerUser(user);
    });
    ctx.helper.succeed({ ctx, res: users });
  }
}

module.exports = UserController;
