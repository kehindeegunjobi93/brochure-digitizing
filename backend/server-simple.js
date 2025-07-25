const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo purposes
let brochureData = {
  _id: "demo-brochure-id",
  type: 'myomectomy',
  title: 'Abdominal Myomectomy Aftercare Instructions',
  subtitle: 'University of Michigan Health System',
  sections: {
    activityRestrictions: {
      title: 'Activity Restrictions & Recovery Guidelines',
      content: [
        'For 4-6 weeks after surgery, do not lift anything heavier than a gallon of milk',
        'This includes pushing objects such as a vacuum cleaner and vigorous exercise',
        'Do not drive while taking pain medications or if you cannot make sudden movements',
        'Showers are allowed within 24 hours after surgery',
        'Climbing stairs is permitted, but you may require assistance when you first return home',
        'No sexual activity for 6 weeks after surgery',
        'Most patients can return to work between 4-6 weeks after surgery'
      ],
      todos: [
        { text: 'Avoid lifting anything heavier than a gallon of milk (4-6 weeks)', completed: false },
        { text: 'No driving while on pain medication', completed: false },
        { text: 'Take showers (allowed within 24 hours)', completed: false },
        { text: 'Start with short walks and gradually increase distance', completed: false },
        { text: 'No sexual activity for 6 weeks', completed: false },
        { text: 'Plan return to work (4-6 weeks)', completed: false }
      ]
    },
    painManagement: {
      title: 'Pain Management & Medications',
      content: [
        'Medication for pain will be prescribed after surgery - do not take more frequently than instructed',
        'Narcotic pain medications may cause constipation - a stool softener may be needed',
        'It is normal to have decreased energy level after surgery',
        'You may have cramping or feel bloated after surgery',
        'Walking around the house and taking short walks outside can help you get back to normal energy level',
        'You may continue to feel tired for a couple of weeks'
      ],
      todos: [
        { text: 'Take prescribed pain medication as directed', completed: false },
        { text: 'Use stool softener if needed for constipation', completed: false },
        { text: 'Start with short walks to improve energy', completed: false },
        { text: 'Monitor pain levels and report severe pain', completed: false }
      ]
    },
    warningSigns: {
      title: 'Warning Signs - Call Your Doctor Right Away',
      content: [
        'Develop a fever over 100.4°F (38°C)',
        'Start bleeding like a menstrual period or changing a pad every hour',
        'Have severe pain in your abdomen or pelvis that pain medication is not helping',
        'Have heavy vaginal discharge with a bad odor',
        'Have nausea and vomiting',
        'Have chest pain or difficulty breathing',
        'Leak fluid or blood from the incision or if the incision opens',
        'Develop swelling, redness, or pain in your legs',
        'Develop a rash',
        'Have pain with urination'
      ],
      symptoms: [
        { text: 'Fever over 100.4°F (38°C)', flagged: false },
        { text: 'Heavy bleeding or changing pad every hour', flagged: false },
        { text: 'Severe abdominal/pelvic pain not helped by medication', flagged: false },
        { text: 'Heavy vaginal discharge with bad odor', flagged: false },
        { text: 'Nausea and vomiting', flagged: false },
        { text: 'Chest pain or difficulty breathing', flagged: false },
        { text: 'Fluid/blood leaking from incision', flagged: false },
        { text: 'Swelling, redness, or pain in legs', flagged: false },
        { text: 'Rash development', flagged: false },
        { text: 'Pain with urination', flagged: false }
      ]
    },
    followUpSchedule: {
      title: 'Follow-up Care & Appointments',
      content: [
        'You should have a post-operative appointment scheduled for 4-6 weeks after surgery',
        'Most women spend two nights in the hospital and go home around noon the second day',
        'Plan for someone to be at the hospital by noon to drive you home',
        'If you have staples, they may be removed before you go home or by a visiting nurse',
        'Continue with your regular diet after surgery'
      ],
      appointments: [
        { text: 'Schedule post-operative appointment (4-6 weeks after surgery)', completed: false },
        { text: 'Arrange transportation home from hospital', completed: false },
        { text: 'Follow up on staple removal if applicable', completed: false },
        { text: 'Contact doctor with any questions or concerns', completed: false }
      ]
    },
    healingTimeline: {
      title: 'Recovery Timeline & Expectations',
      content: [
        'Hospital stay: 1-2 days (most women spend two nights)',
        'First week: Minimize strenuous activity, normal to have decreased energy',
        'Weeks 2-4: Gradually increase activity, continue to avoid heavy lifting',
        'Weeks 4-6: May return to work, continue avoiding vigorous exercise',
        'After 6 weeks: Can resume normal physical activity and exercise routine',
        'Spotting is normal - discharge will change to brownish then yellow cream color for 4-8 weeks'
      ],
      milestones: [
        { text: 'Hospital discharge (day 2-3)', timeframe: '2-3 days', completed: false },
        { text: 'First week recovery at home', timeframe: 'Week 1', completed: false },
        { text: 'Gradual activity increase', timeframe: 'Weeks 2-4', completed: false },
        { text: 'Return to work', timeframe: '4-6 weeks', completed: false },
        { text: 'Resume normal exercise routine', timeframe: 'After 6 weeks', completed: false },
        { text: 'Post-operative appointment', timeframe: '4-6 weeks', completed: false }
      ]
    }
  },
  notes: '',
  createdAt: new Date(),
  updatedAt: new Date()
};

let trackers = [];

// Routes
// GET /api/brochures/myomectomy - Get myomectomy brochure content
app.get('/api/brochures/myomectomy', (req, res) => {
  res.json(brochureData);
});

// PUT /api/brochures/myomectomy - Update brochure content
app.put('/api/brochures/myomectomy', (req, res) => {
  const updates = req.body;
  brochureData = { ...brochureData, ...updates, updatedAt: new Date() };
  res.json(brochureData);
});

// POST /api/trackers - Create tracker entry
app.post('/api/trackers', (req, res) => {
  const { brochureId, type, content, metadata } = req.body;
  
  if (!brochureId || !type || !content) {
    return res.status(400).json({ 
      error: 'Missing required fields: brochureId, type, and content are required' 
    });
  }
  
  const tracker = {
    _id: Date.now().toString(),
    brochureId,
    type,
    content,
    metadata: metadata || {},
    timestamp: new Date()
  };
  
  trackers.push(tracker);
  res.status(201).json(tracker);
});

// GET /api/trackers/:brochureId - Get tracker entries
app.get('/api/trackers/:brochureId', (req, res) => {
  const { brochureId } = req.params;
  const { type } = req.query;
  
  let filteredTrackers = trackers.filter(t => t.brochureId === brochureId);
  if (type) {
    filteredTrackers = filteredTrackers.filter(t => t.type === type);
  }
  
  res.json(filteredTrackers.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Aftercare Brochure API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📋 Aftercare Brochure API ready!`);
});
