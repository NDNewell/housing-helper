import axios from "axios";

const getListings = (
  page: number | undefined = undefined,
  listingsPerPage: number | undefined = undefined,
  searchQuery: string | undefined = undefined,
  refinements: string[] | undefined = undefined
) => {
  let endpoint = `http://localhost:3001/listings`;
  let queryParams = "";
  if (page && listingsPerPage) {
    queryParams += `&_page=${page}&_limit=${listingsPerPage}`;
  }
  if (searchQuery) {
    queryParams += `&name_like=${searchQuery}*`;
  }

  if (refinements && refinements.length > 0) {
    const refinementsQuery = refinements
      .map((refinement) => `"${refinement}"`)
      .join(", ");
    queryParams += `&_where={"units.amenities":{"$all":[${refinementsQuery}]}}`;
  }
  // http://localhost:3001/search?name_like=as*
  if (queryParams) {
    endpoint += `?${queryParams.substring(1)}`;
  }
  return axios.get(endpoint);
};

export default getListings;
