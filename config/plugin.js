'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // view: {
  //   enable: false,
  //   package: 'egg-view',
  // },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  reactssr: {
    enable: true,
    package: 'egg-view-react-ssr',
  },
};
