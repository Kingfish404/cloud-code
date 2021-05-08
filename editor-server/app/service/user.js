'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async register(params) {
    const { ctx } = this;
    const exist = await ctx.model.User.findOne({ email: params.email });
    if (!exist) {
      params.password = await ctx.genHash(params.password);
      return ctx.model.User.create(params);
    }
    return null;
  }

  async find() {
    const users = await this.ctx.model.User.find({});
    return Object.assign({}, {
      pageNum: 1,
      pageSize: 10,
      list: users,
    });
  }
}

module.exports = UserService;
