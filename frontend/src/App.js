import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Home from "./pages/Home"
import LocationPage from "./pages/LocationPage"
import ListingPage from "./pages/ListingPage"
import AdminReservations from "./pages/AdminReservations"
import AdminCreateListing from "./pages/AdminCreateListing"
import AdminListings from "./pages/AdminListings"
import AdminEditListing from "./pages/AdminEditListing"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

import { useAuthContext } from "./hooks/useAuthContext"

function App() {
  const { user } = useAuthContext()

  const isAdmin = user && user.email === "admin@airbnb.co.za"

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/locations/:location"
            element={<LocationPage />}
          />

          <Route
            path="/accommodations/:id"
            element={<ListingPage />}
          />

          <Route
            path="/admin/reservations"
            element={isAdmin ? <AdminReservations /> : <Navigate to="/" />}
          />

          <Route
            path="/admin/create"
            element={isAdmin ? <AdminCreateListing /> : <Navigate to="/" />}
          />

          <Route
            path="/admin/listings"
            element={isAdmin ? <AdminListings /> : <Navigate to="/" />}
          />

          <Route
            path="/admin/edit/:id"
            element={isAdmin ? <AdminEditListing /> : <Navigate to="/" />}
          />

          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App