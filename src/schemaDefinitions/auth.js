const gql = require("graphql-tag");

const typeDef = gql`
  type User {
    id: Int!
    roleId: Int!
    email: String!
    teacher: Teacher
  }

  type AuthPayload {
    token: String
    user: User
  }

  extend type Mutation {
    signup(login: String!, password: String!, roleId: Int!): AuthPayload
    signin(login: String!, password: String!): AuthPayload
  }
`;

const resolvers = {
  signup: async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.user.create({
      data: { ...args, password },
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
  signin: async (parent, args, context, info) => {
    const user = await context.prisma.user.findUnique({
      where: { login: args.login },
      include: {
        teacher: {
          include: {
            relations: {
              distinct: ["courseId"],
              select: {
                course: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new Error("No such user found");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
};

module.exports(typeDef, resolvers);
