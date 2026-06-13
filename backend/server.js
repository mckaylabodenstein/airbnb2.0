require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

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

app.get("/api/health", (req, res) => {
  res.json({ message: "Airbnb Capstone API is running" })
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Airbnb Capstone API is running" })
  })
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 4000

    app.listen(port, () => {
      console.log("connected to db and listening on port", port)
    })
  })
  .catch((error) => {
    console.log(error)
  })