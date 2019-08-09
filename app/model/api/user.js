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
  UserSchema.pre('save', function(next) {
    next();
  });

  const UserSchema = new Schema({
    loginAccount: { type: String },
    password: { type: String },
    name: { type: String },
    headPortraitUrl: { type: String },
    balance: { type: Number },
    phone: { type: Number },
    location: { type: String },
    signature: { type: String },
    profile: { type: String },
    avatar: { type: String },
    githubId: { type: String },
    githubUsername: { type: String },
    githubAccessToken: { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  });
  return mongoose.model('Test', UserSchema);
};
