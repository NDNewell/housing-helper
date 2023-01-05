import axios from "axios";

export type OccupancyRange = {
  min: number;
  max: number;
};
interface ListItemSearchParams {
  page?: number;
  pageLimit?: number;
  searchQuery?: string;
  occupancyRange?: OccupancyRange;
  refinements?: string;
  sort?: string;
}

const searchListings = (
  page?: number,
  pageLimit?: number,
  searchQuery = "",
  occupancyRange?: OccupancyRange,
  refinements = "",
  sort?: string
) => {
  const params: ListItemSearchParams = {};

  if (searchQuery) {
    params.searchQuery = searchQuery;
  }

  if (occupancyRange) {
    const { min, max } = occupancyRange;

    if (min > 0 && max > 0) {
      params.occupancyRange = occupancyRange;
    }
  }

  if (refinements.length > 0) {
    params.refinements = refinements;
  }

  if (page && pageLimit) {
    params.page = page;
    params.pageLimit = pageLimit;
  }

  if (sort) {
    params.sort = sort;
  }

  return axios.get(`http://localhost:3001/listings/search`, { params });
};

const getRefinements = () =>
  axios.get("http://localhost:3001/listings/amenities");

const getMinMaxOccupancy = () =>
  axios.get("http://localhost:3001/occupancyLimits");

const api = { searchListings, getRefinements, getMinMaxOccupancy };

export default api;
