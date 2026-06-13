import { createContext, useReducer } from "react"

export const AccommodationContext = createContext()

export const accommodationReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACCOMMODATIONS":
      return {
        accommodations: action.payload
      }

    case "CREATE_ACCOMMODATION":
      return {
        accommodations: [action.payload, ...state.accommodations]
      }

    case "DELETE_ACCOMMODATION":
      return {
        accommodations: state.accommodations.filter((accommodation) => {
          return accommodation._id !== action.payload._id
        })
      }

    default:
      return state
  }
}

export const AccommodationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accommodationReducer, {
    accommodations: null
  })

  return (
    <AccommodationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AccommodationContext.Provider>
  )
}