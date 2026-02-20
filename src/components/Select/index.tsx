import { Children, useState, useRef, useEffect, isValidElement, cloneElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { OptionProps } from './Option';
import './index.css';

interface SelectProps {
  children: ReactElement<OptionProps> | ReactElement<OptionProps>[];
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
}

export const Select = ({ 
  children, 
  name, 
  placeholder = "Select an option", 
  defaultValue = "" 
}:SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number>(defaultValue);
  const [selectedLabel, setSelectedLabel] = useState<ReactNode>(placeholder);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync Label on Mount
  useEffect(() => {
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.props.value === defaultValue) {
        setSelectedLabel(child.props.label);
      }
    });
  }, [defaultValue, children]);

  const handleSelect = (value: string | number, label: ReactNode) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    setIsOpen(false);
  };

  return (
    <div className="select-container" ref={containerRef}>
      <input type="hidden" name={name} value={selectedValue} />
      
      <button 
        type="button" 
        className="select-btn btn" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel}
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </button>

      <ul className={`select-dropdown ${isOpen ? 'is-open' : ''}`}>
        {Children.map(children, (child) => {
          if (isValidElement<OptionProps>(child)) {
            return cloneElement(child as ReactElement<OptionProps>, { 
              onSelect: handleSelect,
              isSelected: child.props.value === selectedValue 
            });
          }
          return child;
        })}
      </ul>
    </div>
  );
};