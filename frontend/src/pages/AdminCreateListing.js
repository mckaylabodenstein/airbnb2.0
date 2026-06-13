import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const AdminCreateListing = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("")
  const [guests, setGuests] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError("You must be logged in")
      return
    }

    const accommodation = {
      title,
      location,
      type,
      guests,
      price,
      image,
      description
    }

    const response = await fetch("/api/accommodations", {
      method: "POST",
      body: JSON.stringify(accommodation),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setTitle("")
      setLocation("")
      setType("")
      setGuests("")
      setPrice("")
      setImage("")
      setDescription("")
      setError(null)
      navigate("/admin/listings")
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h2>Admin</h2>
          <p>Create a new Airbnb listing</p>
        </div>

        <nav className="admin-nav">
          <Link to="/admin/reservations">View Reservations</Link>
          <Link to="/admin/listings">View Listings</Link>
          <Link to="/admin/create">Create Listing</Link>
        </nav>
      </header>

      <main className="admin-content">
        <div className="admin-title-row">
          <h1>Create Listing</h1>
        </div>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Property title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <label>Location</label>
          <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />

          <label>Type</label>
          <input
            type="text"
            onChange={(e) => setType(e.target.value)}
            value={type}
          />

          <label>Guests</label>
          <input
            type="number"
            onChange={(e) => setGuests(e.target.value)}
            value={guests}
          />

          <label>Price per night</label>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />

          <label>Image URL</label>
          <input
            type="text"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />

          <label>Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>

          <button>Create Listing</button>

          {error && <div className="error-message">{error}</div>}
        </form>
      </main>
    </div>
  )
}

export default AdminCreateListing