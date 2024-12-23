const links = (parent, args, context) => {
  const { id } = parent;
  return context.prisma.user.findUnique({ where: { id } }).links();
};

const votes = (parent, args, context) => {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).votes();
}

module.exports = {
  links,
  votes,
};
