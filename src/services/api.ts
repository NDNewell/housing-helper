import axios from "axios";

interface ListingSearchParams {
  page?: number;
  listingsPerPage?: number;
  searchQuery?: string;
  amenities?: string;
  sort?: string;
}

const searchListings = (
  page: number,
  listingsPerPage: number,
  searchQuery = "",
  refinements: string,
  sort = "asc"
) => {
  const params: ListingSearchParams = {};

  if (searchQuery) {
    params.searchQuery = searchQuery;
  }

  if (refinements.length > 0) {
    params.amenities = refinements;
  }

  if (page && listingsPerPage) {
    params.page = page;
    params.listingsPerPage = listingsPerPage;
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
