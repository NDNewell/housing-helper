import { ListItem } from "../Content/types";

import { OccupancyRange } from "../../services/api";

export type Props = {
  onSearch: (
    searchQuery: string,
    searchResults: ListItem[],
    totalPages: number,
    page: number
  ) => void;
  page: number;
  pageLimit: number;
  occupancyRange: OccupancyRange;
  refinements: string;
  sortOrder: string;
};
