import * as React from "react";
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
    <div className="refinements">
      <form>
        {refinements.map((refinement) => (
          <label key={refinement}>
            <input type="checkbox" value={refinement} onChange={handleChange} />
            {refinement}
          </label>
        ))}
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Refinements;
