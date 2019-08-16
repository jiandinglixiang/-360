'use strict';
const Controller = require('egg').Controller;
const crypto = require('crypto');


const bankList = [
  { id: 1, name: '中国工商银行' },
  { id: 2, name: '中国农业银行' },
  { id: 3, name: '中国银行' },
  { id: 4, name: '中国建设银行' },
  { id: 5, name: '交通银行' },
  { id: 6, name: '中信银行' },
  { id: 7, name: '中国光大银行' },
  { id: 8, name: '华夏银行' },
  { id: 9, name: '中国民生银行' },
  { id: 10, name: '广发银行' },
  { id: 11, name: '平安银行（原深圳发展银行）' },
  { id: 12, name: '招商银行' },
  { id: 13, name: '上海浦东发展银行' },
  { id: 21, name: '邮政储蓄' },
  { id: 22, name: '兴业银行' },
  { id: 102, name: '广州银行' },
];

class infoController extends Controller {

  async backBankList(ctx) {
    // const { app } = this;
    // const userService = Object.assign(this.service.api.userService);
    ctx.response.body = {
      code: 0,
      data: bankList,
      msg: 'ok',
    };
  }

  async backUserBankInfo(ctx) {
    const userService = Object.assign(this.service.api.userService);
    const user = await userService.findOneUser(ctx.request.query.tel);
    if (!user) {
      ctx.response.body = {
        code: 10003,
        data: null,
        msg: '未找到资料',
      };
      return;
    }
    const data = {
      account: user.accountName || '',
      address: user.bankOfDeposit || '',
      balance: user.balance,
      image: '',
      no: user.cardNumber || '',
      status: '0',
      type: user.cardName || '',
    };
    ctx.response.body = {
      code: 0,
      data,
      msg: 'ok',
    };
  }

  async addUserBankInfo(ctx) {
    ctx.validate({
      account: { type: 'string' },
      address: { type: 'string' },
      no: { type: 'string' },
      type: { type: 'string' },
    });
    const userService = Object.assign(this.service.api.userService);
    const body = ctx.request.body;
    const user = await userService.findOneUser(body.tel);
    if (!user) {
      ctx.response.body = {
        code: 10003,
        data: null,
        msg: 'token错误',
      };
    } else if (user.userToken !== body.token) {
      ctx.response.body = {
        code: 10003,
        data: null,
        msg: 'token错误',
      };
    }
    user.accountName = body.account; // 开户姓名
    user.cardName = body.type; // 银行卡姓名
    user.cardNumber = body.no; // 银行卡号
    user.bankOfDeposit = body.address; // 开户行名称
    user.save();
    ctx.response.body = {
      code: 0,
      data: null,
      msg: 'ok',
    };
  }
}

module.exports = infoController;
