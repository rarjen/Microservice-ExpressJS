const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
module.exports = {
  create: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const exist = await User.findOne({ where: { email } });
      if (exist) {
        return res.status(400).json({
          status: false,
          message: "Email Already Taken",
          data: null,
        });
      }
      const encryptPassword = await bcrypt.hash(password, 10);
      const created = await User.create({
        name,
        email,
        password: encryptPassword,
        role: "user",
      });

      return res.status(201).json({
        status: true,
        message: "User Successfully Created",
        data: {
          name: created.name,
          email: created.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "User Not Found, You haven't created yet",
          data: null,
        });
      }

      const correct = await bcrypt.compare(password, user.password);
      if (!correct) {
        return res.status(400).json({
          status: false,
          message: "Email / Password incorrect",
          data: null,
        });
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(payload, JWT_KEY);

      return res.status(200).json({
        status: true,
        message: "Success Login",
        data: {
          name: user.name,
          email: user.email,
          token: { token },
        },
      });
    } catch (error) {
      next(error);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const user = req.user;
      const { oldPassword, newPassword, confirmPassword } = req.body;
      if (newPassword != confirmPassword) {
        return res.status(400).json({
          status: false,
          message: "Password doesn't match",
          data: null,
        });
      }

      const findOne = await User.findOne({ where: { id: user.id } });
      if (!findOne) {
        return res.status(400).json({
          status: false,
          message: "User Not Found",
          data: null,
        });
      }

      const correct = await bcrypt.compare(oldPassword, findOne.password);
      if (!correct) {
        return res.status(401).json({
          status: false,
          message: "Old Password doesn't match!",
          data: null,
        });
      }

      const encryptPassword = await bcrypt.hash(newPassword, 10);
      const updatedPassword = await User.update(
        {
          password: encryptPassword,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      return res.status(200).json({
        status: true,
        message: `Change Password Success to ${user.name}`,
        data: updatedPassword,
      });
    } catch (error) {
      next(error);
    }
  },
};
