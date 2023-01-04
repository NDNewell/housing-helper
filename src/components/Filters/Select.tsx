import * as React from "react";

export type SelectOption = {
  label: string;
  value: string;
  default: boolean;
};

type Props = {
  onSelect: (selectValue: string) => void;
  selectLabel: string;
  selectOptions: SelectOption[];
};

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
    <div className="select">
      <label htmlFor="select">{selectLabel}</label>
      <select id="select" value={selectState} onChange={handleSelect}>
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
