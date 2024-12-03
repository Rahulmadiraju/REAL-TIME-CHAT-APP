// import { Strapi } from '@strapi/strapi';
// import { Server } from 'socket.io';

// export default ({ strapi }: { strapi: Strapi }) => {
//   const io = new Server(strapi.server.httpServer, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["my-custom-header"],
//       credentials: true
//     }
//   });

//   io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('chat message', (msg) => {
//       console.log('Message received:', msg);
//       io.emit('chat message', msg);
//     });

//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });

//   strapi.io = io;
// };





import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

export default ({ strapi }: { strapi: any }) => {
  const io = new Server(strapi.server.httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

  io.use((socket: any, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(socket.handshake.query.token as string, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) return next(new Error('Authentication error'));
        socket.data.decoded = decoded;
        next();
      });
    } else {
      next(new Error('Authentication error'));
    }
  }).on('connection', (socket: any) => {
    console.log('A user connected');

    socket.on('chat message', async (msg: string) => {
      console.log('Message received:', msg);
      try {
        const message = await strapi.entityService.create('api::message.message', {
          data: {
            content: msg,
            sender: socket.data.decoded.id,
          },
        });
        io.emit('chat message', message);
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('error', 'Failed to save message');
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  (strapi as any).io = io;
};