# Real-Time Chat Application
A real-time chat application built with React.js frontend and Strapi backend, featuring user authentication, real-time messaging, and emoji support.

## Project Structure
```
REAL-TIME-CHAT-APP/
├── backend/          # Strapi backend
└── frontend/         # React frontend
```

## Prerequisites

Node.js (v14 or higher)

npm (v6 or higher)

Visual Studio Code or any preferred code editor

## Technologies Used

1. **Frontend:**
- React
- Socket.IO (for real-time messaging)
- React Router
- JWT Authentication
- Axios (for API requests)

2. **Backend:**
- Strapi CMS (for RESTful API)
- SQLite (or your preferred database)
- Socket.IO (for real-time messaging)

## Installation & Setup
### Backend Setup

1. Clone the Repository to your local machine:
```
git clone https://github.com/Rahulmadiraju/REAL-TIME-CHAT-APP.git
```

2. Navigate to the backend directory:
```
cd backend
```

3.Install dependencies:
```
npm install
npm run build
```

4. Install required packages:
```
npm install socket.io jsonwebtoken
npm install @types/strapi
```

5. Start the Strapi server:
```
npm run develop
```
This will start Strapi on http://localhost:1337

6. Configure Strapi:
- Access admin panel at http://localhost:1337/admin
- Set up the database (SQLite or any preferred database).
- Make sure to configure the JWT settings and CORS if needed.
- In Strapi, create a messages model with fields like content, sender, and timestamp.
- Create an admin account if first time
- Go to Settings > Roles & Permissions
- Under "Authenticated" role, enable these permissions for Message:
```
- find
- findOne
- create
- update
- Save changes 
```
 
### Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Install additional packages:
```
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install react-router-dom@latest
npm install socket.io-client
npm install jwt-decode
npm install @emoji-mart/data @emoji-mart/react
npm install axios
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material emoji-mart socket.io-client jwt-decode axios react-router-dom
```

4. Start the React development server:
```
npm start
```
This will start the React app on http://localhost:3000

### Running the Application
1. Start both servers simultaneously:

    - Backend: Run npm run develop in backend directory
    - Frontend: Run npm start in frontend directory in a separate terminal

2. Access the application:
    - Frontend: http://localhost:3000
    - Backend: http://localhost:1337/admin

Make sure that both applications are running on their respective ports (http://localhost:1337 for Strapi and http://localhost:3000 for React).

## User Setup & Login Process

1. First-time setup:
- Go to Strapi admin panel (http://localhost:1337/admin)
- Create a new user in Content Manager > User
- Fill in required fields:
    - Username
    - Email
    - Password
    - Set "confirmed" to true
    - Save the user

2. Login Process:

- Access frontend at http://localhost:3000
- Use the credentials created in Strapi admin
- After successful login, you'll be redirected to the chat interface

## Features

- User authentication (login/register)
- Real-time messaging
- Emoji picker support
- Message persistence
- Connection status indicator
- Automatic scroll to latest messages
- Responsive design
- Important Notes
- Keep both frontend and backend servers running simultaneously
- Create test messages in Strapi admin panel to verify functionality
- Check browser console for debugging information
- Ensure proper network connectivity for WebSocket functionality

## Development Workflow
- Start backend server first
- Start frontend server in a separate terminal
- Create test content in Strapi admin
- Test functionality through frontend interface
- Monitor console for debugging information

Remember to keep both servers running while developing and testing the application.