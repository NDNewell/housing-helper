import "./rangeSlider.scss";
import Slider from "react-slider";
import React, { useState, useEffect } from "react";
import { RangeSliderProps } from "./types";

// Create the RangeSlider component
const RangeSlider: React.FC<RangeSliderProps> = ({
  onRangeChange,
  minOccupancy,
  maxOccupancy,
}) => {
  // Initialize the state variables for the min and max values
  const [min, setMin] = useState<number>(minOccupancy);
  const [max, setMax] = useState<number>(maxOccupancy);

  const handleRangeChange = (values: [number, number]) => {
    setMin(values[0]);
    setMax(values[1]);
    onRangeChange(values);
  };

  useEffect(() => {
    setMin(minOccupancy);
    setMax(maxOccupancy);
  }, [minOccupancy, maxOccupancy]);

  return (
    <div className="range-slider">
      <span className="range-slider__title">Occupancy Preferences</span>
      <Slider
        onChange={handleRangeChange}
        className="range-slider__container"
        thumbClassName="range-slider__thumb"
        trackClassName="range-slider__track"
        thumbActiveClassName="range-slider__thumb--active"
        max={maxOccupancy}
        min={minOccupancy}
        step={1}
        minDistance={1}
        value={[min, max]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        pearling
      />
    </div>
  );
};

export default RangeSlider;
