import React, { useState } from 'react';

function JobReview() {
    const [jobId, setJobId] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const reviewJob = async () => {
        const response = await fetch('http://localhost:3001/review-job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jobId, clientSecret }),
        });
        const data = await response.json();
        alert(data.message);
    };

    return (
        <div>
            <h2>Review and Complete Job</h2>
            <input placeholder="Job ID" value={jobId} onChange={e => setJobId(e.target.value)} />
            <input placeholder="Your Secret Key" value={clientSecret} onChange={e => setClientSecret(e.target.value)} />
            <button onClick={reviewJob}>Review Job</button>
        </div>
    );
}

export default JobReview;
