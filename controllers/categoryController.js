const Category = require('../models/category')
const Part = require('../models/part')
const asyncHandler = require('express-async-handler')
const { query, validationResult } = require('express-validator')

exports.index = asyncHandler(async (req, res, next) => {
  const [numCategories, numParts] = await Promise.all([
    Category.countDocuments({}).exec(),
    Part.countDocuments({}).exec(),
  ])

  res.render('index', {
    title: 'Home',
    category_count: numCategories,
    part_count: numParts,
  })
})

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec()
  res.render('category_list', {
    title: 'List of all the categories',
    category_list: allCategories,
  })
})

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, partsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Part.find({ category: req.params.id }).sort({ name: 1 }).exec(),
  ])
  res.render('category_detail', {
    title: `${category.name} parts`,
    parts: partsInCategory,
  })
})

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', {
    title: 'Create new category',
  })
})

exports.category_create_post = [
  query('category_name')
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Name cannot be that short'),
  query('category_description')
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage('Description is too short to describe anything'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    const category = new Category({
      name: req.body.category_name,
      description: req.body.category_description,
    })

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create new category',
        errors: errors.array(),
      })
      return
    } else {
      await category.save()
      res.redirect(category.url)
    }
  }),
]

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [partsInCategory, category] = await Promise.all([
    Part.find({ category: req.params.id }).exec(),
    Category.findById(req.params.id),
  ])
  res.render('category_delete', {
    title: 'category',
    parts: partsInCategory,
    category: category,
  })
})

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    await Part.find({ category: category._id }).deleteMany()
    await Category.findByIdAndDelete(category._id)
    res.redirect('/catalog/categories')
  } else {
    const error = new Error('Category cannot be found')
    error.status(404)
    next(error)
  }
})
