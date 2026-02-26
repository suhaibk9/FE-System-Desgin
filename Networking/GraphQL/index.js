import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

const app = express();

app.use("/graphql", cors(), express.json(), expressMiddleware(server));

app.listen(4000, () => {
  console.log("🚀 Server ready at http://localhost:4000/graphql");
});

//List of Books
//List of Author
//List of Books with Author Details
//List of Author with Books Details
