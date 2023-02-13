const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  photo: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  isAuthenticated: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    default: 'local',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.logout = () => {
  this.isAuthenticated = false;
  return this.save();
};

userSchema.methods.serialize = () => {
  return {
    _id: this._id,
    photo: this.photo,
    name: this.name,
    bio: this.bio,
    phone: this.phone,
    email: this.email,
    password: this.password,
    createdAt: this.createdAt,
  };
};

userSchema.statics.deserialize = async (userData) => {
  this._id = userData._id;
  this.photo = userData.photo;
  this.name = userData.name;
  this.bio = userData.bio;
  this.phone = userData.phone;
  this.email = userData.email;
  this.password = userData.password;
  this.createdAt = userData.createdAt;
  return this;
};

module.exports = mongoose.model('User', userSchema);
