import * as React from "react";
import axios from "axios";
import api from "../../services/api";
import { Listing } from "../Listings/Listings";

type Props = {
  listingsPerPage: number;
  onSearch: (filterItems: Listing[]) => void;
};

const Search: React.FC<Props> = ({ onSearch, listingsPerPage }) => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchSubmit = () => {
    search(searchValue);
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue((event.target as HTMLInputElement).value);
  };

  const search = (query: string) => {
    console.log(query);
    axios
      .get(
        query
          ? api.search(query, listingsPerPage)
          : api.emptySearch(listingsPerPage)
      )
      .then((response) => {
        const searchResults = response.data;
        onSearch(searchResults);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="filters__search">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="Search for a property"
          value={searchValue}
        ></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
