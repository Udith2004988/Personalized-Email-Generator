// src/components/Home.js

import React, { useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/your-endpoint'); // Example API request
        console.log('Data:', response.data); // Log the data received from backend
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, []); // Empty dependency array to call once on mount

  return (
    <div>
      <h1>Welcome to Email Generator</h1>
      {/* Add your UI elements here */}
    </div>
  );
};

export default Home;
