const mongoose = require("mongoose")
const Accommodation = require("../models/Accommodation")

// get all accommodations
const getAccommodations = async (req, res) => {
  const accommodations = await Accommodation.find({}).sort({ createdAt: -1 })

  res.status(200).json(accommodations)
}

// get one accommodation
const getAccommodation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such accommodation" })
  }

  const accommodation = await Accommodation.findById(id)

  if (!accommodation) {
    return res.status(404).json({ error: "No such accommodation" })
  }

  res.status(200).json(accommodation)
}

// create accommodation
const createAccommodation = async (req, res) => {
  const {
    title,
    location,
    type,
    guests,
    bedrooms,
    bathrooms,
    price,
    rating,
    reviews,
    host,
    description,
    images,
    amenities,
    weeklyDiscount,
    cleaningFee,
    serviceFee,
    occupancyTaxes
  } = req.body

  let emptyFields = []

  if (!title) emptyFields.push("title")
  if (!location) emptyFields.push("location")
  if (!type) emptyFields.push("type")
  if (!guests) emptyFields.push("guests")
  if (!bedrooms) emptyFields.push("bedrooms")
  if (!bathrooms) emptyFields.push("bathrooms")
  if (!price) emptyFields.push("price")
  if (!rating) emptyFields.push("rating")
  if (!reviews) emptyFields.push("reviews")
  if (!host) emptyFields.push("host")
  if (!description) emptyFields.push("description")
  if (!images || images.length === 0) emptyFields.push("images")
  if (!amenities || amenities.length === 0) emptyFields.push("amenities")

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the fields",
      emptyFields
    })
  }

  try {
    const accommodation = await Accommodation.create({
      title,
      location,
      type,
      guests,
      bedrooms,
      bathrooms,
      price,
      rating,
      reviews,
      host,
      description,
      images,
      amenities,
      weeklyDiscount,
      cleaningFee,
      serviceFee,
      occupancyTaxes
    })

    res.status(200).json(accommodation)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete accommodation
const deleteAccommodation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such accommodation" })
  }

  const accommodation = await Accommodation.findOneAndDelete({ _id: id })

  if (!accommodation) {
    return res.status(404).json({ error: "No such accommodation" })
  }

  res.status(200).json(accommodation)
}

// update accommodation
const updateAccommodation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such accommodation" })
  }

  const accommodation = await Accommodation.findOneAndUpdate(
    { _id: id },
    {
      ...req.body
    },
    { new: true }
  )

  if (!accommodation) {
    return res.status(404).json({ error: "No such accommodation" })
  }

  res.status(200).json(accommodation)
}

module.exports = {
  getAccommodations,
  getAccommodation,
  createAccommodation,
  deleteAccommodation,
  updateAccommodation
}