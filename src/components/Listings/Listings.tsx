import * as React from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import ListingCard from "../ListingCard/ListingCard";
import listingData from "../../services/api";
import "./Listings.scss";

interface TransformedListing {
  id: string;
  name: string;
  picture: string;
  type: string;
  minOccupancy: number;
  maxOccupancy: number;
  sqft: number;
  amenities: string[];
}

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
  listings: TransformedListing[];
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
        const transformedListings: TransformedListing[] = [];
        response.data.forEach((listing: Listing) => {
          listing.units.forEach((unit) => {
            transformedListings.push({
              id: listing.id,
              name: listing.name,
              picture: listing.picture,
              type: unit.type,
              minOccupancy: unit.minOccupancy,
              maxOccupancy: unit.maxOccupancy,
              sqft: unit.sqft,
              amenities: unit.amenities,
            });
          });
        });
        this.setState({ listings: transformedListings });
      });
  }

  handlePageChange = ({ selected }: Page) => {
    const selectedPage = selected + 1;
    axios
      .get(listingData(selectedPage, this.state.listingsPerPage))
      .then((response) => {
        const transformedListings = response.data.map((listing: Listing) => {
          return listing.units.map((unit) => {
            return {
              id: listing.id,
              name: listing.name,
              picture: listing.picture,
              type: unit.type,
              minOccupancy: unit.minOccupancy,
              maxOccupancy: unit.maxOccupancy,
              sqft: unit.sqft,
              amenities: unit.amenities,
            };
          });
        });
        this.setState({
          currentPage: selectedPage,
          listings: transformedListings,
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
            type={listing.type}
            minOccupancy={listing.minOccupancy}
            maxOccupancy={listing.maxOccupancy}
            sqft={listing.sqft}
            amenities={listing.amenities}
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
