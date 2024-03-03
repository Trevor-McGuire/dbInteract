const Session = require('../models/appSessionModel');

const AppSessionService = {
  createSession: async (user) => {
    const session = new Session({
      user: user._id,
      expiration: new Date(),
    });
    await session.save();
    await AppSessionService.returnRefreshedSession(session._id);
    return session;
  },

  getSession: async (sessionId) => {
    const session = await Session.findById(sessionId).populate('user');
    return session;
  },

  deleteSession: async (sessionId) => {
    await Session.findByIdAndDelete(sessionId);
  },
};

module.exports = AppSessionService;