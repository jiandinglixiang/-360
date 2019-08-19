'use strict';
const Controller = require('egg').Controller;
const crypto = require('crypto');
const { createToken } = require('../../util/tool');

function createHash(key) {
  return crypto.createHash('md5')
    .update(`a${key}z+0*.`)
    .digest('hex');
}

class userController extends Controller {

  async create(ctx) {
    const { app } = this;
    const userService = Object.assign(this.service.api.userService);
    ctx.validate({
      tel: {
        type: 'string',
        format: /^1((3[\d])|(4[5,6,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[1-3,5-8])|(9[1,8,9]))\d{8}$/,
      },
      passwd: { type: 'password', max: 32 },
      sms_validation: { type: 'string', format: /^[0-9A-Za-z]{4,10}$/ },
    });
    const userToken = createToken(app.config.AES_KEY, app.config.AES_IV, ctx.request.body.tel);
    const body = {
      tel: ctx.request.body.tel,
      password: createHash(ctx.request.body.passwd),
      code: ctx.request.body.sms_validation,
      userToken,
    };
    await userService.create(body)
      .then(doc => {
        ctx.response.body = {
          code: 0,
          data: {
            user_token: doc.userToken,
            tel: doc.tel,
          },
          msg: 'ok',
        };
      })
      .catch(function(err) {
        const val = { code: 1, data: null, msg: '注册失败' };
        if (err.code === 11000) {
          val.msg = '手机号已注册';
        }
        ctx.state = 201;
        ctx.response.body = val;
      });
  }

  async login(ctx) {
    // 获取资料
    const { app } = this;
    const userService = Object.assign(this.service.api.userService);
    // 登陆
    ctx.validate({
      tel: {
        type: 'string',
        format: /^1((3[\d])|(4[5,6,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[1-3,5-8])|(9[1,8,9]))\d{8}$/,
      },
      passwd: { type: 'password', max: 32 },
    });
    const body = {
      tel: ctx.request.body.tel,
      password: ctx.request.body.passwd,
    };
    const user = await userService.findOneUser(body.tel);
    if (!user) {
      ctx.status = 201;
      ctx.response.body = {
        code: 1,
        data: null,
        msg: '用户未注册',
      };
      return;
    }
    if (user.password !== createHash(body.password)) {
      ctx.status = 201;
      ctx.response.body = {
        code: 1,
        data: null,
        msg: '密码错误',
      };
      return;
    }
    const userToken = createToken(app.config.AES_KEY, app.config.AES_IV, body.tel);
    user.userToken = userToken;
    user.save();
    // 更新doc
    ctx.response.body = {
      code: 0,
      data: {
        user_token: userToken,
        tel: body.tel,
      },
      msg: 'ok',
    };
  }

  async findUserDatum(ctx) {
    // 查询个人资料
    const userService = Object.assign(this.service.api.userService);
    const user = await userService.findOneUser(ctx.query.tel);
    ctx.response.body = {
      code: 0,
      data: {
        id: user.id,
        bonus_limit: 500000,
        amount_max: 30000,
        amount_min: 1000,
        run_bonus_limit: 500000,
        avatar: user.avatar_url,
        balance: user.balance,
        points: 0,
        realname: user.name,
        tel: user.tel,
        username: user.name,
      },
      msg: 'ok',
    };
  }

  async loginOut(ctx) {
    const userService = Object.assign(this.service.api.userService);
    const user = await userService.findOneUpdateUser(ctx.query.tel, ctx.query.token);
    if (user) {
      await userService.delCacheUserToken(ctx.query.tel);
    }
    ctx.response.body = {
      code: 0,
      data: {},
      msg: 'ok',
    };
  }

  async updatePassword(ctx) {
    // 更新资料
    const userService = Object.assign(this.service.api.userService);
    ctx.validate({
      tel: {
        type: 'string',
        format: /^1((3[\d])|(4[5,6,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[1-3,5-8])|(9[1,8,9]))\d{8}$/,
      },
      passwd: { type: 'password', max: 32 },
      sms_validation: { type: 'string', format: /^[0-9A-Za-z]{4,10}$/ },
    });
    const user = await userService.findOneUser(ctx.request.body.tel);
    if (!user) {
      ctx.status = 201;
      ctx.response.body = {
        code: 1,
        data: null,
        msg: '用户未注册',
      };
      return;
    }
    user.password = createHash(ctx.request.body.passwd);
    const token = createToken(this.app.config.AES_KEY, this.app.config.AES_IV, ctx.request.body.tel);
    user.userToken = token;
    user.save();
    ctx.response.body = {
      code: 0,
      data: {},
      msg: 'ok',
    };
  }
}
module.exports = userController;
