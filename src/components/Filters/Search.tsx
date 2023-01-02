import * as React from "react";
import _ from "lodash";
import axios from "axios";
import api from "../../services/api";
import { Listing } from "../Listings/Listings";

type Props = {
  listingsPerPage: number;
  onSearch: (filterItems: Listing[]) => void;
};

const Search: React.FC<Props> = ({ onSearch, listingsPerPage }) => {
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

  const search = _.debounce((searchQuery: string) => {
    console.log(searchQuery);
    axios
      .get(
        searchQuery
          ? api.search(searchQuery, listingsPerPage)
          : api.emptySearch(listingsPerPage)
      )
      .then((response) => {
        const searchResults = response.data;
        onSearch(searchResults);
      })
      .catch((error) => {
        console.log(error);
      });
  }, 500);

  React.useEffect(() => {
    search(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

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
