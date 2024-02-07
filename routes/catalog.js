const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.index)

router.get('/categories', categoryController.category_list)

module.exports = router
