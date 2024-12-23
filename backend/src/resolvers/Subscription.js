const { subscribe } = require("graphql");

const newLinkSubscribe = (parent, args, context, info) => {
  return context.pubsub.asyncIterator("NEW_LINK");
};

const newLink = {
  subscribe: newLinkSubscribe, // subscribe to the NEW_LINK channel
  resolve: (payload) => {
    // return payload when NEW_LINK event is triggered
    return payload;
  },
};

const newVoteSubscribe = (parent, args, context, info) => {
  return context.pubsub.asyncIterator("NEW_VOTE");
};

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload) => payload,
};

module.exports = {
  newLink,
  newVote,
};
