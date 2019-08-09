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
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1565244857806_6788';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
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
