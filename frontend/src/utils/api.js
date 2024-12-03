import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode

// const API_URL = 'http://localhost:1337';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';

// Fetch messages with correct Authorization token
export const fetchMessages = async (token) => {
  const response = await axios.get(`${API_URL}/api/messages?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;
};

// Send message with correct Authorization token
export const sendMessage = async (content, token) => {
  const decodedToken = jwtDecode(token); // Decode token to get user ID
  const userId = decodedToken.id;

  console.log('Debug: Sending message:', content); // Log message content
  console.log('Debug: Sender ID from token:', userId); // Log sender ID

  try {
    const response = await axios.post(
      `${API_URL}/api/messages`,
      {
        data: {
          content, // Message text
          sender: userId, // Sender ID
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Debug: Message sent successfully. Response:', response.data); // Log response
    return response.data; // Return the message object to append to the frontend
  } catch (error) {
    console.error('Debug: Error sending message:', error.response?.data || error.message); // Log errors
    throw error;
  }
};

// Login user
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/local`, {
    identifier: email,
    password: password,
  });
  return response.data;
};

// Register user
export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/local/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
};
