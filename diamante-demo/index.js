const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { Keypair, TransactionBuilder, Operation, Networks, Asset } = require('diamante-base');
const { Horizon } = require('diamante-sdk-js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Load data from JSON files
const loadJobs = () => JSON.parse(fs.readFileSync('jobs.json', 'utf-8'));
const saveJobs = (jobs) => fs.writeFileSync('jobs.json', JSON.stringify(jobs, null, 2));
app.get('/jobs', (req, res) => {
    const jobs = loadJobs();
    res.json(jobs);
});


// Load users from JSON
const loadUsers = () => JSON.parse(fs.readFileSync('users.json', 'utf-8'));
const saveUsers = (users) => fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

// Endpoint to create a job
app.post('/create-job', (req, res) => {
    const { title, description, budget, publicKey } = req.body;
    const jobs = loadJobs();
    const newJob = {
        id: jobs.length,
        title,
        description,
        budget,
        clientPublicKey: publicKey,
        accepted: false,
        status: 'open',
    };
    jobs.push(newJob);
    saveJobs(jobs);
    res.json({ message: 'Job created successfully!', jobId: newJob.id });
});

// Endpoint to accept a job
app.post('/accept-job', (req, res) => {
    const { jobId, freelancerPublicKey } = req.body;
    const jobs = loadJobs();
    if (jobs[jobId] && jobs[jobId].status === 'open') {
        jobs[jobId].accepted = true;
        jobs[jobId].freelancerPublicKey = freelancerPublicKey;
        jobs[jobId].status = 'accepted';
        saveJobs(jobs);
        res.json({ message: 'Job accepted successfully!' });
    } else {
        res.status(404).json({ error: 'Job not found or already accepted!' });
    }
});

// Endpoint to submit completed work
app.post('/submit-job', (req, res) => {
    const { jobId, freelancerPublicKey, submissionDetails } = req.body;
    const jobs = loadJobs();
    const job = jobs.find(job => job.id === jobId && job.freelancerPublicKey === freelancerPublicKey);

    if (!job || job.status !== 'accepted') {
        return res.status(404).json({ error: "Job not found or not accepted by this freelancer" });
    }

    job.submission = submissionDetails;
    job.status = 'submitted';
    saveJobs(jobs);
    res.json({ message: "Job submitted successfully" });
});

// Endpoint to review and complete the job
app.post('/review-job', async (req, res) => {
    const { jobId, clientSecret } = req.body;
    const jobs = loadJobs();
    const job = jobs[jobId];

    if (!job || job.clientPublicKey !== Keypair.fromSecret(clientSecret).publicKey() || job.status !== 'submitted') {
        return res.status(404).json({ message: "Job not found, not owned by this client, or not yet submitted" });
    }

    job.status = 'completed';
    saveJobs(jobs);
    await makePayment(clientSecret, job.freelancerPublicKey, job.budget);
    res.json({ message: "Job completed and payment made successfully" });
});

// Function to make payment
const makePayment = async (senderSecret, receiverPublicKey, amount) => {
    const server = new Horizon.Server('https://diamtestnet.diamcircle.io/');
    const senderKeypair = Keypair.fromSecret(senderSecret);
    const transaction = new TransactionBuilder(await server.loadAccount(senderKeypair.publicKey()), {
        fee: await server.fetchBaseFee(),
        networkPassphrase: Networks.TESTNET,
    })
        .addOperation(Operation.payment({
            destination: receiverPublicKey,
            asset: Asset.native(),
            amount: amount.toString(),
        }))
        .setTimeout(30)
        .build();

    transaction.sign(senderKeypair);
    return await server.submitTransaction(transaction);
};

// Start server
app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
