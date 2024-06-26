// src/Payments.js

import React, { useState } from 'react';

function Payments() {
  const [senderSecret, setSenderSecret] = useState('');
  const [receiverPublicKey, setReceiverPublicKey] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');

  const makePayment = async () => {
    console.log('Make Payment button clicked');
    try {
      const response = await fetch('http://localhost:3001/make-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderSecret,
          receiverPublicKey,
          amount,
        }),
      });
      const data = await response.json();
      console.log('Payment made:', data);
      setPaymentMessage(data.message);
    } catch (error) {
      console.error('Error making payment:', error);
      setPaymentMessage('Error making payment.');
    }
  };

  return (
    <div className="App">
      <h1>Payments</h1>

      <section>
        <h2>Make a Payment</h2>
        <input
          type="text"
          placeholder="Sender Secret Key"
          value={senderSecret}
          onChange={(e) => setSenderSecret(e.target.value)}
        />
        <input
          type="text"
          placeholder="Receiver Public Key"
          value={receiverPublicKey}
          onChange={(e) => setReceiverPublicKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={makePayment}>Make Payment</button>
        <p>{paymentMessage}</p>
      </section>
    </div>
  );
}

export default Payments;
