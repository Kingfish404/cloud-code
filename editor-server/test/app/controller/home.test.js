'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  // it('should POST /register', () => {
  //   return app.httpRequest()
  //     .post('/register')
  //     .send({
  //       email: '893739032@qq.com',
  //       username: 'bobo',
  //       password: 'bobo',
  //       role: 'admin',
  //     })
  //     .expect(200);
  // });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/users')
      .expect(200)
      .then(res => {
        console.log(res.body);
      });
  });
});
