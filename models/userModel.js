const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    uppercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: 0,
    hidden: true,
  },
  name: {
    type: String,
  }
});

userSchema.pre('save', async function(next) {
  // Hash the password
  if (this.isModified('password')) {
    this.password = await this.encryptPassword(this.password);
  }

  return next();
});

userSchema.methods = {
  authenticate: async function (plainText) {
    return bcrypt.compare(plainText, this.password);
  },
  encryptPassword: async (password) => bcrypt.hash(password, 8),
};


module.exports = mongoose.model('User', userSchema);
