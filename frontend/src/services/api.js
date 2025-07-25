import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const brochureAPI = {
  // Get myomectomy brochure content
  getMyomectomyBrochure: async () => {
    try {
      const response = await api.get('/brochures/myomectomy');
      return response.data;
    } catch (error) {
      console.error('Error fetching brochure:', error);
      throw error;
    }
  },

  // Update brochure content (todos, notes, etc.)
  updateMyomectomyBrochure: async (updates) => {
    try {
      const response = await api.put('/brochures/myomectomy', updates);
      return response.data;
    } catch (error) {
      console.error('Error updating brochure:', error);
      throw error;
    }
  },
};

export const trackerAPI = {
  // Create a new tracker entry
  createTracker: async (trackerData) => {
    try {
      const response = await api.post('/trackers', trackerData);
      return response.data;
    } catch (error) {
      console.error('Error creating tracker:', error);
      throw error;
    }
  },

  // Get tracker entries for a brochure
  getTrackers: async (brochureId, type = null) => {
    try {
      const url = type ? `/trackers/${brochureId}?type=${type}` : `/trackers/${brochureId}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching trackers:', error);
      throw error;
    }
  },

  // Delete a tracker entry
  deleteTracker: async (trackerId) => {
    try {
      const response = await api.delete(`/trackers/${trackerId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting tracker:', error);
      throw error;
    }
  },
};

export default api;
