# Diamante Network Operations Backend

This project demonstrates the use of the Diamante SDK to perform various operations on the Diamante blockchain network, including creating accounts, making payments, managing data, and setting options.

## Installation

To set up the backend, follow these steps:

1. Clone the repository:
   
   git clone https://github.com/diamcircle/diamante-js-sdk-sample
Navigate to the backend directory and install dependencies:

cd diamante-js-sdk-sample/diamante-demo
npm install
Running the Project
Start the backend server:

The backend server will be running at http://localhost:3001.

## Endpoints
Create Keypair
Endpoint: /create-keypair
Method: POST
Description: Generates a new keypair.
Response:

{
  "publicKey": "GCPH3KD3HEEWVBH4TH4RCV7RM5SRSKRTTX0FQQF6EK3QDFSWM73LYXUD",
  "secret": "SDYIM7HJCJVTRWFC7W3YN2WTIIY7FOZZXM7UCNGGIG47JAAIKV6EF3Y"
}

Fund Account
Endpoint: /fund-account
Method: POST
Description: Funds the account using Friendbot.
Request Body:

{
  "publicKey": "GCPH3KD3HEEWVBH4TH4RCV7RM5SRSKRTTX0FQQF6EK3QDFSWM73LYXUD"
}
Response:

{
  "message": "Account GCPH3KD3HEEWVBH4TH4RCV7RM5SRSKRTTX0FQQF6EK3QDFSWM73LYXUD funded successfully"
}

Make Payment
Endpoint: /make-payment
Method: POST
Description: Makes a payment from one account to another.
Request Body:

{
  "senderSecret": "SDYIM7HJCJVTRWFC7W3YN2WTIIY7FOZZXM7UCNGGIG47JAAIKV6EF3Y",
  "receiverPublicKey": "GCPH3KD3HEEWVBH4TH4RCV7RM5SRSKRTTX0FQQF6EK3QDFSWM73LYXUD",
  "amount": "10"
}
Response:
{
  "message": "Payment of 10 DIAM made to GCPH3KD3HEEWVBH4TH4RCV7RM5SRSKRTTX0FQQF6EK3QDFSWM73LYXUD successfully"
}

Manage Data
Endpoint: /manage-data
Method: POST
Description: Sets or deletes a key-value pair on an account.
Request Body:
{
  "senderSecret": "SDYIM7HJCJVTRWFC7W3YN2WTIIY7FOZZXM7UCNGGIG47JAAIKV6EF3Y",
  "key": "example_key",
  "value": "example_value"
}
Response:
{
  "message": "Data for key example_key managed successfully"
}

Set Options
Endpoint: /set-options
Method: POST
Description: Sets various account options.
Request Body:
{
  "senderSecret": "SDYIM7HJCJVTRWFC7W3YN2WTIIY7FOZZXM7UCNGGIG47JAAIKV6EF3Y",
  "inflationDest": "GCPH3KD3HEEWVBH4TH4RCV7RM5SRSKRTTX0FQQF6EK3QDFSWM73LYXUD",
  "homeDomain": "example.com",
  "lowThreshold": "1",
  "medThreshold": "2",
  "highThreshold": "3"
}
Response:
{
  "message": "Options set successfully"
}

# Diamante Network Operations Frontend

This project provides a frontend interface for interacting with the Diamante Network Operations backend. It allows users to create accounts, make payments, manage data, and set options on the Diamante blockchain network.

## Installation

To set up the frontend, follow these steps:

1. Navigate to the frontend directory and install dependencies:
   
   cd diamante-js-sdk-sample/front
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
