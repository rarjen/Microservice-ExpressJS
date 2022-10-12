require("dotenv").config;
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
module.exports = {
  authUser: async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        return res.status(401).json({
          status: false,
          message: "You're not authorized!",
          data: null,
        });
      }

      const decoded = jwt.verify(token, JWT_KEY);
      if (decoded.role != "user") {
        return res.status(401).json({
          status: false,
          message: "You're not authorized!",
          data: null,
        });
      }

      req.user = decoded;

      next();
    } catch (error) {
      if (error.message == "jwt malformed") {
        return res.status(401).json({
          status: false,
          message: error.message,
          data: null,
        });
      }
      next(error);
    }
  },
  authAdmin: async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        return res.status(401).json({
          status: false,
          message: "You're not authorized!",
          data: null,
        });
      }
      const decoded = jwt.verify(token, JWT_KEY);
      if (decoded.role != "admin") {
        return res.status(401).json({
          status: false,
          message: "You're not authorized!",
          data: null,
        });
      }

      req.user = decoded;

      next();
    } catch (error) {
      if (error.message == "jwt malformed") {
        return res.status(401).json({
          status: false,
          message: error.message,
          data: null,
        });
      }
      next(error);
    }
  },
};
