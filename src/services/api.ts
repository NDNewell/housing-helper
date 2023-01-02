import axios from "axios";

const listingsDataByPage = (selectedPage: number, listingsPerPage: number) =>
  `http://localhost:3001/listings?_page=${selectedPage}&_limit=${listingsPerPage}`;

const getAllListings = () => {
  return axios.get("http://localhost:3001/listings");
};

const search = (page: number, listingsPerPage: number, searchQuery: string) =>
  `http://localhost:3001/listings?name_like=${searchQuery}*&_page=${page}&_limit=${listingsPerPage}`;

const emptySearch = (page: number, listingsPerPage: number) =>
  `http://localhost:3001/listings?_page=${page}&_limit=${listingsPerPage}`;

const api = { listingsDataByPage, getAllListings, search, emptySearch };

export default api;
