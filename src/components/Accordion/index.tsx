import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { AccordionContext, useAccordion } from './context';
import './index.scss'

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
}

export const Accordion = ({ children, allowMultiple = false }: AccordionProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <AccordionContext.Provider value={{ activeId, toggle }}>
      <div className="accordion-container">
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ id, children }: { id: string; children: ReactNode }) => {
  return <div className="accordian-item">{children}</div>;
};

export const AccordionTrigger = ({ id, children }: { id: string; children: ReactNode }) => {
  const { activeId, toggle } = useAccordion();
  const isOpen = activeId === id;

  return (
    <div
      onClick={() => toggle(id)}
      aria-expanded={isOpen}
      className={`accordion-header ${isOpen ? 'show' : ''}`}
    >
      {children}
      <i className={`bi bi-caret-down-fill accordian-trigger-btn`}></i>
    </div>
  );
};

export const AccordionContent = ({ id, children }: { id: string; children: ReactNode }) => {
  const { activeId } = useAccordion();
  const isOpen = activeId === id;

  return (
    <div
      role="region"
      className={`accordion-content ${
        isOpen ? 'show' : ''
      }`}
    >
      {children}
    </div>
  );
};