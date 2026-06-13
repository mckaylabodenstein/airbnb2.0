import { Link } from "react-router-dom"

const ListingCard = ({ accommodation }) => {
  return (
    <Link to={`/accommodations/${accommodation._id}`} className="listing-card">
      <img
        src={accommodation.images[0]}
        alt={accommodation.title}
        className="listing-image"
      />

      <div className="listing-info">
        <p className="listing-type">{accommodation.type}</p>

        <h3>{accommodation.title}</h3>

        <div className="small-line"></div>

        <p>
          {accommodation.guests} guests · {accommodation.bedrooms} bedrooms ·{" "}
          {accommodation.bathrooms} bathrooms
        </p>

        <p>{accommodation.amenities.join(" · ")}</p>

        <div className="listing-bottom">
          <p>★ {accommodation.rating} ({accommodation.reviews} reviews)</p>

          <p>
            <strong>R{accommodation.price}</strong> / night
          </p>
        </div>
      </div>

      <div className="heart">♡</div>
    </Link>
  )
}

export default ListingCard