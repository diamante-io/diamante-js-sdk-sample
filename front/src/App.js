import React from 'react';
import JobCreation from './JobCreation';
import JobList from './JobList';
import JobAcceptance from './JobAcceptance';
import JobSubmission from './JobSubmission';
import JobReview from './JobReview';

function App() {
    return (
        <div>
            <h1>Decentralized Freelancing Platform</h1>
            <JobCreation />
            <JobList />
            <JobAcceptance />
            <JobSubmission />
            <JobReview />
        </div>
    );
};

export default App;
