import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //ganti ngrok
  uri: "https://05b4-2001-448a-1061-10b7-285f-c077-289f-3835.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
