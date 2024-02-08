const Category = require('../models/category')
const Part = require('../models/part')
const asyncHandler = require('express-async-handler')

exports.index = asyncHandler(async (req, res, next) => {
  const [numCategories, numParts] = await Promise.all([
    Category.countDocuments({}).exec(),
    Part.countDocuments({}).exec()
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
