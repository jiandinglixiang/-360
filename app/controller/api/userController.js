'use strict';
const { CODE_10000 } = require('../../util/current');
const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');


class userController extends Controller {

  async create(ctx) {
    const { app } = this;
    ctx.validate({
      tel: {
        type: 'string',
        format: /^1((3[\d])|(4[5,6,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[1-3,5-8])|(9[1,8,9]))\d{8}$/,
      },
      passwd: { type: 'password', max: 32 },
      sms_validation: { type: 'string', format: /^[0-9A-Za-z]{4,10}$/ },
    });
    const { createToken } = require('../../util/tool');
    const userToken = createToken(app.config.AES_KEY, app.config.AES_IV, ctx.request.body.tel);
    const body = {
      tel: ctx.request.body.tel,
      password: ctx.request.body.passwd,
      code: ctx.request.body.sms_validation,
      userToken,
    };
    await this.service.api.userService.create(body)
      .then(doc => {
        ctx.body = {
          code: 0,
          data: { user_token: doc.userToken },
          msg: 'ok',
        };
      })
      .catch(function(err) {
        const val = { code: 1, data: null, msg: '注册失败' };
        if (err.code === 11000) {
          val.msg = '手机号已注册';
        }
        ctx.state = 201;
        ctx.body = val;
      });
  }

  async login(ctx) {
    // console.log('-----------', Object.keys(this));
    // 获取资料
    const { service, app } = this;
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
    const user = await service.api.userService.findOneUser(body.tel);
    console.log('----', '\n', user, '\n', '-----');
    if (!user) {
      ctx.status = 201;
      ctx.body = {
        code: 1,
        data: null,
        msg: '用户未注册',
      };
      return;
    }
    const pass = crypto.createHash('md5')
      .update(body.password)
      .digest('hex');
    if (user.password !== pass) {
      ctx.status = 201;
      ctx.body = {
        code: 1,
        data: null,
        msg: '密码错误',
      };
      return;
    }
    const { createToken } = require('../../util/tool');
    const userToken = createToken(app.config.AES_KEY, app.config.AES_IV, body.tel);
    user.userToken = userToken;
    user.save();
    // 更新doc
    ctx.body = {
      code: 0,
      data: { user_token: userToken },
      msg: 'ok',
    };
  }

  async findUserDatum(ctx) {
    // 查询个人资料
  }

  async update() {
    // 更新资料
    // const { ctx } = this;
    // ctx.body = path.resolve(__dirname, '../public/asd.html');
  }
}

module.exports = userController;
