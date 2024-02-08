const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const partController = require('../controllers/partController')

router.get('/', categoryController.index)

router.get('/category/create', categoryController.category_create_get)

router.post('/category/create', categoryController.category_create_post)

router.get('/category/:id/delete', categoryController.category_delete_get)

router.post('/category/:id/delete', categoryController.category_delete_post)

router.get('/category/:id/update', categoryController.category_update_get)

router.post('/category/:id/update', categoryController.category_update_post)

router.get('/categories', categoryController.category_list)

router.get('/category/:id', categoryController.category_detail)

router.get('/part/create', partController.part_create_get)

router.post('/part/create', partController.part_create_post)

router.get('/parts', partController.part_list)

module.exports = router
