import * as React from "react";
import Pagination from "../Pagination/Pagination";
import ListingCard from "../ListingCard/ListingCard";
import Refinements from "../Filters/Refinements";
import SortListSelect from "../Filters/Select";
import SetPageLimitSelect from "../Filters/Select";
import RangeSlider from "../Filters/RangeSlider";
import api from "../../services/api";
import Search from "../Filters/Search";
import "./Listings.scss";

import { Unit } from "../ListingCard/ListingCard";
import { OccupancyRange } from "../../services/api";

export type ListItem = {
  id: string;
  name: string;
  picture: string;
  units: Unit[];
};

type State = {
  listItems: ListItem[];
  defaultPage: number;
  currentPage: number;
  pageLimit: number;
  totalPages: number;
  searchQuery: string;
  availableRefinements: string[];
  selectedRefinements: string[];
  sortOrder: string;
  minOccupancy: number;
  maxOccupancy: number;
  occupancyRange: OccupancyRange;
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
    defaultPage: 1,
    currentPage: 1,
    pageLimit: 5,
    totalPages: 0,
    sortOrder: "",
    minOccupancy: 0,
    maxOccupancy: 0,
    occupancyRange: {
      min: 0,
      max: 0,
    },
  };

  componentDidMount() {
    this.getAvailableRefinements();
    this.getMinMaxOccupancy();
  }

  getMinMaxOccupancy = async () => {
    try {
      const response = await api.getMinMaxOccupancy();
      const { min, max } = response.data;

      this.setState({ minOccupancy: min, maxOccupancy: max });
    } catch (error) {
      console.error(error);
    }
  };

  getAvailableRefinements = async () => {
    try {
      const response = await api.getRefinements();
      const refinements = response.data.filter(
        (refinement: string) => refinement !== null
      );

      this.setState({ availableRefinements: refinements });
    } catch (error) {
      console.error(error);
    }
  };

  handlePageChange = ({ selected }: Page) => {
    const selectedPage = selected + 1;
    this.setState({ currentPage: selectedPage });
  };

  handleSortSelect = async (selectValue: string) => {
    const {
      defaultPage,
      pageLimit,
      searchQuery,
      selectedRefinements,
      occupancyRange,
    } = this.state;
    const sortOrder = selectValue;

    this.setState({ sortOrder });
    try {
      const response = await api.searchListings(
        defaultPage,
        pageLimit,
        searchQuery,
        occupancyRange,
        selectedRefinements.join(","),
        sortOrder
      );
      const { listings } = response.data;
      const { total_pages, current_page } = response.data.meta;

      this.setState({
        listItems: listings,
        totalPages: total_pages,
        currentPage: current_page,
      });
    } catch (error) {
      console.error(error);
    }
  };

  handlePageLimitSelect = async (selectValue: string) => {
    const {
      defaultPage,
      searchQuery,
      selectedRefinements,
      occupancyRange,
      sortOrder,
    } = this.state;
    const pageLimit = parseInt(selectValue);

    this.setState({ pageLimit });

    try {
      const response = await api.searchListings(
        defaultPage,
        pageLimit,
        searchQuery,
        occupancyRange,
        selectedRefinements.join(","),
        sortOrder
      );
      const { listings } = response.data;
      const { total_pages, current_page } = response.data.meta;

      this.setState({
        listItems: listings,
        totalPages: total_pages,
        currentPage: current_page,
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleSearch = (
    searchQuery: string,
    searchResults: ListItem[],
    totalPages: number,
    page: number
  ) => {
    this.setState({
      searchQuery: searchQuery,
      listItems: searchResults,
      totalPages: totalPages,
      currentPage: page,
    });
  };

  handleRefinements = (refinements: string[]) => {
    this.setState({ selectedRefinements: refinements });
  };

  handleRangeChange = (values: [number, number]) => {
    this.setState({
      occupancyRange: {
        min: values[0],
        max: values[1],
      },
    });
  };

  render() {
    return (
      <div className="listings">
        <h2 className="listings__heading">Affordable Housing Listings</h2>
        <SetPageLimitSelect
          onSelect={this.handlePageLimitSelect}
          selectLabel="Items per page:"
          selectOptions={[
            {
              label: "5",
              value: "5",
              default: true,
            },
            {
              label: "10",
              value: "10",
              default: false,
            },
            {
              label: "15",
              value: "15",
              default: false,
            },
            {
              label: "20",
              value: "20",
              default: false,
            },
          ]}
        />
        <SortListSelect
          onSelect={this.handleSortSelect}
          selectLabel="Sort by:"
          selectOptions={[
            {
              label: "A-Z",
              value: "asc",
              default: true,
            },
            {
              label: "Z-A",
              value: "desc",
              default: false,
            },
          ]}
        />
        <Search
          onSearch={this.handleSearch}
          listingsPerPage={this.state.pageLimit}
          page={this.state.currentPage}
          refinements={this.state.selectedRefinements.join(",")}
          occupancyRange={this.state.occupancyRange}
        />
        <h4>Filters</h4>
        <RangeSlider
          minOccupancy={this.state.minOccupancy}
          maxOccupancy={this.state.maxOccupancy}
          onRangeChange={this.handleRangeChange}
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
            currentPage={this.state.currentPage}
            totalPages={this.state.totalPages}
            onPageChange={this.handlePageChange}
          />
        )}
      </div>
    );
  }
}

export default Listings;
