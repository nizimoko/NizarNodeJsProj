const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  biz: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = mongoose.model("users", userSchema);

const createUser = (name, email, password, biz) => {
  const newUser = new User({ name, email, password, biz });
  return newUser.save();
};
const findUserById = (userId) => {
  return User.findById(userId);
};
const findUserByEmail = (email) => {
  return User.find({ email: email });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
