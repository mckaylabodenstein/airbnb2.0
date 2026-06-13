const express = require("express")
const {
  getAccommodations,
  getAccommodation,
  createAccommodation,
  deleteAccommodation,
  updateAccommodation
} = require("../controllers/accommodationController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.get("/", getAccommodations)

router.get("/:id", getAccommodation)

router.post("/", requireAuth, createAccommodation)

router.delete("/:id", requireAuth, deleteAccommodation)

router.patch("/:id", requireAuth, updateAccommodation)

module.exports = router