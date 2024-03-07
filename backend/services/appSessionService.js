const Session = require('../models/appSessionModel');

const AppSessionService = {
  createSession: async (user) => {
    const session = new Session({
      user: user._id,
    });
    await session.save();
    return session._id;
  },

  readSessionIdFromCookieHeader: async (cookieHeader) => {
    try {
      const sessionId = cookieHeader.split("=")[1];
      if (!sessionId) {
        return "No session found";
      }
      const objectIdSessionId = Types.ObjectId(sessionId);
      
      const session = await Session.findById(objectIdSessionId);
      return session;
    } catch (error) {
      console.error('Error reading session:', error);
      return null; // or handle the error in an appropriate way
    }
  },

  deleteSession: async (sessionId) => {
    await Session.findByIdAndDelete(sessionId);
  },

  addEbaySession: async (sessionId, ebaySessionId) => {
    await Session.findByIdAndUpdate(sessionId, { ebay_session: ebaySessionId });
  },
};

module.exports = AppSessionService;