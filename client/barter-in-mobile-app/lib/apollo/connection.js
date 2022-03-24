import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //ganti ngrok
  uri: "https://1414-2001-448a-1061-10b7-19a9-7805-9f3a-2aef.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
