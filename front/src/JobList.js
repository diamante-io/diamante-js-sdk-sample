import React, { useEffect, useState } from 'react';

function JobList() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3001/jobs')
          .then(response => response.json())
          .then(data => {
              console.log('Fetched jobs:', data);
              setJobs(data);
          })
          .catch(error => console.error('Error fetching jobs:', error));
  }, []);

    return (
        <div>
            <h2>Available Jobs</h2>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <p>Budget: {job.budget} DIAM</p>
                        <p>Status: {job.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JobList;
