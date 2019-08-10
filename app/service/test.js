'use strict';
const Service = require('egg').Service;

class Test extends Service {
  async update() {
    const user = this.ctx.model.Test;
    console.log(this.app.mongoose.version);
    return await user.updateMany({ url: '88888' }, {
      $set: {
        'children.1.url': 'lihua.com123123123123',
      },
    });
    // console.log(Object.keys(user.findOne({ url: '88888' })));
    // console.log(user.findOne({ url: '88888' }))
    // return user.findOne({ url: '88888' })
    //   .children
    //   .push(({ name: '123123123', url: '12354234', }).exec()
    // user.updateMany({}, { $set: { 'children.$[].name': '987987' } }, { upsert: true })
    //   .exec();
  }
}

module.exports = Test;
