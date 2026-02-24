import { useLayoutEffect, useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AccordionContext, useAccordion } from './context';
import './index.css'

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
}

export const Accordion = ({ children }: AccordionProps) => {
  const [activeIds, setActiveIds] = useState<string[] | null>(null);

  const toggle = useCallback((id: string) => {
    setActiveIds((prevActiveIds) =>
      prevActiveIds?.includes(id) ? prevActiveIds.filter((i) => i !== id) : [...(prevActiveIds || []), id]
    );
  }, []);

  return (
    <AccordionContext.Provider value={{ activeIds, toggle }}>
      <div className="accordion-container" style={{ viewTransitionName: "list" }}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  id: string;
  children: ReactNode;
}

export const AccordionItem = ({ children }: AccordionItemProps) => {
  return <div className="accordian-item">{children}</div>;
};

export const AccordionTrigger = ({ id, children }: { id: string; isExpanded?: boolean; children: ReactNode }) => {
  const { activeIds, toggle } = useAccordion();
  const isOpen = activeIds?.includes(id);

  return (
    <div
      onClick={() => { toggle(id);}}
      aria-expanded={isOpen}
      className={`accordion-header ${isOpen ? 'open' : ''}`}
    >
      {children}
      <i className={`bi bi-chevron-down accordian-trigger-btn`}></i>
    </div>
  );
};

export const AccordionContent = ({ id, children }: { id: string; isExpanded?: boolean; children: ReactNode }) => {
  const { activeIds } = useAccordion();
  const isOpen = activeIds?.includes(id);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>("0px");

  useLayoutEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [children, isOpen]);

  return (
    <div
      role="region"
      
      className={`accordion-content ${
        isOpen ? 'open' : ''
      }`}
      style={{
        maxHeight: isOpen ? maxHeight : "0px",
      }}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
};