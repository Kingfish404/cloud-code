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

  async find(params) {
    const rePageNum = Number(params.pageNum) || 1;
    const rePageSize = Number(params.pageSize) || 10;
    const users = await this.ctx.model.User.find({})
      .skip((rePageNum - 1) * rePageSize)
      .limit(rePageSize);
    return Object.assign({}, {
      pageNum: rePageNum,
      pageSize: rePageSize,
      list: users,
    });
  }
}

module.exports = UserService;
