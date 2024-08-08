const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

async function createRefreshToken(token, userId) {
  try {
    await prisma.refreshToken.create({
      data: {
        token,
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findRefreshToken(token) {
  try {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: { token },
    });

    return refreshToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createComment(content, postId, authorId) {
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
      },
      include: {
        author: true,
      },
    });
    return comment;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createUser,
  findUser,
  createRefreshToken,
  findRefreshToken,
  findPosts,
  createComment,
};
