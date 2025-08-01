// src/lib/graphqlClient.js
import { GraphQLClient } from 'graphql-request';

export const graphQLClient = new GraphQLClient('http://localhost:4000/graphql'); // Adjust your endpoint
