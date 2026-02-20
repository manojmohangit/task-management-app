import React from 'react';

export interface OptionProps {
  value: string | number;
  label: React.ReactNode;
  onSelect?: (value: string | number, label: React.ReactNode) => void;
  isSelected?: boolean;
}

export const Option: React.FC<OptionProps> = ({ value, label, onSelect, isSelected }) => {
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