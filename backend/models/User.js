require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const accommodationRoutes = require("./routes/accommodations")
const reservationRoutes = require("./routes/reservations")
const userRoutes = require("./routes/user")

const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use("/api/accommodations", accommodationRoutes)
app.use("/api/reservations", reservationRoutes)
app.use("/api/user", userRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Airbnb Capstone API is running" })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })