import * as React from "react";
import _ from "lodash";
import { Listing } from "../Listings/Listings";

export type Filter = {
  label: string;
  value: string;
  filterProperty: string;
  default: boolean;
};

type Props = {
  filterItems: Listing[];
  onFilter: (filterItems: Listing[]) => void;
  filters: Filter[];
};

const DropdownFilter: React.FC<Props> = ({
  filterItems,
  filters,
  onFilter,
}) => {
  const filterTypeDefault = filters.filter((item) => item.default === true)[0]
    .value;
  const [selectState, setState] = React.useState(filterTypeDefault);
  const updateSelectState = (newValue: string) => setState(newValue);

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterType = event.target.value;
    updateSelectState(filterType);
    const filteredItems = sortFilterItems(filterItems, filterType);
    onFilter(filteredItems);
  };

  const sortFilterItems = (filterItems: Listing[], filterType: string) => {
    switch (filterType) {
      case "az":
        return _.sortBy(
          filterItems,
          filters.filter((item) => item.value === "az")[0].filterProperty
        );
      case "za":
        return _.sortBy(
          filterItems,
          filters.filter((item) => item.value === "az")[0].filterProperty
        ).reverse();
      default:
        return filterItems;
    }
  };

  const filterListings = React.useCallback(
    (filterType: string) => {
      updateSelectState(filterTypeDefault);
      const filteredItems = sortFilterItems(filterItems, filterType);
      onFilter(filteredItems);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterItems, filterTypeDefault, onFilter]
  );

  React.useEffect(() => {
    filterListings(filterTypeDefault);
  }, [filterTypeDefault, filterListings]);

  return (
    <div className="filter">
      <label htmlFor="filter">Sort by: </label>
      <select id="filter" value={selectState} onChange={handleFilter}>
        {filters.map((filter, index) => (
          <option key={index} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownFilter;
