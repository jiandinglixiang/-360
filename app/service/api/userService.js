'use strict';
const Service = require('egg').Service;
const md5 = require('crypto')
  .createHash('md5');

class UserManage extends Service {
  async signIn() {
    // 注册
    const { ctx, login } = this;
    const UserMode = ctx.model.Api.UserMode;
    md5.update('password');
    const password = md5.digest('hex');
    UserMode.create({
      password: md5('15577648264'), // 密码
      name: md5('15577648264'), // 昵称
      tel: '15577648264', // 号码
    });
    return '';
  }

  async login() {
    // 登陆
    return '';
  }

  async updateProfile() {
    // 更新资料
    return '';
  }
}

module.exports = UserManage;
