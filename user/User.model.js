const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const { jwtSecret } = require('../utilities/auth.util');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  specialAccess: {
    type: String,
    required: false,
    default: "none",
  },
  date: {
    type: Date,
    default: Date.now
  },
});

UserSchema.methods.generateJwt = function() {
  let expiry = new Date();
  const daysTilExpire = 7;
  expiry.setDate(expiry.getDate() + daysTilExpire);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000),
    admin: this.admin,
    specialAccess: this.specialAccess
  }, jwtSecret);
};

mongoose.model('user', UserSchema);