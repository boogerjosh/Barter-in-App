require("dotenv").config();
const { ApolloServer } = require('apollo-server');
const movieSchema = require('./schema/itemSchema')

const server = new ApolloServer({
    typeDefs: [movieSchema.typeDefs],
    resolvers: [movieSchema.resolvers]
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});