import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const AdminReservations = () => {
  const [reservations, setReservations] = useState([])
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) {
        return
      }

      const response = await fetch("/api/reservations", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })

      const json = await response.json()

      if (response.ok) {
        setReservations(json)
      }
    }

    fetchReservations()
  }, [user])

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h2>Admin</h2>
          <p>View Airbnb reservations</p>
        </div>

        <nav className="admin-nav">
          <Link to="/admin/reservations">View Reservations</Link>
          <Link to="/admin/listings">View Listings</Link>
          <Link to="/admin/create">Create Listing</Link>
        </nav>
      </header>

      <main className="admin-content">
        <div className="admin-title-row">
          <h1>Reservations</h1>
        </div>

        <div className="admin-table reservations-table">
          <div className="admin-table-head reservations-head">
            <span>Guest</span>
            <span>Email</span>
            <span>Listing</span>
            <span>Check in</span>
            <span>Check out</span>
            <span>Guests</span>
          </div>

          {reservations.map((reservation) => (
            <div className="admin-table-row reservations-row" key={reservation._id}>
              <span>{reservation.name}</span>
              <span>{reservation.email}</span>
              <span>{reservation.accommodationTitle}</span>
              <span>{reservation.checkIn}</span>
              <span>{reservation.checkOut}</span>
              <span>{reservation.guests}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AdminReservations