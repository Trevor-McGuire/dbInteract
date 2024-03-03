const AppSessionService = require('../services/appSessionService');
const { wrapServiceMethods } = require("../utils/errorHandler");

const sessionMiddleware = async (req, res, next) => {
  
  const sessionId = req?.cookies?.sessionId;
  if (!sessionId) return next();
  const session = await AppSessionService.getSession(sessionId);

  if (!session) {
    res.clearCookie('sessionId');
    return next();
  }
};

const context = { stack: [] };
wrapServiceMethods(AppSessionService, context, "AppSessionService");

module.exports = sessionMiddleware;