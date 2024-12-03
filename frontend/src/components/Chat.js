import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchMessages, sendMessage } from '../utils/api';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';
import { initSocket } from '../utils/socket'; // Import initSocket
import Message from './Message';
import EmojiPicker from './EmojiPicker';
import ConnectionStatus from './ConnectionStatus';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  // Fetch initial messages and set up WebSocket
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchMessages(token).then((data) => {
        setMessages(data);
        saveToLocalStorage('chatMessages', data);
      });

      const socket = initSocket(token);
      setIsConnected(true);

      socket.on('chat message', (msg) => {
        console.log('Debug: New message received via WebSocket:', msg);
        setMessages((prevMessages) => [...prevMessages, msg]); // Append the new message
      });

      socket.on('disconnect', () => setIsConnected(false));
      socket.on('connect', () => setIsConnected(true));

      return () => {
        socket.disconnect();
      };
    } else {
      console.error('Token not found in localStorage!');
    }
  }, [user.token]);

  // Automatically scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle message send
  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log('Debug: Send button clicked. Input message:', inputMessage);

    if (inputMessage.trim()) {
      const token = localStorage.getItem('token'); // Get the token
      console.log('Debug: Retrieved token:', token);

      if (token) {
        try {
          console.log('Debug: Attempting to send message...');
          const newMessage = await sendMessage(inputMessage, token); // Call API to send the message

          // After the message is sent, append it to the messages list
          setMessages((prevMessages) => [...prevMessages, newMessage.data]);

          setInputMessage(''); // Clear the input
          console.log('Debug: Message sent successfully.');
        } catch (error) {
          console.error('Debug: Error while sending message:', error);
        }
      } else {
        console.error('Debug: No token found in localStorage.');
      }
    } else {
      console.log('Debug: Message is empty. Not sending.');
    }
  };

  // Append emoji to message input
  const handleEmojiSelect = (emoji) => {
    setInputMessage(inputMessage + emoji.native); // Add selected emoji to input
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Chat
      </Typography>
      <ConnectionStatus isConnected={isConnected} />
      <Box
        sx={{
          height: '60vh',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          marginBottom: '20px',
        }}
      >
        {messages.map((msg, index) => (
          <Message key={index} message={msg} isOwnMessage={msg.user === user.id} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <form onSubmit={handleSendMessage}>
        <TextField
          fullWidth
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)} // Update input field
          placeholder="Type a message..."
        />
        <EmojiPicker onEmojiSelect={handleEmojiSelect} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send
        </Button>
      </form>
      <Button onClick={logoutUser} variant="outlined" color="secondary" fullWidth style={{ marginTop: '20px' }}>
        Logout
      </Button>
    </Container>
  );
}

export default Chat;


// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { fetchMessages, sendMessage } from '../utils/api';
// import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';
// import { initSocket } from '../utils/socket'; // Import initSocket
// import Message from './Message';
// import EmojiPicker from './EmojiPicker';
// import ConnectionStatus from './ConnectionStatus';
// import { TextField, Button, Typography, Container, Box } from '@mui/material';

// // IndexedDB configuration
// const dbName = 'chatAppDB';
// const storeName = 'messages';

// const openDB = () => {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open(dbName, 1);
//     request.onerror = (e) => reject(e);
//     request.onsuccess = (e) => resolve(e.target.result);
//     request.onupgradeneeded = (e) => {
//       const db = e.target.result;
//       if (!db.objectStoreNames.contains(storeName)) {
//         db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
//       }
//     };
//   });
// };

// // Store messages in IndexedDB
// const storeMessages = async (messages) => {
//   const db = await openDB();
//   const tx = db.transaction(storeName, 'readwrite');
//   const store = tx.objectStore(storeName);
//   messages.forEach((msg) => store.add(msg));
//   await tx.complete;
// };

// // Fetch messages from IndexedDB
// const fetchMessagesFromDB = async () => {
//   const db = await openDB();
//   const tx = db.transaction(storeName, 'readonly');
//   const store = tx.objectStore(storeName);
//   const allMessages = await store.getAll();
//   return allMessages;
// };

// function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isConnected, setIsConnected] = useState(false);
//   const { user, logoutUser } = useContext(AuthContext);
//   const messagesEndRef = useRef(null);

//   // Fetch initial messages and set up WebSocket
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Fetch messages from IndexedDB or fallback to API call if not available
//       fetchMessagesFromDB().then((storedMessages) => {
//         if (storedMessages.length > 0) {
//           setMessages(storedMessages);
//         } else {
//           fetchMessages(token).then((data) => {
//             setMessages(data);
//             storeMessages(data); // Store in IndexedDB for future use
//           });
//         }
//       });

//       const socket = initSocket(token);
//       setIsConnected(true);

//       socket.on('chat message', (msg) => {
//         console.log('Debug: New message received via WebSocket:', msg);
//         setMessages((prevMessages) => [...prevMessages, msg]); // Append the new message
//         storeMessages([msg]); // Save the new message to IndexedDB
//       });

//       socket.on('disconnect', () => setIsConnected(false));
//       socket.on('connect', () => setIsConnected(true));

//       return () => {
//         socket.disconnect(); // Cleanup socket on component unmount
//       };
//     } else {
//       console.error('Token not found in localStorage!');
//     }
//   }, [user.token]);

//   // Automatically scroll to the bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Handle message send
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     console.log('Debug: Send button clicked. Input message:', inputMessage);

//     if (inputMessage.trim()) {
//       const token = localStorage.getItem('token'); // Get the token
//       console.log('Debug: Retrieved token:', token);

//       if (token) {
//         try {
//           console.log('Debug: Attempting to send message...');
//           const newMessage = await sendMessage(inputMessage, token); // Call API to send the message

//           // After the message is sent, append it to the messages list
//           setMessages((prevMessages) => [...prevMessages, newMessage.data]);
//           storeMessages([newMessage.data]); // Save the new message to IndexedDB

//           setInputMessage(''); // Clear the input
//           console.log('Debug: Message sent successfully.');
//         } catch (error) {
//           console.error('Debug: Error while sending message:', error);
//         }
//       } else {
//         console.error('Debug: No token found in localStorage.');
//       }
//     } else {
//       console.log('Debug: Message is empty. Not sending.');
//     }
//   };

//   // Append emoji to message input
//   const handleEmojiSelect = (emoji) => {
//     setInputMessage(inputMessage + emoji.native); // Add selected emoji to input
//   };

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" align="center" gutterBottom>
//         Chat
//       </Typography>
//       <ConnectionStatus isConnected={isConnected} />
//       <Box
//         sx={{
//           height: '60vh',
//           overflowY: 'auto',
//           border: '1px solid #ccc',
//           borderRadius: '4px',
//           padding: '10px',
//           marginBottom: '20px',
//         }}
//       >
//         {messages.map((msg, index) => (
//           <Message key={index} message={msg} isOwnMessage={msg.user === user.id} />
//         ))}
//         <div ref={messagesEndRef} />
//       </Box>
//       <form onSubmit={handleSendMessage}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)} // Update input field
//           placeholder="Type a message..."
//         />
//         <EmojiPicker onEmojiSelect={handleEmojiSelect} />
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Send
//         </Button>
//       </form>
//       <Button onClick={logoutUser} variant="outlined" color="secondary" fullWidth style={{ marginTop: '20px' }}>
//         Logout
//       </Button>
//     </Container>
//   );
// }

// export default Chat;

