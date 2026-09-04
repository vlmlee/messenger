import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: `https://messenger-7ixq.onrender.com/graphql`,
    cache: new InMemoryCache()
});

createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
