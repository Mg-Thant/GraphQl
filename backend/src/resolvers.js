const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: () => async (parent, args, context) => context.prisma.link.findMany(),
  },
  Mutation: {
    post: (parent, args, context) => {
      const { url, description } = args;
      const newLink = context.prisma.link.create({
        data: {
          url,
          description,
        },
      });
      return newLink;
    },
  },
};

module.exports = resolvers;
