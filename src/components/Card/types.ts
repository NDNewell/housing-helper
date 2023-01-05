export type Unit = {
  type: string;
  minOccupancy: number;
  maxOccupancy: number;
  sqft: number;
  amenities: string[];
};

export interface Props {
  key: string;
  id: string;
  name: string;
  picture: string;
  units: Unit[];
}
