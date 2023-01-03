import axios from "axios";

interface ListingSearchParams {
  page?: number;
  listingsPerPage?: number;
  searchQuery?: string;
  refinements?: {
    amenities: string[];
  };
}

const searchListings = (
  page: number,
  listingsPerPage: number,
  searchQuery = "",
  refinements: string[]
) => {
  const params: ListingSearchParams = {};

  if (page && listingsPerPage) {
    params.page = page;
    params.listingsPerPage = listingsPerPage;
  }

  if (searchQuery) {
    params.searchQuery = searchQuery;
  }

  if (refinements.length > 0) {
    params.refinements = {
      amenities: refinements,
    };
  }

  return axios.get(`http://localhost:3001/listings/search`, { params });
};

const getAmenities = () =>
  axios.get("http://localhost:3001/listings/amenities");

const api = { searchListings, getAmenities };

export default api;
