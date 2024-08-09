const database = require("../models/database");

async function handleIndexGet(req, res) {
  try {
    const posts = await database.findPublishedPosts();
    if (req.user) {
      const { id, firstName, lastName, username } = req.user;
      res.json({ user: { id, firstName, lastName, username }, posts });
    } else {
      res.json({ user: null, posts });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function handleCommentPost(req, res) {
  const { postId } = req.params;
  const { content, authorId } = req.body;

  try {
    const comment = await database.createComment(content, postId, authorId);
    res.json({ comment });
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
}

module.exports = {
  handleIndexGet,
  handleCommentPost,
};
