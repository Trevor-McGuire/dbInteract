const jwt = require('jsonwebtoken');
const { wrapServiceMethods } = require('../utils/errorHandler');

const AuthService = {

  generateToken: async (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  },

  verifyToken: async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  },

};

const context = { stack: [] };
wrapServiceMethods(AuthService, context, 'AuthService');

module.exports = AuthService;