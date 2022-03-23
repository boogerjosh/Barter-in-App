import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //ganti ngrok
  uri: "https://p3-challenge-2-orchestrator.herokuapp.com",
  cache: new InMemoryCache(),
});

export default client;
