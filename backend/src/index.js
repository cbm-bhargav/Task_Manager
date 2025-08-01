import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import cors from 'cors';
import { resolvers } from './resolvers.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(cors());

const typeDefs = readFileSync('./src/schema.graphql', 'utf8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
});

await server.start();
server.applyMiddleware({ app });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
