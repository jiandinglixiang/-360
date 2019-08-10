'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: { type: String },
    url: { type: String },
  });
  UserSchema.pre('save', function(next) {
    next();
  });


  return mongoose.model('Test', UserSchema);
};
