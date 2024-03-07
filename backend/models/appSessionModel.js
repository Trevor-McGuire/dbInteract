const mongoose = require('mongoose');

const AppSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ebay_session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EbaySession',
  },
}, {
  timestamps: true 
});

const Session = mongoose.model('Session', AppSessionSchema);

module.exports = Session;