require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const itemSchema = require("./schema/itemSchema");
const adminSchema = require("./schema/adminSchema");

const server = new ApolloServer({
  typeDefs: [itemSchema.typeDefs, adminSchema.typeDefs],
  resolvers: [itemSchema.resolvers, adminSchema.resolvers],
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
