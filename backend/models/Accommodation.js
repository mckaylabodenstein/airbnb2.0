const mongoose = require("mongoose")

const Schema = mongoose.Schema

const accommodationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  reviews: {
    type: Number,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  amenities: {
    type: [String],
    required: true
  },
  weeklyDiscount: {
    type: Number,
    default: 0
  },
  cleaningFee: {
    type: Number,
    default: 0
  },
  serviceFee: {
    type: Number,
    default: 0
  },
  occupancyTaxes: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

module.exports = mongoose.model("Accommodation", accommodationSchema)