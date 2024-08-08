const database = require("../models/database");

async function handleIndexGet(req, res) {
  try {
    const posts = await database.findPosts();
    if (req.user) {
      const { firstName, lastName, username } = req.user;
      res.json({ user: { firstName, lastName, username }, posts });
    } else {
      res.json({ user: null, posts });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

module.exports = {
  handleIndexGet,
};
