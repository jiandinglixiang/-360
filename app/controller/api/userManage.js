'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

class UserController extends Controller {

  async create() {
    const { ctx } = this;
    ctx.body = path.resolve(__dirname, '../public/asd.html');
  }

  async show() {
    // 获取资料
    const { ctx } = this;
    ctx.body = path.resolve(__dirname, '../public/asd.html');
  }

  async edit(ctx) {
    // 编辑资料
    fs.readFile(path.resolve(__dirname, '../../public/asd.html'), await function(err, data) {
      if (err) {
        return console.error(err);
      }
      ctx.set('Content-Type', 'text/html');
      ctx.res.body = data.toString();
      console.log('异步读取: ');
    });
  }

  async update() {
    // 更新资料
    const { ctx } = this;
    ctx.body = path.resolve(__dirname, '../public/asd.html');
  }
}

module.exports = UserController;
