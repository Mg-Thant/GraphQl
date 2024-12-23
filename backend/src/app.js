const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const { PubSub } = require("apollo-server");
const path = require("path");
const fs = require("fs");

const resolvers = require("./resolvers");
const { getUserId } = require("./utils");

const pubsub = new PubSub();

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
