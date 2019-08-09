'use strict';

const Subscription = require('egg').Subscription;

class UpdateVerificationString32 extends Subscription {
  static get schedule() {
    return {
      interval: '1m', // 1 分钟间隔
      type: 'worker', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // const { redis } = this.app;
    // console.log(this.app.config.PRIVATE_KEY);
    // redis.set('ASD', 'ASD');
    // console.log(await redis.get('ASD'));
    // console.log(1);
  }
}

module.exports = UpdateVerificationString32;
