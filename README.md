# Node.js MongoDB App

## Prerequisites
- Node.js
- MongoDB

## Setup
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

3. Set up MongoDB:
   - Ensure MongoDB is installed and running locally
   - The default connection string is `mongodb://localhost:27017/mydatabase`

4. Create a `.env` file with your configuration (optional)
   ```
   MONGODB_URI=mongodb://localhost:27017/mydatabase
   PORT=3000
   ```

## Running the Application
```
node server.js
```

## API Endpoints
- `GET /`: Welcome message
- `POST /users`: Create a new user
- `GET /users`: List all users

## Technologies
- Express.js
- MongoDB
- Mongoose
- dotenv
- cors
- body-parser
