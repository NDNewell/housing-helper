import * as React from "react";
import "./ListingCard.scss";

type Props = {
  id: string;
  name: string;
  picture: string;
};

const ListingCard: React.FC<Props> = ({ id, name, picture }) => {
  return (
    <div className="listing-card" key={id}>
      <h2 className="listing-card__name">{name}</h2>
      <img className="listing-card__picture" src={picture} alt={name} />
    </div>
  );
};

export default ListingCard;
