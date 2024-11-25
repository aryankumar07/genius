import { PrismaClient } from '@prisma/client'

declare global {
  /* eslint-disable no-var */
  var prisma: PrismaClient | undefined;
  /* eslint-disable no-var */
}

const prismadb = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV!='production') globalThis.prisma = prismadb;

export default prismadb