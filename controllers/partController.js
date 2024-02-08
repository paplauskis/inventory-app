const Part = require('../models/part')
const Category = require('../models/category')
const asyncHandler = require('express-async-handler')
const { query, validationResult } = require('express-validator')

exports.part_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}).sort({ name: 1 }).exec()
  res.render('part_form', {
    title: 'Create new part',
    categories: allCategories,
    button_text: 'Submit'
  })
})

exports.part_create_post = [
  query('part_name').trim().escape(),
  query('part_number').trim().escape(),
  query('part_category').trim().escape(),
  query('part_price').trim().escape(),
  query('part_quantity').trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    const part = new Part({
      name: req.body.part_name,
      part_num: req.body.part_number,
      category: req.body.part_category,
      price: req.body.part_price,
      quantity: req.body.part_quantity,
    })

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create new part',
        errors: errors.array(),
      })
    } else {
      await part.save()
      res.redirect('/catalog/parts')
    }
  }),
]

exports.part_delete_get = asyncHandler(async (req, res, next) => {
  const part = await Part.findById(req.params.id)

  res.render('part_delete', {
    title: `Delete ${part.name}`,
    part: part,
  })
})

exports.part_delete_post = asyncHandler(async (req, res, next) => {
  const part = await Part.findById(req.params.id)
  if (part) {
    await Part.findByIdAndDelete(part._id)
    res.redirect('/catalog/categories')
  } else {
    const error = new Error('Part cannot be found')
    error.status(404)
    next(error)
  }
})

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
