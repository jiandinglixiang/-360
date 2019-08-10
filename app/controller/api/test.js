'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const Code = require('mongodb').Code;
let emit;

class TestController extends Controller {


  async test(ctx) {
    // 编辑资料
    // ctx.validate({ name: { type: 'int' } }, { name: 321 });
    // console.log(ctx.cookies.get('name'));
    // ctx.cookies.set('name', 7563201);
    // ctx.body = ctx.ip;
    const val = this.ctx.model.Api.Test;
    // val.aggregate({ $project: { url: 0, name: 1 } }, {});
    // const o = {};
    //
    // function f(emit) {
    //   console.log(emit);
    // }
    //
    // o.map = function() {
    //   emit(this._id, this.name);
    // };
    // o.reduce = function() {
    //   return { a: 1 };
    // };
    ctx.body = await val.mapReduce({
      map: function() {
        emit({
          asd: 123,
        }, {
          asd: `---${this.name}+${this.url || 8888}---`,
        });
      },
      reduce: function(key, val) {
        return { key: '123123' };
      },
    });
  }
}

module.exports = TestController;
