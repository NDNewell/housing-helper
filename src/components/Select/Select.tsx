import * as React from "react";

import { Props } from "./types";

const Select: React.FC<Props> = ({ onSelect, selectLabel, selectOptions }) => {
  const selectDefaultValue = selectOptions.filter(
    (item) => item.default === true
  )[0].value;
  const [selectState, setState] = React.useState(selectDefaultValue);

  const updateSelectState = (newValue: string) => setState(newValue);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = event.target.value;
    updateSelectState(selectValue);
    onSelect(selectValue);
  };

  return (
    <div className="select" aria-label={selectLabel}>
      <label htmlFor="select">{selectLabel}</label>
      <select
        id="select"
        value={selectState}
        onChange={handleSelect}
        aria-labelledby="select"
      >
        {selectOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
