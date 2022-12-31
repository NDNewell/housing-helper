import * as React from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import ListingCard from "../ListingCard/ListingCard";
import DropdownFilter from "../Filters/DropdownFilter";
import listingDataApi from "../../services/api";
import "./Listings.scss";

export type Listing = {
  id: string;
  name: string;
  picture: string;
  units: string[];
};

type State = {
  listings: Listing[];
  listingsData: Listing[];
  currentPage: number;
  listingsPerPage: number;
  totalPages: number;
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
  };

  componentDidMount() {
    this.getListings(this.state.currentPage);
  }

  getListings = (page: number) => {
    axios
      .get(listingDataApi(page, this.state.listingsPerPage))
      .then((response) => {
        const totalCount = Number(response.headers["x-total-count"]);
        this.setState({
          listingsData: response.data,
          totalPages: Math.ceil(totalCount / this.state.listingsPerPage),
          currentPage: page,
        });
      });
  };

  handlePageChange = ({ selected }: Page) => {
    const selectedPage = selected + 1;
    this.getListings(selectedPage);
  };

  handleFilter = (filteredListings: Listing[]) => {
    this.setState({ listings: filteredListings });
  };

  render() {
    return (
      <div className="listings">
        <h2 className="listings__heading">Affordable Housing Listings</h2>
        <DropdownFilter
          filterItems={this.state.listingsData}
          onFilter={this.handleFilter}
          filters={[
            { label: "A-Z", value: "az", filterProperty: "name" },
            { label: "Z-A", value: "za", filterProperty: "name" },
          ]}
          filterTypeDefault={"az"}
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
          currentPage={this.state.currentPage}
        />
      </div>
    );
  }
}

export default Listings;
