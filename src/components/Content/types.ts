import { Unit } from "../Card/types";
import { OccupancyRange } from "../../services/api";
export type ListItem = {
  id: string;
  name: string;
  picture: string;
  units: Unit[];
};
export type State = {
  listItems: ListItem[];
  defaultPage: number;
  currentPage: number;
  pageLimit: number;
  totalPages: number;
  searchQuery: string;
  availableRefinements: string[];
  selectedRefinements: string[];
  sortOrder: string;
  minOccupancy: number;
  maxOccupancy: number;
  occupancyRange: OccupancyRange;
};

export type Page = {
  selected: number;
};
