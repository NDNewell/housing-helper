const listingsDataByPage = (selectedPage: number, listingsPerPage: number) =>
  `http://localhost:3001/listings?_page=${selectedPage}&_limit=${listingsPerPage}`;

const listingsAllData = () => "http://localhost:3001/listings";

const search = (searchTerm: string, listingsPerPage: number) =>
  `http://localhost:3001/listings?name_like=${searchTerm}*&_limit=${listingsPerPage}`;

const api = { listingsDataByPage, listingsAllData, search };

export default api;
