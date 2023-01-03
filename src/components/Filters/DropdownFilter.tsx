import * as React from "react";

export type SelectOption = {
  label: string;
  value: string;
  default: boolean;
};

type Props = {
  onSelect: (selectValue: number | string) => void;
  selectOptions: SelectOption[];
};

const Select: React.FC<Props> = ({ onSelect, selectOptions }) => {
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

  React.useEffect(() => {
    updateSelectState(selectDefaultValue);
  }, [selectDefaultValue]);

  return (
    <div className="select">
      <label htmlFor="select">Sort by: </label>
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
