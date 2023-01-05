import * as React from "react";
import "./card.scss";

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
  // unitTotalsList is an array of objects, each containing a unit type, the total number of units of that type, and the average square footage of units of that type
  const [unitTotalsList, setUnitTypesList] = React.useState<
    Array<{
      type: string;
      unitTotals: number;
      averageSqft: number;
      minOccupancy: number;
      maxOccupancy: number;
    }>
  >([]);
  const [amenities, setAmenities] = React.useState<string[]>([]);

  React.useEffect(() => {
    const allAmenities = units.flatMap((unit) => unit.amenities);
    const sortedAmenities = allAmenities.sort();
    setAmenities(Array.from(new Set(sortedAmenities)));
  }, [units]);

  // Use effect hook that runs when the units prop changes
  React.useEffect(() => {
    // Create an object that tracks the total number of units and total square footage for each unit type
    const unitTotals = units.reduce(
      (
        acc: {
          [key: string]: {
            unitTypeTotal: number;
            totalSqft: number;
            minOccupancy: number;
            maxOccupancy: number;
          };
        },
        unit: Unit
      ) => {
        // If the unit type does not yet exist in the object, add it and set the unit count, total square footage, and min/max occupancy values to the values for this unit
        if (!acc[unit.type]) {
          acc[unit.type] = {
            unitTypeTotal: 1,
            totalSqft: unit.sqft,
            minOccupancy: unit.minOccupancy,
            maxOccupancy: unit.maxOccupancy,
          };
        }
        // Otherwise, increment the unit count and add the square footage of this unit to the total
        acc[unit.type].unitTypeTotal++;
        acc[unit.type].totalSqft += unit.sqft;
        // Update the min/max occupancy values for the unit type if necessary
        acc[unit.type].minOccupancy = Math.min(
          acc[unit.type].minOccupancy,
          unit.minOccupancy
        );
        acc[unit.type].maxOccupancy = Math.max(
          acc[unit.type].maxOccupancy,
          unit.maxOccupancy
        );
        return acc;
      },
      {}
    );

    setUnitTypesList(
      // Calculate the average square footage for each unit type and sort the unit types by number of bedrooms, with studios coming first
      Object.keys(unitTotals)
        .map((unitType) => {
          let displayUnitType;
          // Convert the unit type names from their original form to a more user-friendly form (e.g. "oneBdrm" becomes "1 Bed")
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
          // Calculate the average square footage for the current unit type and rounds down to the nearest whole number
          const unit = unitTotals[unitType];
          const averageSqft = Math.floor(unit.totalSqft / unit.unitTypeTotal);
          // This object is returned and will be added to the unitTypesList array
          return {
            type: displayUnitType,
            unitTotals: unitTotals[unitType].unitTypeTotal,
            averageSqft,
            minOccupancy: unit.minOccupancy,
            maxOccupancy: unit.maxOccupancy,
          };
        })
        // Sort the unit types by number of bedrooms, with studios coming first
        .sort((a, b) => {
          if (a.type === "Studio") {
            return -1;
          } else if (b.type === "Studio") {
            return 1;
          } else {
            // Convert the unit type names to numbers and subtract them to sort the unit types by number of bedrooms
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
        <h5>Available Units:</h5>
        <ul className="listing-card__unit-types">
          {unitTotalsList.map((unit) => {
            return (
              <li key={unit.type}>
                {unit.type}: {unit.unitTotals} units, avg {unit.averageSqft}{" "}
                ft², {unit.minOccupancy}-{unit.maxOccupancy} max occupants
              </li>
            );
          })}
        </ul>
        <h5>Some units may include following:</h5>
        <span>{amenities.join(", ")}</span>
      </div>
    </div>
  );
};

export default ListingCard;
