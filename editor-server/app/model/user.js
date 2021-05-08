'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    email: {
      type: String,
      index: {
        unique: true,
      }, // 该字段为唯一字段
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
  }, { versionKey: false });
  return mongoose.model('User', UserSchema, 'User');
};
