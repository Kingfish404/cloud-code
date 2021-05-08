'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async register(params) {
    const { ctx } = this;
    const exist = await ctx.model.User.findOne({ email: params.email });
    ctx.helper.failed({ ctx, res: 'Email has been registered' });
    if (!exist) {
      params.password = await ctx.genHash(params.password);
      const user = ctx.helper.formerUser(await ctx.model.User.create(params));
      ctx.helper.succeed({ ctx, res: user });
    }
  }

  async login(params) {
    const { app, ctx } = this;
    const user = await ctx.model.User.findOne({ email: params.email });
    ctx.helper.failed({ ctx, res: 'Mail or password is incorrect' });
    if (user) {
      if (await ctx.compare(params.password, user.password)) {
        const token = app.jwt.sign({
          id: user.id,
          role: user.role,
        }, app.config.jwt.secret, { expiresIn: '1h' });
        ctx.helper.formerUser(user);
        ctx.helper.succeed({ ctx, res: user, token });
      }
    }
  }

  async find(params, token) {
    const { app, ctx } = this;
    const decoded = app.jwt.verify(token.split(' ')[1], app.config.jwt.secret);
    ctx.helper.failed({ ctx, res: 'Permission denied' });
    if (decoded.role === 'admin') {
      const rePageNum = Number(params.pageNum) || 1;
      const rePageSize = Number(params.pageSize) || 10;
      const users = await ctx.model.User.find({})
        .skip((rePageNum - 1) * rePageSize)
        .limit(rePageSize);
      const userList = Object.assign({}, {
        pageNum: rePageNum,
        pageSize: rePageSize,
        list: users.map(user => {
          return ctx.helper.formerUser(user);
        }),
      });
      ctx.helper.succeed({ ctx, res: userList });
    }
  }
}

module.exports = UserService;
