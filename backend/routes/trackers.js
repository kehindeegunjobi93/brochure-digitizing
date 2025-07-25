const express = require('express');
const router = express.Router();
const Tracker = require('../models/Tracker');
const Brochure = require('../models/Brochure');

// POST /api/trackers - Log symptom tracking or notes
router.post('/', async (req, res) => {
  try {
    const { brochureId, type, content, metadata } = req.body;
    
    // Validate required fields
    if (!brochureId || !type || !content) {
      return res.status(400).json({ 
        error: 'Missing required fields: brochureId, type, and content are required' 
      });
    }
    
    // Verify brochure exists
    const brochure = await Brochure.findById(brochureId);
    if (!brochure) {
      return res.status(404).json({ error: 'Brochure not found' });
    }
    
    const tracker = new Tracker({
      brochureId,
      type,
      content,
      metadata: metadata || {}
    });
    
    await tracker.save();
    res.status(201).json(tracker);
  } catch (error) {
    console.error('Error creating tracker:', error);
    res.status(500).json({ error: 'Failed to create tracker entry' });
  }
});

// GET /api/trackers/:brochureId - Get all tracking entries for a brochure
router.get('/:brochureId', async (req, res) => {
  try {
    const { brochureId } = req.params;
    const { type } = req.query;
    
    let query = { brochureId };
    if (type) {
      query.type = type;
    }
    
    const trackers = await Tracker.find(query)
      .sort({ timestamp: -1 })
      .populate('brochureId', 'type title');
    
    res.json(trackers);
  } catch (error) {
    console.error('Error fetching trackers:', error);
    res.status(500).json({ error: 'Failed to fetch tracker entries' });
  }
});

// DELETE /api/trackers/:id - Delete a tracker entry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tracker = await Tracker.findByIdAndDelete(id);
    
    if (!tracker) {
      return res.status(404).json({ error: 'Tracker entry not found' });
    }
    
    res.json({ message: 'Tracker entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting tracker:', error);
    res.status(500).json({ error: 'Failed to delete tracker entry' });
  }
});

module.exports = router;
