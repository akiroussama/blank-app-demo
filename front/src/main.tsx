import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

// new instance of ApolloClient:
const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});

// Wrap the App component with the ApolloProvider component and pass the client prop to it:
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  </React.StrictMode>
)
