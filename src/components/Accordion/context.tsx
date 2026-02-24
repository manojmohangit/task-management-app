import { createContext, useContext } from 'react';

type AccordionContextType = {
  activeIds: string[];
  toggle: (id: string, active?: boolean) => void;
  interactedIds: string[];
  setInteraction: (id: string) => void;
};

export const AccordionContext = createContext<AccordionContextType | null>(null);

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('Accordion components must be wrapped in <Accordion />');
  return context;
};