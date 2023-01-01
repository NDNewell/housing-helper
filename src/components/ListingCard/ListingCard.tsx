import * as React from "react";
import "./ListingCard.scss";

export type Unit = {
  type: string;
  minOccupancy: number;
  maxOccupancy: number;
  sqft: number;
  amenities: string[];
};

interface Props {
  key: string;
  id: string;
  name: string;
  picture: string;
  units: Unit[];
}

const ListingCard = ({ id, name, picture, units }: Props) => {
  const [unitTypesList, setUnitTypesList] = React.useState<
    Array<{ type: string; count: number; averageSqft: number }>
  >([]);
  React.useEffect(() => {
    const unitCount = units.reduce(
      (
        count: { [key: string]: { count: number; totalSqft: number } },
        unit: Unit
      ) => {
        if (!count[unit.type]) {
          count[unit.type] = {
            count: 1,
            totalSqft: unit.sqft,
          };
        }
        count[unit.type].count++;
        count[unit.type].totalSqft += unit.sqft;
        return count;
      },
      {}
    );

    setUnitTypesList(
      Object.keys(unitCount)
        .map((unitType) => {
          let displayUnitType;
          switch (unitType) {
            case "oneBdrm":
              displayUnitType = "1 Bed";
              break;
            case "twoBdrm":
              displayUnitType = "2 Bed";
              break;
            case "threeBdrm":
              displayUnitType = "3 Bed";
              break;
            case "fourBdrm":
              displayUnitType = "4 Bed";
              break;
            case "studio":
              displayUnitType = "Studio";
              break;
            default:
              displayUnitType = unitType;
          }
          const unit = unitCount[unitType];
          const averageSqft = Math.floor(unit.totalSqft / unit.count);
          return {
            type: displayUnitType,
            count: unitCount[unitType].count,
            averageSqft,
          };
        })
        .sort((a, b) => {
          if (a.type === "Studio") {
            return -1;
          } else if (b.type === "Studio") {
            return 1;
          } else {
            return parseInt(a.type.slice(0, 1)) - parseInt(b.type.slice(0, 1));
          }
        })
    );
  }, [units]);

  return (
    <div className="listing-card" key={id}>
      <div className="listing-card__img-container">
        <img src={picture} alt={name} className="listing-card__img" />
      </div>
      <div className="listing-card__details">
        <h3 className="listing-card__name">{name}</h3>
        <ul className="listing-card__unit-types">
          {unitTypesList.map((unit) => {
            return (
              <li key={unit.type}>
                {unit.type}: {unit.count} units, avg {unit.averageSqft} ft²
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ListingCard;
