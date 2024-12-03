// export const saveToLocalStorage = (key, value) => {
//     localStorage.setItem(key, JSON.stringify(value));
//   };
  
//   export const getFromLocalStorage = (key) => {
//     const item = localStorage.getItem(key);
//     return item ? JSON.parse(item) : null;
//   };



// LocalStorage functions (keep these as is)
export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

// IndexedDB functions for storing and retrieving messages
const dbName = 'chatAppDB';
const storeName = 'messages';

// Open IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onerror = (e) => reject(e);
    request.onsuccess = (e) => resolve(e.target.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

// Store messages in IndexedDB
export const storeMessagesInIndexedDB = async (messages) => {
  const db = await openDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  messages.forEach((msg) => store.add(msg)); // Store each message in the database
  await tx.complete;
};

// Fetch all messages from IndexedDB
export const fetchMessagesFromIndexedDB = async () => {
  const db = await openDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const allMessages = await store.getAll(); // Get all messages stored in IndexedDB
  return allMessages;
};
