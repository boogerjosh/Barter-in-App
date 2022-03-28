import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //ganti ngrok
  uri: "https://a993-2001-448a-106d-1070-85ce-2944-efaa-9402.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
