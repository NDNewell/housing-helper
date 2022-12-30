import * as React from "react";
import "./ListingCard.scss";

interface Props {
  key: string;
  id: string;
  name: string;
  picture: string;
  units: string[];
}

const ListingCard = ({ id, name, picture }: Props) => {
  return (
    <div className="listing-card" key={id}>
      <div className="listing-card__img-container">
        <img src={picture} alt={name} className="listing-card__img" />
      </div>
      <div className="listing-card__details">
        <h3 className="listing-card__name">{name}</h3>
      </div>
    </div>
  );
};

export default ListingCard;
