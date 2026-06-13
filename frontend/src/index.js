import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { AccommodationContextProvider } from "./context/AccommodationContext"
import { AuthContextProvider } from "./context/AuthContext"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AccommodationContextProvider>
        <App />
      </AccommodationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)