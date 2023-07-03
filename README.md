# Capstone-Project-Scissors
# Introduction
This repository contains code for a server-side application built with Node.js and Express.js. The code sets up a server that handles various routes related to user authentication, user management, and URL management. The code includes functionality to get URLs, shorten and set URLs, update URLs, and delete URLs.
# Table of Contents
-- Installation
-- Usage
-- Configuration <br>
-- API Endpoints <br>
-- Contributing <br>
-- License <br>

# Installation
1) Clone the repository to your local machine:
```bash
git clone <repository_url>
```
2) Install the required dependencies by running the following command in the project directory:
```bash
npm install
```
3) Set up the necessary configuration by creating a .env file in the root directory of the project and providing the required environment variables.

#Usage
1) Start the server by running the following command:
 ```bash
node server.js
```
2) The server will start running on the specified port (default: 3000).
3) The server exposes various API endpoints for user authentication, user management, and URL management.

# Configuration
--Create a .env file in the root directory of the project and provide the following environment variables:
-- `PORT`: The port on which the server will run.

# API Endpoints
The server provides the following API endpoints:

# Get URLs
Description: Retrieve URLs associated with a user. <br>
-- Route: GET /api/urls <br>
-- Access: Private <br>
-- Request Query Parameters: <br>
-- user (required): User ID or email <br>
-- Response: JSON array of URLs <br>

# Shorten and Set URL with a Key
Description: Shorten a URL and associate it with a key for encryption. <br>
-- Route: POST /api/urls/:key <br>
-- Access: Private <br>
-- Request Body Parameters: <br>
    `url` (required): Original URL <br>
     `user` (required): User ID or email <br>
       `key` (required): Key for encryption <br>
--Response: JSON object of the created URL <br>

# Update URL
Description: Update an existing URL. <br>
-- Route: PUT /api/goals <br>
-- Access: Private <br> 
-- Request Parameters: <br>
    `id` (required): URL ID
--Request Body: Updated URL data <br>
-- Response: JSON object of the updated URL v

# Delete URL
Description: Delete an existing URL. <br>
-- Route: GET /api/url <br>
-- Access: Private <br>
-- Request Parameters: <br>
    `id` (required): URL ID
--Request Body Parameters: <br>
-- googleUser: Indicates whether the user is authenticated via Google (optional) <br>
-- Response: JSON object of the deleted URL <br>

# Implementation Details
The protect middleware function performs the following steps: <br>
Checks if the request contains the Authorization header. <br>
-- If the header starts with "Bearer", it extracts the token and verifies it using the provided JWT_SECRET. <br>
-- If the token is valid, it retrieves the user information from the decoded token and adds it to the request object. <br>
-- If the header starts with "Google", it extracts the token and sets the user information based on the provided email in the request body. <br>
-- If no token is found or the token is invalid, it returns a 401 "Not authorized" error. <br>

# Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps: <br>
1)Fork the repository <br>
2) Create a new branch <br>
3) Make your changes <br>
4) Test your changes <br>
5) Submit a pull request <br>
