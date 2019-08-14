'use strict';
const crypto = require('crypto');

module.exports = {
  validate(ctx, ...params) {
    return new Promise(function(resolve, reject) {
      try {
        ctx.validate(...params);
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  },
  createToken(key, iv, tel) {
    const data = {
      tel,
      time: Math.floor(Date.now() / 1000),
    };
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let sing = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    sing += cipher.final('hex');
    return sing;
  },
  decodeToken(sign, key, iv) {
    let src = '';
    const cipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    src += cipher.update(sign, 'hex', 'utf8');
    src += cipher.final('utf8');
    try {
      src = JSON.parse(src);
    } catch (e) {
      return null;
    }
    return src;
  },
};
