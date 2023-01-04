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

export type ListItem = {
  id: string;
  name: string;
  picture: string;
  units: Unit[];
};

type State = {
  listItems: ListItem[];
  currentPage: number;
  listItemsPerPage: number;
  totalPages: number;
  searchQuery: string;
  availableRefinements: string[];
  selectedRefinements: string[];
};

type Page = {
  selected: number;
};

class Listings extends React.Component<{}, State> {
  state: State = {
    listItems: [],
    searchQuery: "",
    availableRefinements: [],
    selectedRefinements: [],
    currentPage: 1,
    listItemsPerPage: 5,
    totalPages: 0,
  };

  componentDidMount() {
    this.getAvailableRefinements();
  }

  // Get all possible amenities from each unit's amenities array for each listing
  getAvailableRefinements = async () => {
    try {
      // Get all listings
      const response = await api.getRefinements();
      const refinements = response.data.filter(
        (refinement: string) => refinement !== null
      );

      // Set the available amenities in the state
      this.setState({ availableRefinements: refinements });
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
    const {
      currentPage,
      listItemsPerPage: listingsPerPage,
      searchQuery,
      selectedRefinements,
    } = this.state;
    try {
      // Get all listings
      const response = await api.searchListings(
        currentPage,
        listingsPerPage,
        searchQuery,
        selectedRefinements.join(","),
        selectValue
      );

      this.setState({ listItems: response.data.listings });
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  handleSearch = (
    searchResults: ListItem[],
    totalPages: number,
    page: number
  ) => {
    this.setState({
      listItems: searchResults,
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
          listingsPerPage={this.state.listItemsPerPage}
          page={this.state.currentPage}
          refinements={this.state.selectedRefinements.join(",")}
        />
        <Refinements
          refinements={this.state.availableRefinements}
          onSave={this.handleRefinements}
        />
        {this.state.listItems.map((listing) => (
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
