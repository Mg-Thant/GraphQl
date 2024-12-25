async function feed(parent, args, context) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
  });

  return links;
}

const feedByCurrentUserId = (parent, args, context) => {
  const { userId } = context;
  return context.prisma.user.findUnique({ where: { id: userId } }).links();
};

module.exports = {
  feed,
  feedByCurrentUserId,
};
