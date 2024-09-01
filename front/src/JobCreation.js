import React, { useState } from 'react';

function JobCreation() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [publicKey, setPublicKey] = useState('');

    const createJob = async () => {
        const response = await fetch('http://localhost:3001/create-job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, budget, publicKey }),
        });
        const data = await response.json();
        alert(data.message);
    };

    return (
        <div>
            <h2>Create a Job</h2>
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input placeholder="Budget" value={budget} onChange={e => setBudget(e.target.value)} />
            <input placeholder="Your Public Key" value={publicKey} onChange={e => setPublicKey(e.target.value)} />
            <button onClick={createJob}>Create Job</button>
        </div>
    );
}

export default JobCreation;
