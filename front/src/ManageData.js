// src/ManageData.js

import React, { useState } from 'react';

function ManageData() {
  const [senderSecret, setSenderSecret] = useState('');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [manageDataMessage, setManageDataMessage] = useState('');

  const manageData = async () => {
    console.log('Manage Data button clicked');
    try {
      const response = await fetch('http://localhost:3001/manage-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderSecret,
          key,
          value,
        }),
      });
      const data = await response.json();
      console.log('Data managed:', data);
      setManageDataMessage(data.message);
    } catch (error) {
      console.error('Error managing data:', error);
      setManageDataMessage('Error managing data.');
    }
  };

  return (
    <div className="App">
      <h1>Manage Data</h1>

      <section>
        <h2>Manage Account Data</h2>
        <input
          type="text"
          placeholder="Sender Secret Key"
          value={senderSecret}
          onChange={(e) => setSenderSecret(e.target.value)}
        />
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={manageData}>Manage Data</button>
        <p>{manageDataMessage}</p>
      </section>
    </div>
  );
}

export default ManageData;
