const mongoose = require('mongoose');

const EbaySessionSchema = new mongoose.Schema({
  access_token: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
  refresh_token_expires_at: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true 
});

const EbaySession = mongoose.model('EbaySession', EbaySessionSchema);

module.exports = EbaySession;