import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //ganti ngrok
  uri: "https://27f0-2001-448a-1061-10b7-d4bd-4374-d35a-f466.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
