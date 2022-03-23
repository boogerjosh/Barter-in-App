import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //ganti ngrok
  uri: "http://e798-125-160-231-174.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
