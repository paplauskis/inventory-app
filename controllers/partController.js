const Part = require('../models/part')
const Category = require('../models/category')
const asyncHandler = require('express-async-handler')

exports.part_list = asyncHandler(async (req, res, next) => {
  const allParts = await Part.find({})
    .populate('category')
    .sort({ name: 1 })
    .exec()

  res.render('part_list', {
    title: 'List of all parts available',
    part_list: allParts,
  })
})
