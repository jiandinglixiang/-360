'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

class TestController extends Controller {


  async test(ctx) {
    // 编辑资料
    // ctx.validate({ name: { type: 'int' } }, { name: 321 });
    // console.log(ctx.cookies.get('name'));
    // ctx.cookies.set('name', 7563201);
    // ctx.body = ctx.ip;
    ctx.status = 201;
    return '123';
  }
}

module.exports = TestController;
