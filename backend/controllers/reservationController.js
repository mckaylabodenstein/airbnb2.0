const Reservation = require("../models/Reservation")

const getReservations = async (req, res) => {
  const reservations = await Reservation.find({}).sort({ createdAt: -1 })

  res.status(200).json(reservations)
}

const createReservation = async (req, res) => {
  const {
    name,
    email,
    accommodationId,
    accommodationTitle,
    checkIn,
    checkOut,
    guests
  } = req.body

  try {
    if (
      !name ||
      !email ||
      !accommodationId ||
      !accommodationTitle ||
      !checkIn ||
      !checkOut ||
      !guests
    ) {
      return res.status(400).json({ error: "Please fill in all the fields" })
    }

    const reservation = await Reservation.create({
      name,
      email,
      accommodationId,
      accommodationTitle,
      checkIn,
      checkOut,
      guests
    })

    res.status(200).json(reservation)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getReservations,
  createReservation
}