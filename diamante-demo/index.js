const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Keypair, TransactionBuilder, Operation, Networks, Asset } = require('diamante-base');
const { Horizon } = require('diamante-sdk-js');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const jobsFilePath = path.join(__dirname, 'jobs.json');
const usersFilePath = path.join(__dirname, 'users.json');

// Helper functions for file operations
function readDataFromFile(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]');
}

function writeDataToFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Diamante Keypair creation
app.post('/create-keypair', (req, res) => {
    try {
        const keypair = Keypair.random();
        res.json({
            publicKey: keypair.publicKey(),
            secret: keypair.secret()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fund account using Diamante Friendbot
app.post('/fund-account', async (req, res) => {
    try {
        const { publicKey } = req.body;
        const fetch = await import('node-fetch').then(mod => mod.default);
        const response = await fetch(`https://friendbot.diamcircle.io/?addr=${publicKey}`);
        const result = await response.json();
        res.json({ message: `Account ${publicKey} funded successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User registration
app.post('/register-user', (req, res) => {
    const { publicKey, username } = req.body;
    const users = readDataFromFile(usersFilePath);

    if (users.some(user => user.publicKey === publicKey)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ publicKey, username });
    writeDataToFile(usersFilePath, users);

    res.json({ message: 'User registered successfully' });
});

// Job creation
app.post('/create-job', (req, res) => {
    const { title, description, budget, publicKey } = req.body;
    const jobs = readDataFromFile(jobsFilePath);

    jobs.push({ title, description, budget, publicKey });
    writeDataToFile(jobsFilePath, jobs);

    res.json({ message: 'Job created successfully' });
});

// Get all jobs
app.get('/jobs', (req, res) => {
    const jobs = readDataFromFile(jobsFilePath);
    res.json(jobs);
});

// Make payment between users
app.post('/make-payment', async (req, res) => {
    try {
        const { senderSecret, receiverPublicKey, amount } = req.body;

        const server = new Horizon.Server('https://diamtestnet.diamcircle.io/');
        const senderKeypair = Keypair.fromSecret(senderSecret);
        const account = await server.loadAccount(senderKeypair.publicKey());
        
        const transaction = new TransactionBuilder(account, {
            fee: await server.fetchBaseFee(),
            networkPassphrase: Networks.TESTNET,
        })
        .addOperation(Operation.payment({
            destination: receiverPublicKey,
            asset: Asset.native(),
            amount: amount,
        }))
        .setTimeout(30)
        .build();

        transaction.sign(senderKeypair);
        const result = await server.submitTransaction(transaction);
        res.json({ message: `Payment of ${amount} DIAM made to ${receiverPublicKey} successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Manage account data (store key-value pairs)
app.post('/manage-data', async (req, res) => {
    try {
        const { senderSecret, key, value } = req.body;

        const server = new Horizon.Server('https://diamtestnet.diamcircle.io/');
        const senderKeypair = Keypair.fromSecret(senderSecret);
        const account = await server.loadAccount(senderKeypair.publicKey());
        
        const transaction = new TransactionBuilder(account, {
            fee: await server.fetchBaseFee(),
            networkPassphrase: Networks.TESTNET,
        })
        .addOperation(Operation.manageData({
            name: key,
            value: value || null,
        }))
        .setTimeout(30)
        .build();

        transaction.sign(senderKeypair);
        const result = await server.submitTransaction(transaction);
        res.json({ message: `Data for key ${key} managed successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Set account options
app.post('/set-options', async (req, res) => {
    try {
        const { senderSecret, inflationDest, homeDomain, lowThreshold, medThreshold, highThreshold } = req.body;

        const server = new Horizon.Server('https://diamtestnet.diamcircle.io/');
        const senderKeypair = Keypair.fromSecret(senderSecret);
        const account = await server.loadAccount(senderKeypair.publicKey());
        
        const transaction = new TransactionBuilder(account, {
            fee: await server.fetchBaseFee(),
            networkPassphrase: Networks.TESTNET,
        })
        .addOperation(Operation.setOptions({
            inflationDest: inflationDest || undefined,
            homeDomain: homeDomain || undefined,
            lowThreshold: lowThreshold ? parseInt(lowThreshold) : undefined,
            medThreshold: medThreshold ? parseInt(medThreshold) : undefined,
            highThreshold: highThreshold ? parseInt(highThreshold) : undefined,
        }))
        .setTimeout(30)
        .build();

        transaction.sign(senderKeypair);
        const result = await server.submitTransaction(transaction);
        res.json({ message: 'Options set successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Accept a job
app.post('/accept-job', (req, res) => {
    const { jobTitle, userPublicKey } = req.body;
    const jobs = readDataFromFile(jobsFilePath);

    // Find the job
    const jobIndex = jobs.findIndex(job => job.title === jobTitle);

    if (jobIndex === -1) {
        return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the job is already accepted
    if (jobs[jobIndex].status === 'accepted') {
        return res.status(400).json({ message: 'Job is already accepted' });
    }

    // Update the job status and assign it to the user
    jobs[jobIndex].status = 'accepted';
    jobs[jobIndex].acceptedBy = userPublicKey;
    writeDataToFile(jobsFilePath, jobs);

    res.json({ message: `Job ${jobTitle} accepted successfully` });
});


// Start the server
app.listen(port, () => {
    console.log(`Diamante backend listening at http://localhost:${port}`);
});
