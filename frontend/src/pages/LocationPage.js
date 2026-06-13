import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const LocationPage = () => {
  const { location } = useParams()
  const [accommodations, setAccommodations] = useState([])

  useEffect(() => {
    const fetchAccommodations = async () => {
      const response = await fetch("/api/accommodations")
      const json = await response.json()

      if (response.ok) {
        setAccommodations(json)
      }
    }

    fetchAccommodations()
  }, [])

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

  const getMatchingLocation = (accommodation) => {
    const searchLocation = location.toLowerCase()
    const listingLocation = accommodation.location.toLowerCase()
    const listingTitle = accommodation.title.toLowerCase()

    if (searchLocation.includes("cape town")) {
      return listingLocation.includes("cape town") || listingTitle.includes("cape town")
    }

    if (searchLocation.includes("sandton") || searchLocation.includes("johannesburg")) {
      return listingLocation.includes("sandton") || listingLocation.includes("gauteng")
    }

    if (searchLocation.includes("durban") || searchLocation.includes("ballito")) {
      return listingLocation.includes("durban") || listingLocation.includes("ballito")
    }

    if (searchLocation.includes("hazyview") || searchLocation.includes("kruger")) {
      return listingLocation.includes("hazyview") || listingTitle.includes("kruger")
    }

    if (searchLocation.includes("clarens")) {
      return listingLocation.includes("clarens") || listingTitle.includes("clarens")
    }

    if (searchLocation.includes("knysna")) {
      return listingLocation.includes("knysna") || listingTitle.includes("garden route")
    }

    if (searchLocation.includes("pretoria")) {
      return listingLocation.includes("pretoria") || listingLocation.includes("gauteng")
    }

    return (
      listingLocation.includes(searchLocation) ||
      listingTitle.includes(searchLocation)
    )
  }

  const filteredAccommodations = accommodations.filter(getMatchingLocation)

  return (
    <div className="location-page">
      <header className="location-header">
        <Link to="/" className="location-logo">
          airbnb
        </Link>

        <div className="location-search">
          <span>{location}</span>
          <span>Any week</span>
          <span>Add guests</span>
          <button>🔍</button>
        </div>

        <div className="location-profile">
          <Link to="/admin/create">Become a Host</Link>
          <button>☰ 👤</button>
        </div>
      </header>

      <main className="location-content">
        <p className="stay-count">
          {filteredAccommodations.length} stays available
        </p>

        <h1>Stays in {location}</h1>

        <div className="filter-buttons">
          <button>Price</button>
          <button>Type of place</button>
          <button>Free cancellation</button>
          <button>Wifi</button>
        </div>

        <div className="location-layout">
          <div className="location-results">
            {filteredAccommodations.length > 0 &&
              filteredAccommodations.map((accommodation) => (
                <Link
                  to={`/accommodations/${accommodation._id}`}
                  className="location-listing"
                  key={accommodation._id}
                >
                  <img
                    src={getListingImage(accommodation)}
                    alt={accommodation.title}
                  />

                  <div className="location-listing-info">
                    <p>{accommodation.type}</p>

                    <h2>{accommodation.title}</h2>

                    <p>
                      {accommodation.guests} guests · {accommodation.bedrooms} bedrooms ·{" "}
                      {accommodation.bathrooms} bathrooms
                    </p>

                    <p>{accommodation.amenities}</p>

                    <div className="location-price-row">
                      <span>
                        ★ {accommodation.rating} ({accommodation.reviews} reviews)
                      </span>

                      <strong>R{accommodation.price} / night</strong>
                    </div>
                  </div>
                </Link>
              ))}

            {filteredAccommodations.length === 0 && (
              <div className="no-results">
                <h2>No stays found</h2>
                <p>Try searching for another city.</p>
              </div>
            )}
          </div>

          <div className="map-placeholder">
            <h3>{location}</h3>
            <p>Map area</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LocationPage