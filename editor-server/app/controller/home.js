'use strict';

const Controller = require('egg').Controller;
const WebSocketJSONStream = require('websocket-json-stream');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'cloud editor backend is runing!';
  }

  async ws() {
    const { ctx, app } = this;
    if (!ctx.websocket) {
      throw new Error('this function can only be use in websocket router');
    }
    console.log('ws connected', Date.now());

    const stream = new WebSocketJSONStream(ctx.websocket);
    app.share.listen(stream);
    // eslint-disable-next-line no-unused-vars
    ctx.websocket.on('message', data => {
      // console.log(data);
    });
  }
}

module.exports = HomeController;
