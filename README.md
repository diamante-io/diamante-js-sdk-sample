# Decentralized Freelancing Platform

## Overview

This project is a decentralized freelancing platform built using React for the frontend and Express for the backend. The platform allows users to register, create jobs, and accept jobs. It uses the Diamante blockchain for managing user accounts and transactions.

## Features

- **User Registration**: Users can register with a username and a public key.
- **Job Creation**: Registered users can create job postings with a title, description, and budget.
- **Job Acceptance**: Users can accept available jobs if they haven't been accepted yet.
- **Data Management**: Utilizes Diamante blockchain for keypair generation, account funding, and data management.

## Prerequisites

- Node.js and npm installed on your machine.
- Diamante SDK for blockchain operations.

## API Endpoints
POST /create-keypair
Generates a new Diamante keypair.

Response:

publicKey: The generated public key.
secret: The generated secret key.
POST /fund-account
Funds a Diamante account using the Friendbot.

Request Body:

publicKey: The public key of the account to fund.
Response:

message: Confirmation message.
POST /register-user
Registers a new user with a username and public key.

Request Body:

username: The username of the user.
publicKey: The public key of the user.
Response:

message: Confirmation message.
POST /create-job
Creates a new job posting.

Request Body:

title: The title of the job.
description: The description of the job.
budget: The budget for the job.
publicKey: The public key of the user creating the job.
Response:

message: Confirmation message.
GET /jobs
Retrieves all job postings.

Response:

jobs: An array of job objects.
POST /accept-job
Accepts a job posting.

Request Body:

jobTitle: The title of the job to accept.
userPublicKey: The public key of the user accepting the job.
Response:

message: Confirmation message.
Usage
Register a User: Enter a username and public key, then click "Register".
Create a Job: Enter job details (title, description, budget) and click "Create Job".
Accept a Job: Click "Accept Job" for the job you want to accept, then confirm by clicking "Confirm Acceptance".