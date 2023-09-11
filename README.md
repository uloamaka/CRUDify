# CRUDify
Crafting a Simple REST API for Managing People with full CRUD operations

## Table of Contents
1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [Configuration](#configuration)
3. [Running the API](#running-the-api)
4. [Usage](#usage)
   - [Endpoints](#endpoints)
5. [Testing](#testing)
6. [License](#license)


## 1. Getting Started

### Prerequisites

Before you can run the API, make sure you have the following prerequisites installed:

- Node.js: You can download and install Node.js from [nodejs.org](https://nodejs.org/).
- MongoDB: Install and set up MongoDB on your system. You can download it from [mongodb.com](https://www.mongodb.com/).

### Installation
- run npm install
## 1. Clone the repository to your local machine:

 -  git clone https://github.com/CRUDify/api.git  /////

 **Navigate to the project directory:**
 - cd api

 **Install the project dependencies:**
 - npm install

## 2. Configuration
- To configure the API, you need to set up environment variables. Create a .env file in the project root and add the following variables:

- PORT=3000
- url="mongodb+srv://<database>:<password>@dreams.5vef4ul.mongodb.net/?retryWrites=true&w=majority"

- PORT: The port on which the API will run (default is 3000).
- MONGODB_URI: The connection string to your MongoDB instance

## 3. Running the API
- To start the API, run the following command:
**run**
- npm run dev
- The API will start and be available at http://localhost:3000 (or the port you specified in the .env file).

## 4. Usage
**Endpoints**
- The API provides the following endpoints:

- GET /api/:user_id: Retrieve person's details by ID.
- POST /api: Create a new person.
- PUT /api/:user_id: Update a person.
- DELETE /api/:user_id: Delect a person.

## 5. Testing
- To run tests, use the following command:

- npm test

## 6. License
This project is licensed under the MIT License. See the LICENSE file for details.