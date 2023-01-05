export type SelectOption = {
  label: string;
  value: string;
  default: boolean;
};

export type Props = {
  onSelect: (selectValue: string) => void;
  selectLabel: string;
  selectOptions: SelectOption[];
};
