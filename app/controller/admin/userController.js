'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

class userController extends Controller {

  // async create() {
  //   const { ctx } = this;
  // }
  //
  async server() {
    const { ctx } = this;
    await ctx.render('home/index.js', { message: 'egg react server side render' });
  }

  async client() {
    const { ctx } = this;
    // renderClient 前端渲染，Node层只做 layout.html和资源依赖组装，渲染交给前端渲染。与服务端渲染的差别你可以通过查看运行后页面源代码即可明白两者之间的差异
    await ctx.renderClient('home/index.js', { message: 'egg react client render' });
  }

  // async edit(ctx) {
  //   // 编辑资料
  //   // ctx.validate({ id: 'number' });
  //   // ctx.body = JSON.stringify(this.ctx.response);
  // }
  //
  // async update() {
  //   // 更新资料
  //   const { ctx } = this;
  //   // ctx.body = path.resolve(__dirname, '../public/asd.html');
  // }
}

module.exports = userController;
