# Capstone-Project-Scissors
# Introduction
This repository contains code for a server-side application built with Node.js and Express.js. The code sets up a server that handles various routes related to user authentication, user management, and URL management. The code includes functionality to get URLs, shorten and set URLs, update URLs, and delete URLs.
# Table of Contents
-- Installation
-- Usage
-- Configuration
-- API Endpoints
-- Contributing
-- License

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
Description: Retrieve URLs associated with a user.
-- Route: GET /api/urls
-- Access: Private
-- Request Query Parameters:
-- user (required): User ID or email
-- Response: JSON array of URLs

# Shorten and Set URL with a Key
Description: Shorten a URL and associate it with a key for encryption.
-- Route: POST /api/urls/:key
-- Access: Private
-- Request Body Parameters:
    `url` (required): Original URL
     `user` (required): User ID or email
       `key` (required): Key for encryption
--Response: JSON object of the created URL

# Update URL
Description: Update an existing URL.
-- Route: PUT /api/goals
-- Access: Private
-- Request Parameters:
    `id` (required): URL ID
--Request Body: Updated URL data
-- Response: JSON object of the updated URL

# Delete URL
Description: Delete an existing URL.
-- Route: GET /api/url
-- Access: Private
-- Request Parameters:
    `id` (required): URL ID
--Request Body Parameters:
-- googleUser: Indicates whether the user is authenticated via Google (optional)
-- Response: JSON object of the deleted URL

# Implementation Details
The protect middleware function performs the following steps:
Checks if the request contains the Authorization header.
-- If the header starts with "Bearer", it extracts the token and verifies it using the provided JWT_SECRET.
-- If the token is valid, it retrieves the user information from the decoded token and adds it to the request object.
-- If the header starts with "Google", it extracts the token and sets the user information based on the provided email in the request body.
-- If no token is found or the token is invalid, it returns a 401 "Not authorized" error.

# Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1)Fork the repository
2) Create a new branch
3) Make your changes
4) Test your changes
5) Submit a pull request
