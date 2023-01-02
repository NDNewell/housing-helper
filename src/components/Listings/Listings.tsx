import * as React from "react";
import Pagination from "../Pagination/Pagination";
import ListingCard from "../ListingCard/ListingCard";
import DropdownFilter from "../Filters/DropdownFilter";
import Search from "../Filters/Search";
import "./Listings.scss";

import { Unit } from "../ListingCard/ListingCard";

export type Listing = {
  id: string;
  name: string;
  picture: string;
  units: Unit[];
};

type State = {
  listingsData: Listing[];
  listings: Listing[];
  currentPage: number;
  listingsPerPage: number;
  totalPages: number;
  searchQuery: string;
};

type Page = {
  selected: number;
};

class Listings extends React.Component<{}, State> {
  state: State = {
    listingsData: [],
    listings: [],
    currentPage: 1,
    listingsPerPage: 5,
    totalPages: 0,
    searchQuery: "",
  };

  handlePageChange = ({ selected }: Page) => {
    const selectedPage = selected + 1;
    this.setState({ currentPage: selectedPage });
  };

  handleFilter = (filteredListings: Listing[]) => {
    this.setState({ listings: filteredListings });
  };

  handleSearch = (
    searchResults: Listing[],
    totalPages: number,
    page: number
  ) => {
    this.setState({
      listingsData: searchResults,
      totalPages: totalPages,
      currentPage: page,
    });
  };

  render() {
    return (
      <div className="listings">
        <h2 className="listings__heading">Affordable Housing Listings</h2>
        <DropdownFilter
          filterItems={this.state.listingsData}
          onFilter={this.handleFilter}
          filters={[
            {
              label: "A-Z",
              value: "az",
              filterProperty: "name",
              default: true,
            },
            {
              label: "Z-A",
              value: "za",
              filterProperty: "name",
              default: false,
            },
          ]}
        />
        <Search
          onSearch={this.handleSearch}
          listingsPerPage={this.state.listingsPerPage}
          page={this.state.currentPage}
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
        {this.state.totalPages > 1 && (
          <Pagination
            totalPages={this.state.totalPages}
            onPageChange={this.handlePageChange}
          />
        )}
      </div>
    );
  }
}

export default Listings;
