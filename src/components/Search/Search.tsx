import * as React from "react";
import "./search.scss";

import _ from "lodash";

import api from "../../services/api";
import { Props } from "./types";

const Search: React.FC<Props> = ({
  onSearch,
  page,
  pageLimit,
  refinements,
  occupancyRange,
  sortOrder,
}: Props) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search(searchQuery);
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSearchQuery("");
    search("");
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchQuery((event.target as HTMLInputElement).value);
  };

  const search = _.debounce(
    async (searchQuery: string) => {
      try {
        const response = await api.searchListings(
          page,
          pageLimit,
          searchQuery,
          occupancyRange,
          refinements,
          sortOrder
        );
        const searchResults = response.data.listings;
        const totalPages = response.data.meta.total_pages;

        onSearch(searchQuery, searchResults, totalPages, page);
      } catch (error) {
        console.error(error);
      }
    },
    500,
    { leading: true, trailing: false }
  );

  React.useEffect(() => {
    search(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page, refinements, occupancyRange, sortOrder, pageLimit]);

  return (
    <div className="search">
      <div className="search__form">
        <form onSubmit={handleSearchSubmit}>
          <label htmlFor="search-input" aria-label="Search for a property">
            <input
              id="search-input"
              type="text"
              onChange={onChange}
              placeholder="Search for a property"
              value={searchQuery}
            ></input>
          </label>
          <button
            type="button"
            onClick={handleClear}
            disabled={!searchQuery}
            aria-label="Clear search"
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
