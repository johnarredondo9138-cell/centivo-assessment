# centivo-assessment

A simple Node.js Express API that connects to a MongoDB database and retrieves user data with age restrictions.

## Approach explanation

When approaching this project, I focused on creating a clean, maintainable structure that properly handles errors and edge cases. Instead of filtering users by age in the application code, I built the age requirement directly into the database query. This makes the API more efficient by only transferring data that meets our requirements.

I also put special attention into error handling—making sure invalid IDs get helpful error messages while keeping the actual reason a user might not be returned (whether they don't exist or are underage) intentionally vague for security purposes. The result is an API that's both efficient and secure.

## Features

- GET endpoint at /users/:id to retrieve user details

- MongoDB integration with Mongoose ODM

- Age filtering (only returns users older than 21)

- Proper error handling for invalid ObjectIds

- 404 responses for non-existent users

- Environment-based configuration

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)

- MongoDB (local installation or MongoDB Atlas account)

- npm or yarn package manager

## Installation

1. Clone or download the project files

2. Navigate to the project directory

3. Install dependencies:
   `npm install`
4. Create a `.env` file in the root directory with the following variables:

`PORT=3000
MONGODB_URI=mongodb://localhost:27017/userdb`

## Database Setup

1. Make sure MongoDB is running on your system

2. Run the seed script to populate the database with sample data:

`node seed.js`

This will create a database named userdb with a users collection containing sample documents.

## Running the Application

### Development mode (with auto-restart):

`npm run dev`

### Production mode:

`npm start`
The API will be available at http://localhost:3000 (or the port specified in your .env file).

## API Usage

### Get User by ID

Endpoint: GET /users/:id

Success Response (200):

`{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@email.com",
  "age": 30
}`
Error Responses:

- 400 Bad Request - Invalid ObjectId format

- 404 Not Found - User not found or age is 21 or below

### Examples using curl:

`

- Valid request
  curl http://localhost:3000/users/507f1f77bcf86cd799439011

- Invalid ObjectId
  curl http://localhost:3000/users/invalid-id

- User not found
  curl http://localhost:3000/users/507f1f77bcf86cd799439999`

## Sample Data

The seed script inserts the following sample users:

1. John Doe, age 30

2. Jane Smith, age 25

3. Bob Johnson, age 20 (will be filtered out by API)

4. Alice Brown, age 18 (will be filtered out by API)

## Error Handling

The API includes comprehensive error handling:

- Invalid ObjectId format returns 400 status

- Non-existent users return 404 status

- Server errors are properly logged and handled

- Age filtering is built into the database query
