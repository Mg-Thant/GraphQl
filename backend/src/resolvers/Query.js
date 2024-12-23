function feed(parent, args, context) {
  return context.prisma.link.findMany();
}

const feedByCurrentUserId = (parent, args, context) => {
  const { userId } = context;
  return context.prisma.user.findUnique({ where: { id: userId } }).links();
};

module.exports = {
  feed,
  feedByCurrentUserId,
};
