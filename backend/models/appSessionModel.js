// appSession model 

const mongoose = require('mongoose');

const AppSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true  // This will add createdAt and updatedAt fields
});

const Session = mongoose.model('Session', AppSessionSchema);

module.exports = Session;