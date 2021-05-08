'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      const { app } = ctx;
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', err, ctx);

      const status = err.status || 500;

      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : err.message;

      // 仅供参考，需按自己的业务逻辑处理。
      ctx.helper.failed({ ctx, res: err.errors, msg: error });
      ctx.status = status;
    }
  };
};
