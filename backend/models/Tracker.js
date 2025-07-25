const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({
  brochureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brochure',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['symptom', 'note', 'todo_update', 'milestone_update']
  },
  content: {
    type: String,
    required: true
  },
  metadata: {
    section: String,
    itemId: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high']
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tracker', trackerSchema);
