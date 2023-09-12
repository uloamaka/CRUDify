# API Documentation

Welcome to the CRUDify API documentation! This document provides essential information for developers to use this API effectively.

## Table of Contents
1. [Standard Request and Response Formats](#standard-request-and-response-formats)
2. [Sample Usage](#sample-usage)
3. [Limitations and Assumptions](#limitations-and-assumptions)
4. [Setup and Deployment](#setup-and-deployment)

## 1. Standard Request and Response Formats

### API Base URL
- The API can be accessed at `https://crudify.onrender.com/api`.

### Request Headers
- Content-Type: application/json
 
### Response Format
- All responses are in JSON format.

### Common Status Codes
- 200 OK: Successful request.
- 400 Bad Request: Invalid request format or missing parameters.
- 401 Unauthorized: Missing or invalid API Key.
- 404 Not Found: Resource not found.
- 500 Internal Server Error: Unexpected server error.

## 2. Sample Usage

### Endpoint: /api

### POST /api/
- Create a new person.

**Request:**
POST /api/

- Content-Type: application/json
{
  "name": "Mark Essien",
}


**Response (201 Created):**
{
  "name": "Mark Essien",
  "_id": "64ff334e3dbd9d50b487e876"
}

**Invalid Request:**
POST /api/

- Content-Type: application/json
{
  "name": 89680 || true || < any other dataTypes except `string`>,
}

**Response (400 Bad Request):**
- json
{
  "errors": [
    {
      "type": "field",
      "value": 67,
      "msg": "Invalid value",
      "path": "name",
      "location": "body"
    }
  ]
}

#### GET /api/:user_id
- Retrieve a persons details by ID.

**Request:**
GET /api/64ff334e3dbd9d50b487e876

**Response (200 OK):**
{
  "id": 64ff334e3dbd9d50b487e876,
  "name": "Mark Essien"
}
**Invalid Request:**
GET /api/64ff < Wrong user id >

**Response (404 Not Found):**
{
  "error": "Person not found."
}

#### PUT /api/:user_id
- Updates a person's details by ID.

**Request:**
PUT /api/64ff334e3dbd9d50b487e876

- Content-Type: application/json
{
  "name": "Mark Ess",
}

**Response (200 OK):**
{
  "id": 64ff334e3dbd9d50b487e876,
  "name": "Mark Ess"
}

**Invalid Request:**
GET /api/64ff < Wrong user id >

**Response (404 Not Found):**
{
  "error": "Person not found."
}

#### DELETE /api/:user_id
- Delete a person's details by ID.

**Request:**
DELETE /api/64ff334e3dbd9d50b487e876

**Response (200 OK):**
{
  "message": "Person removed"
}

**Invalid Request:**
GET /api/64ff < Wrong user id >

**Response (404 Not Found):**
{
  "error": "Person not found."
}


## 3. Limitations and Assumptions
- Pagination is not implemented for large datasets.
- Versioning is not implemented for ease of upgrade(/api/v1).


## 4. Setup and Deployment
- Local Development
**Clone the repository:**
- git clone https://github.com/uloamaka/CRUDify 

**Install dependencies:**
- cd api
- npm install

**Set environment variables:**

**Create a .env file and set the following variables:**
- PORT=3000
- MONGO_URL="mongodb+srv://<database>:<password>@<database>.5vef4ul.mongodb.net/?retryWrites=true&w=majority"

**Start the server:**
- npm run dev

### Deployment
- Deploy the API to a hosting platform (e.g., Render).
- Set the environment variables for your hosting platform, including the API Key and MongoDB URI.
- Configure the domain and SSL certificate (if required).
- That's it! You can now access the API at your deployment URL.

- ## UML DIAGRAM
*LINK* https://lucid.app/lucidchart/e4e345e8-19da-407c-9920-b079544679b7/edit?viewport_loc=-236%2C-418%2C2346%2C1047%2C0_0&invitationId=inv_0138a24a-008a-42e7-b888-f14c40084274

For further assistance or inquiries, contact support@CRUDify.com. <GIFTEDGRIT>


