import React, { useState } from 'react';

function JobAcceptance() {
    const [jobId, setJobId] = useState('');
    const [freelancerPublicKey, setFreelancerPublicKey] = useState('');

    const acceptJob = async () => {
        const response = await fetch('http://localhost:3001/accept-job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jobId, freelancerPublicKey }),
        });
        const data = await response.json();
        alert(data.message);
    };

    return (
        <div>
            <h2>Accept a Job</h2>
            <input placeholder="Job ID" value={jobId} onChange={e => setJobId(e.target.value)} />
            <input placeholder="Your Public Key" value={freelancerPublicKey} onChange={e => setFreelancerPublicKey(e.target.value)} />
            <button onClick={acceptJob}>Accept Job</button>
        </div>
    );
}

export default JobAcceptance;
