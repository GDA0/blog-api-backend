const express = require('express')

const authenticate = require('../src/middlewares/authenticate')
const indexController = require('../src/controllers/index')

const router = express.Router()

router.get('/', authenticate, indexController.handleIndexGet)
router.post(
  '/:postId/comments',
  authenticate,
  indexController.handleCommentPost
)

module.exports = router
