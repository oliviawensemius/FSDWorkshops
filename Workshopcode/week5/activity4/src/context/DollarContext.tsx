import { createContext, useContext, useState, ReactNode } from "react";

interface DollarContextType {
  total: number;
  addDollars: (amount: number) => void;
  resetDollars: () => void;
}

const DollarContext = createContext<DollarContextType | undefined>(undefined);

export function DollarProvider({ children }: { children: ReactNode }) {
  const [total, setTotal] = useState(0);

  const addDollars = (amount: number) => {
    setTotal((prev) => prev + amount);
  };

  const resetDollars = () => {
    setTotal(0);
  };

  return (
    <DollarContext.Provider value={{ total, addDollars, resetDollars }}>
      {children}
    </DollarContext.Provider>
  );
}

export function useDollarContext() {
  const context = useContext(DollarContext);
  if (context === undefined) {
    throw new Error("useDollarContext must be used within a DollarProvider");
  }
  return context;
}
