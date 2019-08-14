/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1565244857806_6788';
  // 用于Tonke AES加密解密
  config.AES_KEY = '7B190099522032FC';
  config.AES_IV = '332CAABD752453AA';
  // add your middleware config here
  config.middleware = [ ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.security = {
    csrf: {
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
  };
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: '0',
    },
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/lottery',
      options: {
        poolSize: 20,
        reconnectTries: 10,
        reconnectInterval: 500,
      },
    },
  };
  config.static = {
    maxAge: 31536000,
  };

  return {
    ...config,
    ...userConfig,
  };
};
