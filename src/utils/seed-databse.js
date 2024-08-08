const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();
const NUMBER_OF_POSTS = 25;

async function main() {
  // Create some posts for the admin user
  for (let i = 0; i < NUMBER_OF_POSTS; i++) {
    await prisma.post.create({
      data: {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs({ min: 5, max: 7 }),
        authorId: "3519e331-3f78-4e80-8b79-22e5b6c3dd5e",
        published: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
  }

  console.log("Seeding completed");
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
