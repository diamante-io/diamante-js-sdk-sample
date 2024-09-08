import React, { useState } from 'react';

function JobSubmission() {
    const [jobId, setJobId] = useState('');
    const [freelancerPublicKey, setFreelancerPublicKey] = useState('');
    const [submissionDetails, setSubmissionDetails] = useState('');

    const submitJob = async () => {
        const response = await fetch('http://localhost:3001/submit-job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jobId, freelancerPublicKey, submissionDetails }),
        });
        const data = await response.json();
        alert(data.message);
    };

    return (
        <div>
            <h2>Submit Completed Work</h2>
            <input placeholder="Job ID" value={jobId} onChange={e => setJobId(e.target.value)} />
            <input placeholder="Your Public Key" value={freelancerPublicKey} onChange={e => setFreelancerPublicKey(e.target.value)} />
            <input placeholder="Submission Details" value={submissionDetails} onChange={e => setSubmissionDetails(e.target.value)} />
            <button onClick={submitJob}>Submit Work</button>
        </div>
    );
}

export default JobSubmission;
