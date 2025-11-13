"use client";
import { createContext, useContext, useState } from "react";

type VisibilityContextType = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: () => void;
  toggleClose: () => void;
};

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const VisibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleClose = () => setIsOpen(false)

  return (
    <VisibilityContext.Provider value={{ isVisible, setIsVisible, isOpen, setIsOpen, toggleOpen, toggleClose}}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = () => {
  const context = useContext(VisibilityContext);
  if (!context) throw new Error("useVisibility must be used inside VisibilityProvider");
  return context;
};
