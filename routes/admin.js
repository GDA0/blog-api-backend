const express = require('express')

const adminController = require('../src/controllers/admin')

const router = express.Router()

router.get('/', adminController.handleIndexGet)

router.put('/:postId', adminController.handleIndexPut)

module.exports = router
