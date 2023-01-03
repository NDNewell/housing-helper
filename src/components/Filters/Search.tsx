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
  refinements: string[];
};

const Search: React.FC<Props> = ({
  onSearch,
  listingsPerPage,
  page,
  refinements,
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
          listingsPerPage,
          searchQuery,
          refinements
        );
        const searchResults = response.data.listings;
        const totalPages = response.data.meta.totalPages;

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
  }, [searchQuery, page, refinements]);

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
