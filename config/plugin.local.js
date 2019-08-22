'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  webpack: {
    enable: true,
    package: 'egg-webpack',
  },
  webpackreact: {
    enable: true,
    package: 'egg-webpack-react',
  },
};
