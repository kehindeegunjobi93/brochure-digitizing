const mongoose = require('mongoose');

const brochureSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['myomectomy']
  },
  title: {
    type: String,
    required: true
  },
  sections: {
    activityRestrictions: {
      title: String,
      content: [String],
      todos: [{
        text: String,
        completed: { type: Boolean, default: false }
      }]
    },
    painManagement: {
      title: String,
      content: [String],
      todos: [{
        text: String,
        completed: { type: Boolean, default: false }
      }]
    },
    warningSigns: {
      title: String,
      content: [String],
      symptoms: [{
        text: String,
        flagged: { type: Boolean, default: false }
      }]
    },
    followUpSchedule: {
      title: String,
      content: [String],
      appointments: [{
        text: String,
        completed: { type: Boolean, default: false }
      }]
    },
    healingTimeline: {
      title: String,
      content: [String],
      milestones: [{
        text: String,
        timeframe: String,
        completed: { type: Boolean, default: false }
      }]
    }
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Brochure', brochureSchema);
