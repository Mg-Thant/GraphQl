const post = (parent, args, context) => {
  const { url, description } = args;
  const newLink = context.prisma.link.create({
    data: {
      url,
      description,
    },
  });

  return newLink;
};

module.exports = {
  post,
};
