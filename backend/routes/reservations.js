const express = require("express")

const {
  getReservations,
  createReservation
} = require("../controllers/reservationController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.get("/", requireAuth, getReservations)

router.post("/", requireAuth, createReservation)

module.exports = router