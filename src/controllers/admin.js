const database = require("../models/database");

async function handleIndexGet(req, res) {
  try {
    const posts = database.findAllPosts();
    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

module.exports = {
  handleIndexGet,
};
