import * as React from "react";
import "./content.scss";

import api from "../../services/api";
import { State, ListItem, Page } from "./types";

import Pagination from "../Pagination/Pagination";
import Refinements from "../Refinements/Refinements";
import RangeSlider from "../RangeSlider/RangeSlider";
import Search from "../Search/Search";
import SetPageLimitSelect from "../Select/Select";
import SortListSelect from "../Select/Select";
import Card from "../Card/Card";

class Content extends React.Component<{}, State> {
  state: State = {
    listItems: [],
    searchQuery: "",
    availableRefinements: [],
    selectedRefinements: [],
    defaultPage: 1,
    currentPage: 1,
    pageLimit: 10,
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

  handlePageChange = ({ selected }: Page) => {
    const selectedPage = selected + 1;
    this.setState({ currentPage: selectedPage });
  };

  handleSortSelect = async (selectValue: string) => {
    this.setState({ sortOrder: selectValue });
  };

  handlePageLimitSelect = async (selectValue: string) => {
    this.setState({
      currentPage: this.state.defaultPage,
      pageLimit: parseInt(selectValue),
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
      <section className="content">
        <section className="header">
          <h5 className="content__heading">Find a place to live</h5>
        </section>
        <section className="search">
          <Search
            onSearch={this.handleSearch}
            page={this.state.currentPage}
            pageLimit={this.state.pageLimit}
            refinements={this.state.selectedRefinements.join(",")}
            occupancyRange={this.state.occupancyRange}
            sortOrder={this.state.sortOrder}
          />
        </section>
        <section className="filters">
          <RangeSlider
            minOccupancy={this.state.minOccupancy}
            maxOccupancy={this.state.maxOccupancy}
            onRangeChange={this.handleRangeChange}
          />
          <Refinements
            refinements={this.state.availableRefinements}
            onSave={this.handleRefinements}
          />
        </section>
        <section className="results">
          <div className="results__heading">
            <SetPageLimitSelect
              onSelect={this.handlePageLimitSelect}
              selectLabel="Items per page:"
              selectOptions={[
                {
                  label: "10",
                  value: "10",
                  default: true,
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
          </div>
          <div className="results__list">
            {this.state.listItems.map((listing) => (
              <Card
                key={listing.id}
                id={listing.id}
                name={listing.name}
                picture={listing.picture}
                units={listing.units}
              />
            ))}
          </div>
        </section>
        <section className="page-controls">
          {this.state.totalPages > 1 && (
            <Pagination
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
              onPageChange={this.handlePageChange}
            />
          )}
        </section>
      </section>
    );
  }
}

export default Content;
