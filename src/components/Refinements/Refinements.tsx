import * as React from "react";
import "./refinements.scss";

import { Props } from "./types";

const Refinements: React.FC<Props> = ({ refinements, onSave }) => {
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>(
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (selectedAmenities.includes(value)) {
      setSelectedAmenities(
        selectedAmenities.filter((amenity) => amenity !== value)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, value]);
    }
  };

  const handleSave = () => {
    onSave(selectedAmenities);
  };

  return (
    <div className="refinements" aria-label="Filter options">
      <form className="refinements__form">
        {refinements.map((refinement) => (
          <label className="refinements__label" key={refinement}>
            <input
              type="checkbox"
              value={refinement}
              onChange={handleChange}
              aria-label={`Filter by ${refinement}`}
            />
            <span>{refinement}</span>
          </label>
        ))}
        <div className="refinements__button">
          <button
            type="button"
            onClick={handleSave}
            aria-label="Save filter changes"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Refinements;
