import * as React from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import ListingCard from "../ListingCard/ListingCard";
import listingData from "../../services/api";
import "./Listings.scss";

type Listing = {
  id: string;
  name: string;
  picture: string;
  units: Unit[];
};

type Unit = {
  type: string;
  minOccupancy: number;
  maxOccupancy: number;
  sqft: number;
  amenities: string[];
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
    axios
      .get(listingData(this.state.currentPage, this.state.listingsPerPage))
      .then((response) => {
        this.setState({
          listings: response.data,
          totalPages: Number(response.headers["x-total-count"]),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handlePageChange = ({ selected }: Page) => {
    const selectedPage = selected + 1;
    axios
      .get(listingData(selectedPage, this.state.listingsPerPage))
      .then((response) => {
        this.setState({
          currentPage: selectedPage,
          listings: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
