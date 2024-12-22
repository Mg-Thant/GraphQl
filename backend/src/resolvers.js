let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQl",
  },
];

const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
        console.log(parent, args);

        let idCount = links.length;

        const link = {
            id: `Link-${idCount++}`,
            description: args.description,
            url: args.url,
        }
        links.push(link)
        return link;
    }
  }
};

module.exports = resolvers;
