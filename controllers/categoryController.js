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
  const allCategories = await Category.find().exec()
  res.render('category_list', {
    title: 'List of all the categories',
    category_list: allCategories
  })
})