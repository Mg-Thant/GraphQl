const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../utils");

const post = (parent, args, context) => {
  const { userId } = context;
  const { url, description } = args;
  const newLink = context.prisma.link.create({
    data: {
      url,
      description,
      postedBy: { connect: { id: userId } }, // connect the new link with the user
    },
  });

  context.pubsub.publish("NEW_LINK", newLink);

  return newLink;
};

const signup = async (parent, args, context) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const login = async (parent, args, context) => {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    throw new Error("Invalid user credentials");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const vote = async (parent, args, context, info) => {
    const userId = context.userId;

    const vote = await context.prisma.vote.findUnique({
        where: {
            linkId_userId: {
                linId: Number(args.linkId),
                userId: userId
            }
        }
    });

    if(Boolean(vote)) {
        throw new Error(`Already voted for link: ${args.linId}`);
    }

    const newVote = context.prisma.vote.create({
        data: {
            user: { connect: {id: userId}},
            link: { connect: {id: Number(args.linkId)}},
        }
    })

    context.pubsub.publish("NEW_VOTE", newVote);

    return newVote;
}

module.exports = {
  post,
  login,
  signup,
  vote,
};