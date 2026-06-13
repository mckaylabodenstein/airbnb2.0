import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const AdminListings = () => {
  const [accommodations, setAccommodations] = useState([])
  const { user } = useAuthContext()

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

  const handleDelete = async (id) => {
    if (!user) {
      return
    }

    const response = await fetch("/api/accommodations/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })

    if (response.ok) {
      setAccommodations(accommodations.filter((item) => item._id !== id))
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h2>Admin</h2>
          <p>Manage your Airbnb listings</p>
        </div>

        <nav className="admin-nav">
          <Link to="/admin/reservations">View Reservations</Link>
          <Link to="/admin/listings">View Listings</Link>
          <Link to="/admin/create">Create Listing</Link>
        </nav>
      </header>

      <main className="admin-content">
        <div className="admin-title-row">
          <h1>Listings</h1>
          <Link to="/admin/create" className="admin-create-button">
            Add new listing
          </Link>
        </div>

        <div className="admin-table">
          <div className="admin-table-head">
            <span>Property</span>
            <span>Location</span>
            <span>Type</span>
            <span>Guests</span>
            <span>Price</span>
            <span>Actions</span>
          </div>

          {accommodations.map((accommodation) => (
            <div className="admin-table-row" key={accommodation._id}>
              <span>{accommodation.title}</span>
              <span>{accommodation.location}</span>
              <span>{accommodation.type}</span>
              <span>{accommodation.guests}</span>
              <span>R{accommodation.price}</span>

              <div className="admin-actions">
                <Link to={`/accommodations/${accommodation._id}`}>View</Link>
                <Link to={`/admin/edit/${accommodation._id}`}>Edit</Link>
                <button onClick={() => handleDelete(accommodation._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AdminListings