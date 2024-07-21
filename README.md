
# NEWSAI (NewsAPI + Groq + Langchain)

## Overview
This project consists of a backend server and a frontend UI application. The backend runs on Node.js and Express, while the frontend is built using React.

## Prerequisites
- Node.js installed on your machine
- npm (Node Package Manager)

## Setup Instructions

### Backend Setup
1. **Navigate to the Server Directory:**
   ```sh
   cd /server
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Configure Environment Variables:**
   - Go to the `ENV-EXAMPLE.txt` file.
   - Add your secret keys and rename the file to `.env`.

4. **Install Nodemon Globally (Optional but Recommended):**
   ```sh
   npm install -g nodemon
   ```

5. **Start the Server:**
   ```sh
   npm run start
   ```

   The server will be up and running at `http://localhost:3000`.

### Frontend Setup
1. **Navigate to the UI Directory:**
   ```sh
   cd /UI
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Start the UI Application:**
   ```sh
   npm run start
   ```

4. **Verify Backend URL Configuration:**
   - Open the `config.ts` file we can also do the same in `.env` as well
   - Ensure that the backend URL is correctly configured to point to `http://localhost:3000`.

### Running the Application
- The backend server will be accessible at `http://localhost:3000`.
- The frontend application will typically run on `http://localhost:5173` or another port if specified in your configuration.

## Troubleshooting
- If you encounter any issues with dependencies, try deleting the `node_modules` folder and the `package-lock.json` file, then run `npm install` again.
- Ensure that your `.env` file is correctly configured with all necessary environment variables.




This README provides a clear and structured guide for setting up and running the project, ensuring that developers can quickly get started with the backend and frontend components.
