import * as React from "react";
import _ from "lodash";
import api from "../../services/api";
import { ListItem } from "../Listings/Listings";

import { OccupancyRange } from "../../services/api";

type Props = {
  onSearch: (
    searchQuery: string,
    searchResults: ListItem[],
    totalPages: number,
    page: number
  ) => void;
  page: number;
  pageLimit: number;
  occupancyRange: OccupancyRange;
  refinements: string;
  sortOrder: string;
};

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
    <div className="filters__search">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="Search for a property"
          value={searchQuery}
        ></input>
        <button type="button" onClick={handleClear} disabled={!searchQuery}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default Search;
