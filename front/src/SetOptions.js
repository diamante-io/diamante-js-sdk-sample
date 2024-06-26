// src/SetOptions.js

import React, { useState } from 'react';

function SetOptions() {
  const [senderSecret, setSenderSecret] = useState('');
  const [inflationDest, setInflationDest] = useState('');
  const [homeDomain, setHomeDomain] = useState('');
  const [lowThreshold, setLowThreshold] = useState('');
  const [medThreshold, setMedThreshold] = useState('');
  const [highThreshold, setHighThreshold] = useState('');
  const [setOptionsMessage, setSetOptionsMessage] = useState('');

  const setOptions = async () => {
    console.log('Set Options button clicked');
    try {
      const response = await fetch('http://localhost:3001/set-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderSecret,
          inflationDest,
          homeDomain,
          lowThreshold,
          medThreshold,
          highThreshold,
        }),
      });
      const data = await response.json();
      console.log('Options set:', data);
      setSetOptionsMessage(data.message);
    } catch (error) {
      console.error('Error setting options:', error);
      setSetOptionsMessage('Error setting options.');
    }
  };

  return (
    <div className="App">
      <h1>Set Options</h1>

      <section>
        <h2>Set Account Options</h2>
        <input
          type="text"
          placeholder="Sender Secret Key"
          value={senderSecret}
          onChange={(e) => setSenderSecret(e.target.value)}
        />
        <input
          type="text"
          placeholder="Inflation Destination"
          value={inflationDest}
          onChange={(e) => setInflationDest(e.target.value)}
        />
        <input
          type="text"
          placeholder="Home Domain"
          value={homeDomain}
          onChange={(e) => setHomeDomain(e.target.value)}
        />
        <input
          type="text"
          placeholder="Low Threshold"
          value={lowThreshold}
          onChange={(e) => setLowThreshold(e.target.value)}
        />
        <input
          type="text"
          placeholder="Medium Threshold"
          value={medThreshold}
          onChange={(e) => setMedThreshold(e.target.value)}
        />
        <input
          type="text"
          placeholder="High Threshold"
          value={highThreshold}
          onChange={(e) => setHighThreshold(e.target.value)}
        />
        <button onClick={setOptions}>Set Options</button>
        <p>{setOptionsMessage}</p>
      </section>
    </div>
  );
}

export default SetOptions;
