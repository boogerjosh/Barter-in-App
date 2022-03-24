import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //ganti ngrok
  uri: "http://2462-110-138-86-180.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
