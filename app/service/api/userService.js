'use strict';
const { CODE_10000 } = require('../../util/current');
const Service = require('egg').Service;
const md5 = require('crypto');

class userService extends Service {
  async create({ tel, password, userToken, code }) {
    // 注册
    const { ctx } = this;
    const UserMode = ctx.model.Api.UserMode;
    const pass = md5.createHash('md5')
      .update(password)
      .digest('hex');
    return await UserMode.create({
      userToken,
      password: pass, // 密码
      name: tel, // 昵称
      tel, // 号码
    });
  }

  async findOneUser(tel) {
    // 查找用户
    return this.ctx.model.Api.UserMode.findOne({ tel });
  }

  async updateOneProfile(id, obj) {
    // 覆盖更新资料
    // return this.ctx.model.Api.UserMode.findByIdAndUpdate(id, obj);
  }
}

module.exports = userService;
