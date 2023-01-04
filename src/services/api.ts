import axios from "axios";

interface ListingSearchParams {
  page?: number;
  pageLimit?: number;
  searchQuery?: string;
  refinements?: string;
  sort?: string;
}

const searchListings = (
  page: number,
  pageLimit: number,
  searchQuery = "",
  refinements: string,
  sort = "asc"
) => {
  const params: ListingSearchParams = {};

  if (searchQuery) {
    params.searchQuery = searchQuery;
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

const getAmenities = () =>
  axios.get("http://localhost:3001/listings/amenities");

const api = { searchListings, getRefinements: getAmenities };

export default api;
