import React, { useState } from 'react';
import './App.css';  // Import the styles

function App() {
  const [recipient, setRecipient] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tone, setTone] = useState('Formal');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:5000/generate-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient,
        eventDetails,
        instructions,
        tone,
      }),
    });

    const data = await response.json();
    setGeneratedEmail(data.email);
    setLoading(false);
  };

  return (
    <div className="app-container">
      <div className="header">AI Personalized Email Generator</div>

      <div>
        <input
          type="text"
          className="input-field"
          placeholder="Recipient's Name"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <textarea
          className="input-field"
          placeholder="Event Details"
          value={eventDetails}
          onChange={(e) => setEventDetails(e.target.value)}
        />
        <textarea
          className="input-field"
          placeholder="Special Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <select
          className="input-field"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
        </select>
        
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Generate Email'}
        </button>
      </div>

      <h2 className="typing-text">Email Preview</h2>
      <p>{generatedEmail}</p>
    </div>
  );
}

export default App;
