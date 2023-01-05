export type RangeSliderProps = {
  minOccupancy: number;
  maxOccupancy: number;
  onRangeChange: (values: [number, number]) => void;
};
