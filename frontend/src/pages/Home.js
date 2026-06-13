import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAccommodationContext } from "../hooks/useAccommodationContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"
import ListingCard from "../components/ListingCard"
import Footer from "../components/Footer"


const Home = () => {
  const { accommodations, dispatch } = useAccommodationContext()
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const navigate = useNavigate()

  const [searchLocation, setSearchLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("")

  function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <img src={heroImg} alt="Holiday home" className="hero-image" />

        <div className="hero-text">
          <h1>Not sure where to go? Perfect.</h1>
          <button>I'm flexible</button>
        </div>
      </section>
    </div>
  );
}

  useEffect(() => {
    const fetchAccommodations = async () => {
      const response = await fetch("/api/accommodations")
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: "SET_ACCOMMODATIONS", payload: json })
      }
    }

    fetchAccommodations()
  }, [dispatch])

  const handleLogout = () => {
    logout()
  }

  const handleSearch = () => {
    if (searchLocation.trim()) {
      navigate(`/locations/${searchLocation}`)
    } else {
      navigate("/locations/Cape Town")
    }
  }

  return (
    <div className="home">
      <section className="home-hero">
        <div className="hero-header">
          <div className="logo">airbnb</div>

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
                <Link to="/login">Log in</Link>
                <Link to="/signup">Sign up</Link>
              </div>
            )}

            <button className="profile-button">☰ 👤</button>
          </div>
        </div>

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
            I’m flexible
          </button>
        </div>
      </section>

      <main className="home-content">
        <h2>Inspiration for your next trip</h2>

        <div className="city-cards">
          <Link to="/locations/Cape Town" className="city-card">
            <div className="city-img city-one"></div>
            <div>
              <h3>Cape Town</h3>
              <p>Modern city apartments</p>
            </div>
          </Link>

          <Link to="/locations/Ballito" className="city-card">
            <div className="city-img city-two"></div>
            <div>
              <h3>Ballito</h3>
              <p>Beach houses and coastal stays</p>
            </div>
          </Link>

          <Link to="/locations/Sandton" className="city-card">
            <div className="city-img city-three"></div>
            <div>
              <h3>Sandton</h3>
              <p>Luxury city stays</p>
            </div>
          </Link>

          <Link to="/locations/Hazyview" className="city-card">
            <div className="city-img city-four"></div>
            <div>
              <h3>Hazyview</h3>
              <p>Safari lodges near Kruger</p>
            </div>
          </Link>
        </div>

        <h2>Discover Airbnb Experiences</h2>

        <div className="experience-grid">
          <div className="experience-card trip-card">
            <h3>Things to do on your trip</h3>
            <button>Experiences</button>
          </div>

          <div className="experience-card home-card">
            <h3>Things to do from home</h3>
            <button>Online Experiences</button>
          </div>
        </div>

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
            <span>Popular destinations</span>
            <span>Unique Stays</span>
          </div>

          <div className="future-links">
            <div>
              <h4>Cape Town</h4>
              <p>Western Cape</p>
            </div>

            <div>
              <h4>Ballito</h4>
              <p>KwaZulu-Natal</p>
            </div>

            <div>
              <h4>Sandton</h4>
              <p>Gauteng</p>
            </div>

            <div>
              <h4>Hazyview</h4>
              <p>Mpumalanga</p>
            </div>

            <div>
              <h4>Clarens</h4>
              <p>Free State</p>
            </div>

            <div>
              <h4>Knysna</h4>
              <p>Western Cape</p>
            </div>

            <div>
              <h4>Durban</h4>
              <p>KwaZulu-Natal</p>
            </div>

            <div>
              <h4>Pretoria</h4>
              <p>Gauteng</p>
            </div>
          </div>
        </section>

        <h2>Available stays</h2>

        <div className="listings">
          {accommodations &&
            accommodations.map((accommodation) => (
              <ListingCard
                key={accommodation._id}
                accommodation={accommodation}
              />
            ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home