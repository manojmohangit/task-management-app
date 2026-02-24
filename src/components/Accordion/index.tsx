import { useLayoutEffect, useCallback, useRef, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AccordionContext, useAccordion } from './context';
import './index.css'

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  onChange?: (activeIds: string[]) => void;
  activeIds?: string[];
}

export const Accordion = ({ children, allowMultiple=true, onChange, activeIds: controlledActiveIds }: AccordionProps) => {
  const [internalActiveIds, setInternalActiveIds] = useState<string[]>([]);
  const [interactedIds, setInteractedIds] = useState<string[]>([]);
  const timersRef = useRef<Record<string, number>>({});

  const toggle = useCallback((id: string, active?: boolean) => {
    const getNext = (prevActiveIds: string[]) => {
      if (allowMultiple) {
        return prevActiveIds?.includes(id) ? (active ? prevActiveIds : prevActiveIds?.filter((i) => i !== id)) : [...(prevActiveIds || []), id];
      }
      return prevActiveIds?.includes(id) ? [] : [id];
    };

    if (controlledActiveIds !== undefined) {
      const next = getNext(controlledActiveIds);
      onChange?.(next);
    } else {
      setInternalActiveIds((prev) => {
        const next = getNext(prev);
        onChange?.(next);
        return next;
      });
    }
  }, [allowMultiple, controlledActiveIds, onChange]);

  useEffect(() => {
    if (controlledActiveIds === undefined) {
      onChange?.(internalActiveIds);
    }
  },[internalActiveIds, controlledActiveIds, onChange])

  const activeIds = controlledActiveIds ?? internalActiveIds;

  const setInteraction = useCallback((id: string) => {
    setInteractedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
    }
    const timer = window.setTimeout(() => {
      setInteractedIds((prev) => prev.filter((i) => i !== id));
      delete timersRef.current[id];
    }, 300);
    timersRef.current[id] = timer as unknown as number;
  }, []);

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <AccordionContext.Provider value={{ activeIds, toggle, interactedIds, setInteraction }}>
      <div className="accordion-container" style={{ viewTransitionName: "list" }}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  id: string;
  children: ReactNode;
  isExpanded?: boolean;
}

export const AccordionItem = ({ id, isExpanded, children }: AccordionItemProps) => {
  const { activeIds, toggle, interactedIds } = useAccordion();

  useEffect(() => {
    if (!interactedIds.includes(id)) {
      if (isExpanded) {
        toggle(id, true);
      } else if (isExpanded === false && activeIds.includes(id)) {
        toggle(id, false);
      }
    }
  }, [isExpanded, id, toggle, interactedIds, activeIds]);

  return <div className="accordian-item">{children}</div>;
};

export const AccordionTrigger = ({ id, children }: { id: string; children: ReactNode }) => {
  const { activeIds, toggle, setInteraction } = useAccordion();
  const isOpen = activeIds?.includes(id);

  return (
    <div
      onClick={() => { setInteraction(id); toggle(id); }}
      aria-expanded={isOpen}
      className={`accordion-header ${isOpen ? 'open' : ''}`}
    >
      {children}
      <i className={`bi bi-chevron-down accordian-trigger-btn`}></i>
    </div>
  );
};

export const AccordionContent = ({ id, children }: { id: string; children: ReactNode }) => {
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