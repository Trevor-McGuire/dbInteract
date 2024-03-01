const AppSessionService = require('../services/appSessionService');

const sessionMiddleware = async (req, res, next) => {
  const sessionId = req?.cookies?.sessionId;
  if (!sessionId) return next();
  const session = await AppSessionService.getSession(sessionId);

  if (!session || session.expiration < new Date()) {
    res.clearCookie('sessionId');
    return next();
  } else {
    // Update the session's expiration time to 1 hour from now
    session.expiration = new Date(Date.now() + 60 * 60 * 1000);
    await AppSessionService.updateSession(session);

    req.session = session;
    return next();
  }
};

module.exports = sessionMiddleware;