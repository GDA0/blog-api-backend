const database = require('../models/database')

async function handleIndexGet (req, res) {
  try {
    const posts = await database.findAllPosts()
    res.json({ posts })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

async function handleIndexPut (req, res) {
  const { postId } = req.params
  const { title, content } = req.body
  try {
    const updatedPost = await database.updatePost(postId, title, content)

    res.json({ updatedPost })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

module.exports = {
  handleIndexGet,
  handleIndexPut
}
