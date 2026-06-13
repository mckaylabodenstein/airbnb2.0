import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const [accommodations, setAccommodations] = useState([])
  const [searchLocation, setSearchLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("")

  useEffect(() => {
    const fetchAccommodations = async () => {
      const response = await fetch("http://localhost:4000/api/accommodations")
      const json = await response.json()

      if (response.ok) {
        setAccommodations(json)
      }
    }

    fetchAccommodations()
  }, [])

  const handleSearch = () => {
    if (searchLocation.trim()) {
      navigate(`/locations/${searchLocation}`)
    } else {
      navigate("/locations/Cape Town")
    }
  }

  const handleLogout = () => {
    logout()
  }

  const getListingImage = (accommodation) => {
    if (accommodation.title === "Modern Apartment in Cape Town") {
      return "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80"
    }

    return (
      accommodation.image ||
      accommodation.imageUrl ||
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
    )
  }

  return (
    <div className="home-page">
      <section className="home-hero">
        <header className="hero-header">
          <Link to="/" className="logo">
            airbnb
          </Link>

          <nav>
            <span>Places to stay</span>
            <span>Experiences</span>
            <span>Online Experiences</span>
          </nav>

          <div className="profile-area">
            <Link to="/admin/create" className="host-link">
              Become a Host
            </Link>

            {user && (
              <div className="user-menu">
                <span>{user.email}</span>
                <button onClick={handleLogout}>Log out</button>
              </div>
            )}

            {!user && (
              <div className="auth-links">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}

            <button className="profile-button">☰ 👤</button>
          </div>
        </header>

        <div className="search-bar">
          <div>
            <strong>Location</strong>
            <input
              type="text"
              placeholder="Where are you going?"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>

          <div>
            <strong>Check in</strong>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div>
            <strong>Check out</strong>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div>
            <strong>Guests</strong>
            <input
              type="number"
              placeholder="Add guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

          <button className="search-button" onClick={handleSearch}>
            🔍
          </button>
        </div>

        <div className="hero-image">
          <h1>Not sure where to go? Perfect.</h1>
          <button onClick={() => navigate("/locations/Cape Town")}>
            I'm flexible
          </button>
        </div>
      </section>

      <main className="home-content">
        <h2>Explore nearby</h2>

        <section className="city-cards">
          <Link to="/locations/Clarens" className="city-card">
            <div className="city-img city-one"></div>
            <div>
              <h3>Clarens</h3>
              <p>Free State</p>
            </div>
          </Link>

          <Link to="/locations/Knysna" className="city-card">
            <div className="city-img city-two"></div>
            <div>
              <h3>Knysna</h3>
              <p>Western Cape</p>
            </div>
          </Link>

          <Link to="/locations/Durban" className="city-card">
            <div className="city-img city-three"></div>
            <div>
              <h3>Durban</h3>
              <p>KwaZulu-Natal</p>
            </div>
          </Link>

          <Link to="/locations/Pretoria" className="city-card">
            <div className="city-img city-four"></div>
            <div>
              <h3>Pretoria</h3>
              <p>Gauteng</p>
            </div>
          </Link>
        </section>

        <h2>Available stays</h2>

        <section className="listings">
          {accommodations.map((accommodation) => (
            <Link
              to={`/accommodations/${accommodation._id}`}
              className="listing-card"
              key={accommodation._id}
            >
              <img
                src={getListingImage(accommodation)}
                alt={accommodation.title}
              />

              <div className="listing-card-info">
                <div className="listing-card-top">
                  <h3>{accommodation.title}</h3>
                  <span>★ {accommodation.rating}</span>
                </div>

                <p>{accommodation.location}</p>
                <p>{accommodation.type}</p>
                <p>{accommodation.reviews} reviews</p>

                <strong>R{accommodation.price} / night</strong>
              </div>
            </Link>
          ))}
        </section>

        <h2>Discover Airbnb Experiences</h2>

        <section className="experience-grid">
          <div className="experience-card trip-card">
            <h3>Things to do on your trip</h3>
            <button>Experiences</button>
          </div>

          <div className="experience-card home-card">
            <h3>Things to do from home</h3>
            <button>Online Experiences</button>
          </div>
        </section>

        <section className="gift-section">
          <div>
            <h2>Shop Airbnb gift cards</h2>
            <button>Learn more</button>
          </div>

          <div className="gift-cards">
            <div className="gift-card gift-one">airbnb</div>
            <div className="gift-card gift-two">airbnb</div>
            <div className="gift-card gift-three">airbnb</div>
          </div>
        </section>

        <section className="hosting-section">
          <h2>Questions about hosting?</h2>
          <button onClick={() => navigate("/admin/create")}>
            Ask a Superhost
          </button>
        </section>

        <section className="future-section">
          <h3>Inspiration for future getaways</h3>

          <div className="future-tabs">
            <span>Destinations for arts & culture</span>
            <span>Destinations for outdoor adventure</span>
            <span>Mountain cabins</span>
            <span>Beach destinations</span>
          </div>

          <div className="future-links">
            <div>
              <h4>Sandton</h4>
              <p>Gauteng</p>
            </div>

            <div>
              <h4>Cape Town</h4>
              <p>Western Cape</p>
            </div>

            <div>
              <h4>Ballito</h4>
              <p>KwaZulu-Natal</p>
            </div>

            <div>
              <h4>Hazyview</h4>
              <p>Mpumalanga</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Support</h4>
            <p>Help Centre</p>
            <p>Safety information</p>
            <p>Cancellation options</p>
          </div>

          <div className="footer-column">
            <h4>Community</h4>
            <p>Airbnb.org</p>
            <p>Support refugees</p>
            <p>Invite friends</p>
          </div>

          <div className="footer-column">
            <h4>Hosting</h4>
            <p>Try hosting</p>
            <p>AirCover for Hosts</p>
            <p>Explore hosting resources</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <span>© 2026 Airbnb Capstone</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>

          <div>
            <span>English (ZA)</span>
            <span>ZAR</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home