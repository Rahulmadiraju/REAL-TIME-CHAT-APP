// // export default ({ env }) => ({
// //   host: env('HOST', '0.0.0.0'),
// //   port: env.int('PORT', 1337),
// //   app: {
// //     keys: env.array('APP_KEYS'),
// //   },
// // });



// export default ({ env }) => ({
//   host: env('HOST', '0.0.0.0'),
//   port: env.int('PORT', 1337),
//   app: {
//     keys: env.array('APP_KEYS'),
//   },
//   url: env('PUBLIC_URL', 'http://localhost:1337'),
//   webhooks: {
//     populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
//   },
//   cors: {
//     origin: ['http://localhost:3000'],
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
//     headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
//     keepHeaderOnError: true,
//   },
// });


export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', [
      'ArdOVA0KBz81QkV3X6bFnhaayLcdLYP09hn1aNFiH0k=',
      'BCF6UO77QQ5UxI4qXDVUROfZ5F49p3q3uJ7EX+gebBo=',
    ]),
  },
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    keepHeaderOnError: true,
  },
});
