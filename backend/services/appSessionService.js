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

  causeRefreshedSession: async (sessionId) => {
    const session = await Session.findById(sessionId);
    session.expiration = new Date();
    session.expiration.setHours(session.expiration.getHours() + 1);
    await session.save();
    return session;
  }
};

module.exports = AppSessionService;