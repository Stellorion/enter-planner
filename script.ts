import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'natan',
      email: 'natan@prisma.io',
      password: '123',
      lastName: 'ascasc',
    },
  });
  const test = await prisma.user.findMany();
  console.log(test);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
