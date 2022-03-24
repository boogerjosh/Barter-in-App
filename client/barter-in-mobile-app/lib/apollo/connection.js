import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //ganti ngrok
  uri: "http://bc64-139-193-79-181.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
