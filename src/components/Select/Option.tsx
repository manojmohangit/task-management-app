import type { ReactNode } from 'react';

export interface OptionProps {
  value: string | number;
  label: ReactNode;
  onSelect?: (value: string | number, label: ReactNode) => void;
  isSelected?: boolean;
}

export const Option = ({ value, label, onSelect, isSelected }: OptionProps) => {
  return (
    <li 
      className={`select-option ${isSelected ? 'is-selected' : ''}`}
      onClick={() => onSelect?.(value, label)}
      role="option"
      aria-selected={isSelected}
    >
      <span className="option-label">{label}</span>
    </li>
  );
};