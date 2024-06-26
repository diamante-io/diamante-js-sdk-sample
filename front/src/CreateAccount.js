// src/CreateAccount.js

import React, { useState } from 'react';

function CreateAccount() {
  const [keypair, setKeypair] = useState({ publicKey: '', secret: '' });
  const [publicKeyToFund, setPublicKeyToFund] = useState('');
  const [fundingMessage, setFundingMessage] = useState('');

  const generateKeypair = async () => {
    console.log('Generate Keypair button clicked');
    try {
      const response = await fetch('http://localhost:3001/create-keypair', {
        method: 'POST',
      });
      const data = await response.json();
      console.log('Keypair generated:', data);
      setKeypair({
        publicKey: data.publicKey,
        secret: data.secret,
      });
      setPublicKeyToFund(data.publicKey);  // Automatically set the generated public key for funding
    } catch (error) {
      console.error('Error generating keypair:', error);
    }
  };

  const fundAccount = async () => {
    console.log('Fund Account button clicked');
    try {
      const response = await fetch('http://localhost:3001/fund-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicKey: publicKeyToFund }),
      });
      const data = await response.json();
      console.log('Account funded:', data);
      setFundingMessage(data.message);
    } catch (error) {
      console.error('Error funding account:', error);
      setFundingMessage('Error funding account.');
    }
  };

  return (
    <div className="App">
      <h1>Create Account</h1>

      <section>
        <h2>Keypair Generator</h2>
        <p>These keypairs can be used on the Diamante network where one is required. For example, it can be used as an account master key, account signer, and/or as a diamnet-core node key.</p>
        <button onClick={generateKeypair}>Generate Keypair</button>
        <div>
          <p><strong>Public Key:</strong> {keypair.publicKey}</p>
          <p><strong>Secret Key:</strong> {keypair.secret}</p>
        </div>
      </section>

      <section>
        <h2>Fund Account</h2>
        <p>Fund this account on the test network using the friendbot tool below. Note down the wallet details for making transactions.</p>
        <input
          type="text"
          placeholder="Enter Public Key"
          value={publicKeyToFund}
          onChange={(e) => setPublicKeyToFund(e.target.value)}
        />
        <button onClick={fundAccount}>Get Test DIAM</button>
        <p>{fundingMessage}</p>
      </section>
    </div>
  );
}

export default CreateAccount;
