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
    await service.user.register(ctx.request.body);
  }

  async login() {
    const { service, ctx } = this;
    ctx.validate({
      email: 'email',
      password: 'string',
    });
    await service.user.login(ctx.request.body);
  }

  async getUsers() {
    const { service, ctx } = this;
    await service.user.find(ctx.request.query, ctx.header.authorization);
  }
}

module.exports = UserController;
