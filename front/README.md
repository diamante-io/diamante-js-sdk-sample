# Diamante Network Operations Frontend

This project provides a frontend interface for interacting with the Diamante Network Operations backend. It allows users to create accounts, make payments, manage data, and set options on the Diamante blockchain network.

## Installation

To set up the frontend, follow these steps:

1. Navigate to the frontend directory and install dependencies:
   
   cd diamante-network-operations/diamante-frontend
   npm install

##  Running the Project
Start the frontend development server:

npm start
Open your browser and navigate to http://localhost:3000.

##  Features
Create Account
Navigate to the "Create Account" page.
Click "Generate Keypair" to create a new keypair.
Click "Get Test DIAM" to fund the account using Friendbot.

Payments
Navigate to the "Payments" page.
Enter the sender's secret key, receiver's public key, and amount.
Click "Make Payment" to initiate the transaction.

Manage Data
Navigate to the "Manage Data" page.
Enter the sender's secret key, key, and value.
Click "Manage Data" to set or delete the key-value pair.

Set Options
Navigate to the "Set Options" page.
Enter the sender's secret key, inflation destination, home domain, and thresholds.
Click "Set Options" to update the account options.

##  License
This project is licensed under the MIT License.