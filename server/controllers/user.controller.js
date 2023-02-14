const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

class UserController {
  constructor() {}
  // getAllUsers = (req, res) => {};
  getUserById = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (id !== decoded.user_id) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    try {
      let user = await User.findById(id);
      res.status(200).json({ data: { user: user } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
  updateUserById = async (req, res) => {
    let message = '';
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (id !== decoded.user_id) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    try {
      const { password, email, ...data } = req.body;
      const photo = req.file || null;

      let user = await User.findById(id);
      if (password) {
        if (
          (password.old && bcrypt.compareSync(password.old, user.password)) ||
          user.userType !== 'local'
        ) {
          const hashedPassword = password.new
            ? bcrypt.hashSync(password.new, 10)
            : user.password;
          user.password = hashedPassword;
        } else {
          message = 'Password is incorrect';
          return res.status(403).send({ message: message });
        }
        if (email) {
          let existed = await User.findOne({ email: email });
          if (existed) {
            message = 'Email already exists';
            return res.status(403).send({ message: message });
          }
          user.email = email;
        }
        if (user.userType !== 'local') {
          user.userType = 'local';
          message = 'Social account has been unlinked';
        }
      } else if (password && email) {
        message = 'Password is required to change email';
        return res.status(403).send({ message: message });
      }
      if (photo) {
        user.photo = `${process.env.SERVER_URL}photo/${photo.filename}`;
      }
      await user.update({ ...data });
      user.save();
      res.status(200).json({ data: { user: user, warning: message || '' } });
    } catch (err) {
      console.error(err);
      message = err.message || 'Something went wrong';
      res.status(500).json({ message: message });
    }
  };
  // removeUserById = (req, res) => {};
}

module.exports = new UserController();
