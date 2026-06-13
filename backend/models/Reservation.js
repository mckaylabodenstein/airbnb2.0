const mongoose = require("mongoose")

const Schema = mongoose.Schema

const reservationSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    accommodationId: {
      type: String,
      required: true
    },
    accommodationTitle: {
      type: String,
      required: true
    },
    checkIn: {
      type: String,
      required: true
    },
    checkOut: {
      type: String,
      required: true
    },
    guests: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Reservation", reservationSchema)