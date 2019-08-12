'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const neSchema = new Schema({
    userToken: { type: String },
    tel: { type: String }, // 号码
    password: { type: String }, // 密码
    name: { type: String }, // 昵称
    headPortraitUrl: { type: String }, // 头像url
    balance: { type: Number, default: 0 }, // 金额
    location: { type: String }, // 位置
    cardName: { type: String }, // 银行卡姓名
    cardNumber: { type: String }, // 银行卡号
    bankOfDeposit: { type: String }, // 开户行名称
  }, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  });
  neSchema.index({ name: 1 });
  neSchema.index({ tel: 1 }, { unique: true });
  neSchema.pre('save', function(next) {
    next();
  });
  return mongoose.model('Api', neSchema);
};
