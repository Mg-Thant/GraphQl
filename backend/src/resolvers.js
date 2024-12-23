const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Subscription = require("./resolvers/Subscription");

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Subscription,
};

module.exports = resolvers;
