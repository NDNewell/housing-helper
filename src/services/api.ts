import axios from "axios";

const getAllListings = () => {
  return axios.get(`http://localhost:3001/listings`);
};

const search = (page: number, listingsPerPage: number, searchQuery: string) => {
  return axios.get(
    `http://localhost:3001/listings?name_like=${searchQuery}*&_page=${page}&_limit=${listingsPerPage}`
  );
};

const emptySearch = (page: number, listingsPerPage: number) => {
  return axios.get(
    `http://localhost:3001/listings?_page=${page}&_limit=${listingsPerPage}`
  );
};

const api = { getAllListings, search, emptySearch };

export default api;
