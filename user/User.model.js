const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

mongoose.model('user', UserSchema);