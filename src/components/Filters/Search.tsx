import * as React from "react";
import _ from "lodash";
import api from "../../services/api";
import { Listing } from "../Listings/Listings";

type Props = {
  onSearch: (
    searchResults: Listing[],
    totalPages: number,
    page: number
  ) => void;
  listingsPerPage: number;
  page: number;
};

const Search: React.FC<Props> = ({ onSearch, listingsPerPage, page }) => {
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
        let response;
        searchQuery
          ? (response = await api.search(page, listingsPerPage, searchQuery))
          : (response = await api.emptySearch(page, listingsPerPage));
        const searchResults = response.data;
        const totalCount = Number(response.headers["x-total-count"]);
        const totalPages = Math.ceil(totalCount / listingsPerPage);

        onSearch(searchResults, totalPages, page);
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
  }, [searchQuery, page]);

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
