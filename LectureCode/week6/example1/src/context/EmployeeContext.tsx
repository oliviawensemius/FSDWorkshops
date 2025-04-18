import { createContext, useContext, useState, ReactNode } from "react";

interface Employee {
  id: number;
  name: string;
  salary: number;
}

interface EmployeeContextType {
  employees: Employee[];
  updateSalary: (id: number, newSalary: number) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "John Doe", salary: 50000 },
    { id: 2, name: "Jane Smith", salary: 60000 },
    { id: 3, name: "Bob Johnson", salary: 55000 },
  ]);

  const updateSalary = (id: number, newSalary: number) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, salary: newSalary } : emp
      )
    );
  };

  return (
    <EmployeeContext.Provider value={{ employees, updateSalary }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployeeContext() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  return context;
}
