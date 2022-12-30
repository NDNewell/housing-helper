import * as React from "react";
import "./ListingCard.scss";

interface Props {
  key: string;
  id: string;
  name: string;
  picture: string;
  type: string;
  minOccupancy: number;
  maxOccupancy: number;
  sqft: number;
  amenities: string[];
}

const ListingCard = ({
  id,
  name,
  picture,
  type,
  minOccupancy,
  maxOccupancy,
  sqft,
  amenities,
}: Props) => {
  return (
    <div className="listing-card" key={id}>
      <div className="listing-card__img-container">
        <img src={picture} alt={name} className="listing-card__img" />
      </div>
      <div className="listing-card__details">
        <h3 className="listing-card__name">{name}</h3>
        <div className="listing-card__info">
          <p>
            <span className="listing-card__info-label">Type:</span> {type}
          </p>
          <p>
            <span className="listing-card__info-label">Min Occupancy:</span>{" "}
            {minOccupancy}
          </p>
          <p>
            <span className="listing-card__info-label">Max Occupancy:</span>{" "}
            {maxOccupancy}
          </p>
          <p>
            <span className="listing-card__info-label">Sqft:</span> {sqft}
          </p>
          <p>
            <span className="listing-card__info-label">Amenities:</span>{" "}
            {amenities.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
