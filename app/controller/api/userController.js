'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

class UserController extends Controller {

  async create() {
    const { ctx } = this;
    const { tel, password, code } = ctx.request.body;
    ctx.body = await ctx.service.Api.userService.signIn(ctx.request.body);
  }

  async show() {
    // 获取资料
    const { ctx } = this;
    const UserSchema = new ctx.model.Api.User({
      cardName: '15577648264',
      password: '15577648264', // 密码
      name: '15577648264', // 昵称
      tel: '15577648264', // 号码
    });
    console.log(UserSchema);
    ctx.body = await UserSchema.save();
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
