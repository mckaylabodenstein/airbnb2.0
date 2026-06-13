require("dotenv").config()

const mongoose = require("mongoose")
const Accommodation = require("./models/Accommodation")

const accommodations = [
  {
    title: "Modern Apartment in Cape Town",
    location: "Cape Town, Western Cape",
    type: "Entire apartment",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    price: 1450,
    rating: 4.9,
    reviews: 128,
    host: "Anele",
    description:
      "A modern apartment close to the city centre, perfect for a small family or friends visiting Cape Town.",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Wifi", "Kitchen", "Free parking", "Air conditioning"],
    weeklyDiscount: 300,
    cleaningFee: 350,
    serviceFee: 420,
    occupancyTaxes: 180
  },
  {
    title: "Beach House in Ballito",
    location: "Ballito, KwaZulu-Natal",
    type: "Entire home",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    price: 2100,
    rating: 4.8,
    reviews: 94,
    host: "Thabo",
    description:
      "A relaxed beach house near the coast, ideal for a family holiday or weekend getaway.",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Wifi", "Pool", "Braai area", "Free parking"],
    weeklyDiscount: 450,
    cleaningFee: 400,
    serviceFee: 500,
    occupancyTaxes: 220
  },
  {
    title: "Sandton",
    location: "Sandton, Gauteng",
    type: "Private apartment",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 1250,
    rating: 4.7,
    reviews: 76,
    host: "Lerato",
    description:
      "A stunning apartment in Sandton, close to restaurants, shopping centres and business areas.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Wifi", "Gym access", "Secure parking", "Workspace"],
    weeklyDiscount: 250,
    cleaningFee: 300,
    serviceFee: 380,
    occupancyTaxes: 160
  },
  {
    title: "Safari Lodge near Kruger",
    location: "Hazyview, Mpumalanga",
    type: "Lodge room",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    price: 1800,
    rating: 4.9,
    reviews: 143,
    host: "Mandla",
    description:
      "A peaceful lodge, close to Kruger National Park, perfect for nature lovers and families.",
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Wifi", "Pool", "Breakfast included", "Free parking"],
    weeklyDiscount: 500,
    cleaningFee: 380,
    serviceFee: 480,
    occupancyTaxes: 200
  },
  {
    title: "Cosy Cottage in Clarens",
    location: "Clarens, Free State",
    type: "Entire cottage",
    guests: 5,
    bedrooms: 2,
    bathrooms: 1,
    price: 980,
    rating: 4.6,
    reviews: 61,
    host: "Mariska",
    description:
      "A warm cottage in the mountains.",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Fireplace", "Kitchen", "Free parking", "Mountain view"],
    weeklyDiscount: 200,
    cleaningFee: 250,
    serviceFee: 300,
    occupancyTaxes: 120
  },
  {
    title: "Garden Route Family Home",
    location: "Knysna, Western Cape",
    type: "Entire home",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    price: 2400,
    rating: 4.8,
    reviews: 112,
    host: "Johan",
    description:
      "A spacious family home near the Garden Route, with enough space for a relaxing holiday.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Wifi", "Kitchen", "Braai area", "Free parking"],
    weeklyDiscount: 600,
    cleaningFee: 450,
    serviceFee: 550,
    occupancyTaxes: 250
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    await Accommodation.deleteMany({})
    await Accommodation.insertMany(accommodations)

    console.log("South African accommodations added successfully")
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

seedDatabase()