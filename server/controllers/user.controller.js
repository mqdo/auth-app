const bcrypt = require('bcrypt')

const User = require('../models/user.model');

class UserController {
  constructor() {}
  // getAllUsers = (req, res) => {};
  createUser = async (req, res) => {
    const { email, password } = req.body;

    let existed = await User.findOne({ email: email });

    if (existed) {
      res.status(409).send({ message: 'User already exists' });
    }
    // let user = await User.
  };
  getUserById = (req, res) => {};
  updateUserById = (req, res) => {};
  // removeUserById = (req, res) => {};
}

module.exports = new UserController;