import React, { useState, useEffect } from 'react';
import './App.css';
import BrochureViewer from './components/BrochureViewer';
import { brochureAPI } from './services/api';

function App() {
  const [brochure, setBrochure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrochure();
  }, []);

  const fetchBrochure = async () => {
    try {
      setLoading(true);
      const data = await brochureAPI.getMyomectomyBrochure();
      setBrochure(data);
      setError(null);
    } catch (err) {
      setError('Failed to load brochure content. Please try again.');
      console.error('Error fetching brochure:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateBrochure = async (updates) => {
    try {
      const updatedBrochure = await brochureAPI.updateMyomectomyBrochure(updates);
      setBrochure(updatedBrochure);
      return updatedBrochure;
    } catch (err) {
      setError('Failed to update brochure. Please try again.');
      console.error('Error updating brochure:', err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your aftercare brochure...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchBrochure} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Digital Aftercare Brochure</h1>
        <p>Your personalized recovery guide</p>
      </header>
      <main className="App-main">
        {brochure && (
          <BrochureViewer 
            brochure={brochure} 
            onUpdate={updateBrochure}
          />
        )}
      </main>
    </div>
  );
}

export default App;
