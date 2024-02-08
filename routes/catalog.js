const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const partController = require('../controllers/partController')

router.get('/', categoryController.index)

router.get('/categories', categoryController.category_list)

router.get('/category/:id', categoryController.category_detail)

router.get('/parts', partController.part_list)

module.exports = router
