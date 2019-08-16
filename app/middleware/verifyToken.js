'use strict';

module.exports = () => {
  return async function verifyToken(ctx, next) {
    let params = '';
    if (ctx.query.token) {
      params = ctx.query;
    } else if (ctx.request.body.token) {
      params = ctx.request.body;
    }
    ctx.validate({
      token: { type: 'string' },
      tel: {
        type: 'string',
        format: /^1((3[\d])|(4[5,6,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[1-3,5-8])|(9[1,8,9]))\d{8}$/,
      },
    }, params);
    const userService = Object.assign(ctx.service.api.userService);
    const Token = await await userService.getCacheUserToken(params.tel);
    if (!Token) {
      const user = await userService.findOneUser(params.tel);
      if (!user) {
        ctx.response.body = {
          code: 10003,
          data: null,
          msg: 'token错误',
        };
        return;
      }
      if (user.userToken !== params.token) {
        ctx.response.body = {
          code: 10003,
          data: null,
          msg: '密码过期请重新登陆',
        };
        return;
      }
    } else if (Token !== params.token) {
      ctx.response.body = {
        code: 10003,
        data: null,
        msg: '密码过期请重新登陆',
      };
      return;
    }

    await userService.setCacheUserToken(params.tel, Token);
    await next();
  };
};
