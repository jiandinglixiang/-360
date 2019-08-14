'use strict';
const { decodeToken } = require('../util/tool');

module.exports = () => {
  return async function verifyToken(ctx, next) {
    console.log('----', '\n', ctx.app, '\n', '-----');

    let params = ctx.request.body;
    if (ctx.req.method === 'GET') {
      params = ctx.query;
    }
    ctx.validate({ token: { type: 'string' } }, params);

    const decode = decodeToken(params.token, ctx.app.config.AES_KEY, ctx.app.config.AES_IV);
    if (!decode || decode.time + 1440 < Date.now() / 1000) {
      // 超时
      ctx.body = {
        code: 10003,
        data: null,
        msg: '密码过期请重新登陆',
      };
      return;
    }
    let redisUserToken = ctx.app.redis.get(decode.tel);

    if (!redisUserToken) {
      const doc = await ctx.service.api.userService.findOneUser(decode.tel);
      if (!doc) {
        ctx.body = {
          code: 10003,
          data: null,
          msg: 'token错误',
        };
        return;
      }
      redisUserToken = { writeTime: Math.floor(Date.now() / 1000), userToken: doc.userToken };
    }

    if (redisUserToken.userToken === params.token) {
      redisUserToken.updateTime = Math.floor(Date.now() / 1000);
      ctx.app.redis.set(decode.tel, redisUserToken);
    } else {
      ctx.body = {
        code: 10003,
        data: null,
        msg: '密码过期请重新登陆',
      };
      return;
    }
    next();
    // 后续中间件执行完成后将响应体转换成 gzip
  };
};
