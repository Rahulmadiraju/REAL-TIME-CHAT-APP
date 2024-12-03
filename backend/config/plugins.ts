export default () => ({
    'users-permissions': {
      config: {
        jwtSecret: process.env.JWT_SECRET || 'ZOn3R2enJyLoVjly45yIyw==',  // Use your generated JWT secret
      },
    },
  });
  