const listingData = (selectedPage: Number, listingsPerPage: Number) =>
  `http://localhost:3001/listings?_page=${selectedPage}&_limit=${listingsPerPage}`;

export default listingData;
