const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const AUTHOR_ID = "3519e331-3f78-4e80-8b79-22e5b6c3dd5e";

async function main() {
  console.log("Seeding users...");
  // Create users
  const users = [];
  for (let i = 0; i < 100; i++) {
    const hashedPassword = await bcrypt.hash("password", 10);
    const user = await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.userName(),
        password: hashedPassword,
      },
    });
    users.push(user);
  }
  console.log("Users seeded successfully.");

  console.log("Seeding posts and comments...");
  // Create posts
  for (let i = 0; i < 50; i++) {
    const published = faker.datatype.boolean();
    const post = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs({ min: 3, max: 5 }),
        authorId: AUTHOR_ID,
        published: published,
        updatedAt: faker.datatype.boolean()
          ? faker.date.recent()
          : faker.date.past(),
      },
    });

    // Create comments for the post only if published
    if (published) {
      const numberOfComments = faker.number.int({ min: 10, max: 30 });
      for (let j = 0; j < numberOfComments; j++) {
        const randomUser =
          users[faker.number.int({ min: 0, max: users.length - 1 })];
        await prisma.comment.create({
          data: {
            content: faker.lorem.sentences(2),
            postId: post.id,
            authorId: randomUser.id,
            updatedAt: faker.datatype.boolean()
              ? faker.date.recent()
              : faker.date.past(),
          },
        });
      }
    }
  }
  console.log("Posts and comments seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
