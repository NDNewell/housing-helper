import * as React from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import ListingCard from "../ListingCard/ListingCard";
import Filters from "../Filters/Filters";
import api from "../../services/api";
import "./Listings.scss";

import { Unit } from "../ListingCard/ListingCard";

export type Listing = {
  id: string;
  name: string;
  picture: string;
  units: Unit[];
};

type State = {
  listings: Listing[];
  paginatedListingsData: Listing[];
  allListingsData: Listing[];
  currentPage: number;
  listingsPerPage: number;
  totalPages: number;
};

type Page = {
  selected: number;
};

class Listings extends React.Component<{}, State> {
  state: State = {
    allListingsData: [],
    paginatedListingsData: [],
    listings: [],
    currentPage: 1,
    listingsPerPage: 5,
    totalPages: 0,
  };

  componentDidMount() {
    this.getAllListings();
    this.getPaginatedListings(this.state.currentPage);
  }

  getAllListings = () => {
    axios.get(api.listingsAllData()).then((response) => {
      this.setState({
        allListingsData: response.data,
      });
    });
  };

  getPaginatedListings = (page: number) => {
    axios
      .get(api.listingsDataByPage(page, this.state.listingsPerPage))
      .then((response) => {
        const totalCount = Number(response.headers["x-total-count"]);
        this.setState({
          paginatedListingsData: response.data,
          totalPages: Math.ceil(totalCount / this.state.listingsPerPage),
          currentPage: page,
        });
      });
  };

  handleSearch = (searchedListings: Listing[]) => {
    this.setState({ listings: searchedListings });
  };

  handlePageChange = ({ selected }: Page) => {
    const selectedPage = selected + 1;
    this.getPaginatedListings(selectedPage);
  };

  handleFilter = (filteredListings: Listing[]) => {
    this.setState({ listings: filteredListings });
  };

  render() {
    return (
      <div className="listings">
        <h2 className="listings__heading">Affordable Housing Listings</h2>
        <Filters
          allListings={this.state.allListingsData}
          filterItems={this.state.paginatedListingsData}
          onFilter={this.handleFilter}
          onSearch={this.handleSearch}
        />
        {this.state.listings.map((listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            name={listing.name}
            picture={listing.picture}
            units={listing.units}
          />
        ))}
        <Pagination
          totalPages={this.state.totalPages}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Listings;
