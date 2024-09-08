import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [username, setUsername] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobBudget, setJobBudget] = useState('');
  const [selectedJob, setSelectedJob] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleRegisterUser = () => {
    axios.post('http://localhost:3001/register-user', { username, publicKey })
      .then(response => alert(response.data.message))
      .catch(error => console.error('Error registering user:', error));
  };

  const handleCreateJob = () => {
    axios.post('http://localhost:3001/create-job', { title: jobTitle, description: jobDescription, budget: jobBudget, publicKey })
      .then(response => {
        alert(response.data.message);
        setJobs([...jobs, { title: jobTitle, description: jobDescription, budget: jobBudget, publicKey }]);
      })
      .catch(error => console.error('Error creating job:', error));
  };

  const handleAcceptJob = () => {
    axios.post('http://localhost:3001/accept-job', { jobTitle: selectedJob, userPublicKey: publicKey })
      .then(response => {
        alert(response.data.message);
        setJobs(jobs.map(job => job.title === selectedJob ? { ...job, status: 'accepted', acceptedBy: publicKey } : job));
      })
      .catch(error => console.error('Error accepting job:', error));
  };

  return (
    <div>
      <h1>Decentralized Freelancing Platform</h1>

      <h2>Register User</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="text" placeholder="Public Key" value={publicKey} onChange={e => setPublicKey(e.target.value)} />
      <button onClick={handleRegisterUser}>Register</button>

      <h2>Create Job</h2>
      <input type="text" placeholder="Job Title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
      <textarea placeholder="Job Description" value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
      <input type="number" placeholder="Job Budget" value={jobBudget} onChange={e => setJobBudget(e.target.value)} />
      <button onClick={handleCreateJob}>Create Job</button>

      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Budget: {job.budget}</p>
            <p>Posted by: {job.publicKey}</p>
            {job.status === 'accepted' ? (
              <p>Accepted by: {job.acceptedBy}</p>
            ) : (
              <button onClick={() => setSelectedJob(job.title)}>Accept Job</button>
            )}
          </li>
        ))}
      </ul>

      {selectedJob && (
        <div>
          <h2>Accept Job</h2>
          <button onClick={handleAcceptJob}>Confirm Acceptance</button>
        </div>
      )}
    </div>
  );
}

export default App;
