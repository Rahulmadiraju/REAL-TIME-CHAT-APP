const crypto = require('crypto');
const generateKey = () => crypto.randomBytes(32).toString('base64');
console.log(generateKey());
