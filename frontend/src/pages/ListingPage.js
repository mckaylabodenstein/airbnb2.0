import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const ListingPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const [accommodation, setAccommodation] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAccommodation = async () => {
      const response = await fetch("/api/accommodations/" + id)
      const json = await response.json()

      if (response.ok) {
        setAccommodation(json)
      }
    }

    fetchAccommodation()
  }, [id])

  if (!accommodation) {
    return <p>Loading...</p>
  }

  const mainImage =
    accommodation.image ||
    accommodation.imageUrl ||
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"

  const galleryImages = [
    mainImage,
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
  ]

  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
  }

  const getNights = () => {
    if (!checkIn || !checkOut) {
      return 1
    }

    const startDate = new Date(checkIn)
    const endDate = new Date(checkOut)
    const difference = endDate - startDate
    const nights = difference / (1000 * 60 * 60 * 24)

    if (nights <= 0) {
      return 1
    }

    return nights
  }

  const nights = getNights()
  const stayTotal = accommodation.price * nights
  const cleaningFee = 250
  const serviceFee = 180
  const total = stayTotal + cleaningFee + serviceFee

  const handleReserve = async (e) => {
    e.preventDefault()

    if (!user) {
      navigate("/login")
      return
    }

    if (!name || !email || !checkIn || !checkOut || !guests) {
      setError("Please fill in all the fields")
      setMessage("")
      return
    }

    const reservation = {
      name,
      email,
      accommodationId: accommodation._id,
      accommodationTitle: accommodation.title,
      checkIn,
      checkOut,
      guests
    }

    const response = await fetch("/api/reservations", {
      method: "POST",
      body: JSON.stringify(reservation),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setMessage("")
    }

    if (response.ok) {
      setName("")
      setEmail("")
      setCheckIn("")
      setCheckOut("")
      setGuests("")
      setError(null)
      setMessage("Reservation created successfully")
    }
  }

  return (
    <div className="listing-page">
      <header className="listing-top-nav">
        <Link to="/" className="listing-logo">
          <span className="airbnb-logo-icon">⌂</span>
          <span>airbnb</span>
        </Link>

        <div className="listing-search-pill">
          <span>Start your search</span>
          <button onClick={() => navigate("/")}>🔍</button>
        </div>

        <div className="listing-nav-right">
          <Link to="/admin/create">Become a Host</Link>
          <span>🌐</span>
          <button>☰ 👤</button>
        </div>
      </header>

      <main className="listing-container">
        <section className="listing-heading">
          <h1>{accommodation.title}</h1>

          <div className="listing-subtitle">
            <span>★ 4.8</span>
            <span>·</span>
            <span>72 reviews</span>
            <span>·</span>
            <span>Superhost</span>
            <span>·</span>
            <span>{accommodation.location}</span>
          </div>
        </section>

        <section className="photo-gallery">
          <img
            src={galleryImages[0]}
            alt={accommodation.title}
            className="main-photo"
            onError={handleImageError}
          />

          <img
            src={galleryImages[1]}
            alt="Kitchen"
            onError={handleImageError}
          />

          <img
            src={galleryImages[2]}
            alt="Bedroom"
            onError={handleImageError}
          />

          <img
            src={galleryImages[3]}
            alt="Bathroom"
            onError={handleImageError}
          />

          <div className="photo-box">
            <img
              src={galleryImages[4]}
              alt="Property view"
              onError={handleImageError}
            />

            <button>Show all photos</button>
          </div>
        </section>

        <section className="listing-body">
          <div className="listing-left">
            <div className="host-row">
              <div>
                <h2>{accommodation.type} hosted by Airbnb Host</h2>
                <p>
                  {accommodation.guests} guests · 2 bedrooms · 2 beds · 1 bath
                </p>
              </div>

              <div className="host-avatar">AH</div>
            </div>

            <div className="feature-list">
              <div className="feature-item">
                <span className="line-icon">⌂</span>
                <div>
                  <h4>Entire place</h4>
                  <p>You’ll have the accommodation to yourself.</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="line-icon">✓</span>
                <div>
                  <h4>Enhanced Clean</h4>
                  <p>This host follows Airbnb’s cleaning process.</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="line-icon">⌕</span>
                <div>
                  <h4>Self check-in</h4>
                  <p>Check yourself in when you arrive.</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="line-icon">□</span>
                <div>
                  <h4>Free cancellation</h4>
                  <p>Cancel before your check-in date.</p>
                </div>
              </div>
            </div>

            <div className="description-section">
              <p>{accommodation.description}</p>
              <button>Show more</button>
            </div>

            <div className="sleep-section">
              <h2>Where you’ll sleep</h2>

              <div className="sleep-card">
                <img
                  src={galleryImages[2]}
                  alt="Bedroom"
                  onError={handleImageError}
                />
                <h4>Bedroom</h4>
                <p>1 queen bed</p>
              </div>
            </div>

            <div className="offers-section">
              <h2>What this place offers</h2>

              <div className="offers-grid">
                <p>
                  <span className="offer-icon">⌂</span> Garden view
                </p>
                <p>
                  <span className="offer-icon">□</span> Kitchen
                </p>
                <p>
                  <span className="offer-icon">⌁</span> Wifi
                </p>
                <p>
                  <span className="offer-icon">P</span> Free parking
                </p>
                <p>
                  <span className="offer-icon">▭</span> TV
                </p>
                <p>
                  <span className="offer-icon">◌</span> Air conditioning
                </p>
              </div>
            </div>

            <section className="reviews-section">
              <h2>★ 4.8 · 72 reviews</h2>

              <div className="reviews-grid">
                <div className="review-card">
                  <div className="review-user">
                    <div className="review-avatar">V</div>
                    <div>
                      <h4>Vladko</h4>
                      <p>November 2020</p>
                    </div>
                  </div>

                  <p>
                    This is an amazing place. It has everything you need for a
                    comfortable stay. Very clean and organised.
                  </p>
                </div>

                <div className="review-card">
                  <div className="review-user">
                    <div className="review-avatar">T</div>
                    <div>
                      <h4>Thandi</h4>
                      <p>January 2022</p>
                    </div>
                  </div>

                  <p>
                    A beautiful stay with friendly service. The place was neat,
                    peaceful and close to everything we needed.
                  </p>
                </div>
              </div>

              <button className="show-reviews-button">
                Show all 72 reviews
              </button>
            </section>

            <section className="host-section">
              <div className="host-profile">
                <div className="host-avatar-large">AH</div>
                <div>
                  <h2>Hosted by Airbnb Host</h2>
                  <p>Joined May 2021</p>
                  <p>★ 72 Reviews · Identity verified · Superhost</p>
                </div>
              </div>

              <h4>Airbnb Host is a Superhost</h4>
              <p>
                Superhosts are experienced, highly rated hosts who are
                committed to providing great stays for guests.
              </p>

              <p>Response rate: 100%</p>
              <p>Response time: within an hour</p>

              <button>Contact Host</button>
            </section>

            <section className="things-section">
              <h2>Things to know</h2>

              <div className="things-grid">
                <div>
                  <h4>House rules</h4>
                  <p>Check-in: After 4:00 PM</p>
                  <p>Checkout: 10:00 AM</p>
                  <p>Self check-in with lockbox</p>
                  <p>No smoking</p>
                  <p>No parties or events</p>
                </div>

                <div>
                  <h4>Health & safety</h4>
                  <p>Committed to enhanced cleaning.</p>
                  <p>Smoke alarm</p>
                  <p>Security deposit may apply.</p>
                  <p>Carbon monoxide alarm</p>
                </div>

                <div>
                  <h4>Cancellation policy</h4>
                  <p>Free cancellation before check-in.</p>
                  <p>Review the full policy before reserving.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="booking-card">
            <div className="booking-card-top">
              <h3>
                R{accommodation.price} <span>/ night</span>
              </h3>
              <p>★ 4.8 · 72 reviews</p>
            </div>

            <form className="booking-form" onSubmit={handleReserve}>
              <div className="booking-input full">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="booking-input full">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="booking-input">
                <label>Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div className="booking-input">
                <label>Checkout</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              <div className="booking-input full">
                <label>Guests</label>
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>

              <button>Reserve</button>

              {message && <p className="success-message">{message}</p>}
              {error && <p className="error-message">{error}</p>}
            </form>

            <p className="charge-note">You won’t be charged yet</p>

            <div className="price-breakdown">
              <p>
                <span>
                  R{accommodation.price} x {nights} nights
                </span>
                <span>R{stayTotal}</span>
              </p>

              <p>
                <span>Cleaning fee</span>
                <span>R{cleaningFee}</span>
              </p>

              <p>
                <span>Service fee</span>
                <span>R{serviceFee}</span>
              </p>

              <p className="total">
                <span>Total</span>
                <span>R{total}</span>
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  )
}

export default ListingPage