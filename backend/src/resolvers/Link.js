const postedBy = async (parent, args, context) => {
  const { id } = parent;
  return context.prisma.link.findUnique({ where: { id } }).postedBy();
};

const votes = (parent, args, context) => {
    return context.prisma.link.findUnique({ where: { id: parent.id } }).votes();
}

module.exports = {
  postedBy,
  votes,
};
