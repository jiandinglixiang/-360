'use strict';
const Service = require('egg').Service;

class userService extends Service {
  create({ tel, password, userToken, code }) {
    // 注册
    const { ctx } = this;
    const UserMode = ctx.model.Api.UserMode;
    return UserMode.create({
      userToken,
      password, // 密码
      name: tel, // 昵称
      tel, // 号码
    });
  }

  findOneUser(tel) {
    // 根据电话号码查找用户
    return this.ctx.model.Api.UserMode.findOne({ tel });
  }

  findOneUpdateUser(tel, userToken) {
    // 根据电话号码查找用户
    return this.ctx.model.Api.UserMode.findOneAndUpdate({ tel, userToken }, { $set: { userToken: '' } });
  }

  getCacheUserToken(tel) {
    return this.app.redis.get(tel);
  }

  delCacheUserToken(tel) {
    return this.app.redis.del(tel);
  }

  setCacheUserToken(tel, token) {
    return this.app.redis.set(tel, token, 'EX', this.app.config.TOKEN_PAST_DUE_TIME);
  }
}

module.exports = userService;
