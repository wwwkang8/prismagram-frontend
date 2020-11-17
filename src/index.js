import React from 'react';
import ReactDOM from 'react-dom';
import App from './Component/App';
import {ApolloProvider} from "react-apollo-hooks";
import Client from "./Apollo/Client";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={Client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

