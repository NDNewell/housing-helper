import axios from "axios";

const getListings = (
  page: number | undefined = undefined,
  listingsPerPage: number | undefined = undefined,
  searchQuery: string | undefined = undefined,
  refinements: string[] | undefined = undefined
) => {
  let endpoint = `http://localhost:3001/listings`;
  if (page && listingsPerPage) {
    endpoint += `?_page=${page}&_limit=${listingsPerPage}`;
  }
  if (searchQuery) {
    endpoint += `${
      endpoint.includes("?") ? "&" : "?"
    }name_like=${searchQuery}*`;
  }
  if (refinements && refinements.length > 0) {
    refinements.forEach((refinement) => {
      endpoint += `&amenities_like=${refinement}*`;
    });
  }
  return axios.get(endpoint);
};

export default getListings;
