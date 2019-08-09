'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchemaChid = new Schema({
    name: { type: String },
    url: { type: String },
  });
  const UserSchema = new Schema({
    name: { type: String },
    url: { type: String },
    children: [
      UserSchemaChid,
    ],
  });
  UserSchemaChid.pre('save', function(next) {
    console.log(...arguments);
    next();
  });
  UserSchema.pre('save', function(next) {
    console.log(...arguments);
    next();
  });
  return mongoose.model('Test', UserSchema);
};
