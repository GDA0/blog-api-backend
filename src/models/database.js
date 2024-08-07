const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkUsernameExists(username) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user !== null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createUser(firstName, lastName, username, password) {
  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        password,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findUser(method, value) {
  try {
    let user;
    if (method === "username") {
      user = await prisma.user.findUnique({
        where: { username: value },
      });
    } else if (method === "id") {
      user = await prisma.user.findUnique({
        where: { id: value },
      });
    } else {
      throw new Error('Invalid method. Use "username" or "id".');
    }
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  checkUsernameExists,
  createUser,
  findUser,
};
