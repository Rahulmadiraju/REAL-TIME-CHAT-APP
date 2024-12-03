export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),  // Allow Strapi to bind to all network interfaces
  port: env.int('PORT', 1337),   // Use the PORT provided by Render (default to 1337)
  app: {
    keys: env.array('APP_KEYS', [
      'ArdOVA0KBz81QkV3X6bFnhaayLcdLYP09hn1aNFiH0k=',
      'BCF6UO77QQ5UxI4qXDVUROfZ5F49p3q3uJ7EX+gebBo=',
    ]),
  },
  url: env('PUBLIC_URL', 'https://real-time-chat-app-chat-backend.onrender.com'),  // Set the correct URL for production
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  cors: {
    origin: [
      'http://localhost:3000', // Allow localhost for local testing
      'https://your-frontend-url.netlify.app', // Allow the deployed frontend URL
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    keepHeaderOnError: true,
  },
});
