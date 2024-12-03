// export default ({ env }) => ({
//   auth: {
//     secret: env('ADMIN_JWT_SECRET'),
//   },
//   apiToken: {
//     salt: env('API_TOKEN_SALT'),
//   },
//   transfer: {
//     token: {
//       salt: env('TRANSFER_TOKEN_SALT'),
//     },
//   },
//   flags: {
//     nps: env.bool('FLAG_NPS', true),
//     promoteEE: env.bool('FLAG_PROMOTE_EE', true),
//   },
// });





export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'Qz7ggXJa1GuztCswXdBu3w=='),  // Use the generated secret
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'H2IHvnFI85xhWQFW/S6MRQ=='), // Use your generated salt
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', '02MCKOn5wHz15rrnh5TGog=='),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
