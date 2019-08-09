'use strict';

const Subscription = require('egg').Subscription;

class UpdateAgainstData extends Subscription {
  static get schedule() {
    return {
      interval: '1m', // 1 分钟间隔
      type: 'worker', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // const { redis } = this.app;
    // const res = await this.ctx.curl('http://tgapi.k888.bet/H5/Lottery/getJcList?lottery_id=901&play_type=2', {
    //   dataType: 'json',
    // });
    // console.log(redis, res);
    // console.log(1);
  }
}

module.exports = UpdateAgainstData;
