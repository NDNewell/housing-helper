import * as React from "react";
import Pagination from "../Pagination/Pagination";
import _ from "lodash";
import ListingCard from "../ListingCard/ListingCard";
import Refinements from "../Filters/Refinements";
import SortSelect from "../Filters/Select";
import api from "../../services/api";
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
  availableAmenities: string[];
  selectedRefinements: string[];
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
    availableAmenities: [],
    selectedRefinements: [],
  };

  componentDidMount() {
    this.getAvailableAmenities();
  }

  // Get all possible amenities from each unit's amenities array for each listing
  getAvailableAmenities = async () => {
    try {
      // Get all listings
      const response = await api.getAmenities();
      const amenities = response.data.filter(
        (amenity: string) => amenity !== null
      );

      // Set the available amenities in the state
      this.setState({ availableAmenities: amenities });
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  handlePageChange = ({ selected }: Page) => {
    const selectedPage = selected + 1;
    this.setState({ currentPage: selectedPage });
  };

  handleSortSelect = async (selectValue: string) => {
    const { currentPage, listingsPerPage, searchQuery, selectedRefinements } =
      this.state;
    try {
      // Get all listings
      const response = await api.searchListings(
        currentPage,
        listingsPerPage,
        searchQuery,
        selectedRefinements.join(","),
        selectValue
      );

      // Set the available amenities in the state
      this.setState({ listings: response.data.listings });
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  handleSearch = (
    searchResults: Listing[],
    totalPages: number,
    page: number
  ) => {
    console.log(searchResults);
    this.setState({
      listingsData: searchResults,
      totalPages: totalPages,
      currentPage: page,
    });
  };

  handleRefinements = (refinements: string[]) => {
    this.setState({ selectedRefinements: refinements });
  };

  render() {
    return (
      <div className="listings">
        <h2 className="listings__heading">Affordable Housing Listings</h2>
        <SortSelect
          onSelect={this.handleSortSelect}
          selectOptions={[
            {
              label: "A-Z",
              value: "az",
              default: true,
            },
            {
              label: "Z-A",
              value: "za",
              default: false,
            },
          ]}
        />
        <Search
          onSearch={this.handleSearch}
          listingsPerPage={this.state.listingsPerPage}
          page={this.state.currentPage}
          refinements={this.state.selectedRefinements.join(",")}
        />
        <Refinements
          refinements={this.state.availableAmenities}
          onSave={this.handleRefinements}
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
