const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
const { getUserId } = require("./utils/auth");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  const configureMiddleware = () => {
    console.log("Configuring middleware...");
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: authMiddleware,
      })
    );
    console.log("Middleware configured.");
  };

  configureMiddleware();

  console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
  // if we're in production, serve frontend/dist as static assets
  if (process.env.NODE_ENV === "production") {
    console.log("__dirname:", __dirname);
    const clientDistPath = path.join(__dirname, "../frontend/dist");
    app.use(express.static(clientDistPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(clientDistPath, "index.html"));
    });
  }

  if (typeof db.on === "function") {
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    });
  } else {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  }
};

startApolloServer();
