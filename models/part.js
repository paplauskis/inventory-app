const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PartSchema = new Schema({
  name: { type: String, required: true },
  part_num: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, min: 0, required: true },
})

PartSchema.virtual('url').get(function () {
  return `/catalog/part/${this.id}`
})

module.exports = mongoose.model('Part', PartSchema)
