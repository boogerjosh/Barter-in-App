// require("dotenv").config();
// const { ApolloServer } = require('apollo-server');
const movieSchema = require('./schema/itemSchema')
// const {
//     GraphQLUpload,
//     graphqlUploadExpress, // A Koa implementation is also exported.
//   } = require('graphql-upload');



// const server = new ApolloServer({
    // typeDefs: [movieSchema.typeDefs],
    // resolvers: [movieSchema.resolvers]
// });

// server.use(graphqlUploadExpress());

// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
// });

//


const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
  graphqlUploadExpress,
} = require('graphql-upload');
const { finished } = require('stream/promises');
const adminSchema = require("./schema/adminSchema");
async function startServer() {
  const server = new ApolloServer({
    typeDefs: [movieSchema.typeDefs, adminSchema.typeDefs],
    resolvers: [movieSchema.resolvers, adminSchema.resolvers]
  });

  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise(r => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();

