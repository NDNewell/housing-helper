import * as React from "react";
import _ from "lodash";
import { Listing } from "../Listings/Listings";

type Props = {
  listings: Listing[];
  onFilter: (listings: Listing[]) => void;
};

const Filter: React.FC<Props> = ({ listings, onFilter }) => {
  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterType = event.target.value;
    let filteredListings: Listing[];
    if (filterType === "az") {
      filteredListings = _.sortBy(listings, "name");
    } else {
      filteredListings = _.sortBy(listings, "name").reverse();
    }
    onFilter(filteredListings);
  };

  return (
    <div className="filter">
      <label htmlFor="filter">Filter:</label>
      <select id="filter" onChange={handleFilter}>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </div>
  );
};

export default Filter;
