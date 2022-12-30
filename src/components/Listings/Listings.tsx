import * as React from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import ListingCard from "../ListingCard/ListingCard";
import listingDataApi from "../../services/api";
import "./Listings.scss";

type Listing = {
  id: string;
  name: string;
  picture: string;
  units: string[];
};

type State = {
  listings: Listing[];
  currentPage: number;
  listingsPerPage: number;
  totalPages: number;
};

type Page = {
  selected: number;
};

class Listings extends React.Component<{}, State> {
  state: State = {
    listings: [],
    currentPage: 1,
    listingsPerPage: 10,
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
          listings: response.data,
          totalPages: Math.ceil(totalCount / this.state.listingsPerPage),
          currentPage: page,
        });
      });
  };

  handlePageChange = ({ selected }: Page) => {
    const selectedPage = selected + 1;
    this.getListings(selectedPage);
  };

  render() {
    return (
      <div className="listings">
        <h2 className="listings__heading">Affordable Housing Listings</h2>
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
