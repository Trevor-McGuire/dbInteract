const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");
const db = require("./config/connection");
const sessionMiddleware = require("./middleware/sessionMiddleware");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return new Promise((resolve, reject) => {
      sessionMiddleware(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ req, res });
        }
      });
    });
  },
});

const startApolloServer = async () => {
  try {
    await server.start();
    console.log("Apollo Server started successfully.");
    server.applyMiddleware({ app, path: "/graphql" });
  } catch (error) {
    console.error("Error starting Apollo Server:", error);
  }

  const configureMiddleware = () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
  };

  configureMiddleware();

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
