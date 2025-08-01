export const resolvers = {
  Query: {
    getTasks: async (_, __, { prisma }) => {
      return await prisma.task.findMany();
    },
  },
  Mutation: {
    createTask: async (_, args, { prisma }) => {
      const { name, title, description } = args;
      return await prisma.task.create({
        data: { name, title, description },
      });
    },
    updateTask: async (_, args, { prisma }) => {
      const { id, ...updates } = args;
      return await prisma.task.update({
        where: { id },
        data: updates,
      });
    },
    deleteTask: async (_, { id }, { prisma }) => {
      return await prisma.task.delete({ where: { id } });
    },
  },
};
