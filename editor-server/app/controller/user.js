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
    if (!res) {
      ctx.helper.failed({ ctx, res: '邮箱已被注册' });
    } else {
      ctx.helper.succeed({ ctx, res });
    }
  }

  async getUsers() {
    // TODO 分页查询的query
    const { service, ctx } = this;
    // TODO 编写userVO
    const users = await service.user.find();
    ctx.helper.succeed({ ctx, res: users });
  }
}

module.exports = UserController;
