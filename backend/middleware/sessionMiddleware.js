const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Session = require('../models/appSessionModel');

const sessionMiddleware = async (req, res, next) => {
  // Use cookie-parser to parse the cookies
  cookieParser()(req, res, () => {});

  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    console.log(`
    sessionMiddleware Result: No sessionId and cookieHeader cleared \n
    cookieHeader: ${req.headers.cookie}`);
    res.clearCookie("sessionId");
    return next();
  }

  // Validate if the sessionId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    console.log(`sessionMiddleware Result: Invalid sessionId format: ${sessionId}`);
    res.clearCookie("sessionId");
    return next();
  }

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      console.log(`sessionMiddleware Result: No session found using sessionId: ${sessionId}`);
      res.clearCookie("sessionId");
      return next();
    } else {
      console.log(`sessionMiddleware Result: Session found using sessionId: ${sessionId}`);
      req.session = session;
      return next();
    }
  } catch (error) {
    console.error('Error finding session by ID:', error);
    // Handle the error accordingly, e.g., return a 500 Internal Server Error response
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
};

module.exports = sessionMiddleware;
