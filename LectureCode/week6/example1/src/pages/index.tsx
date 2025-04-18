import { EmployeeProvider } from "../context/EmployeeContext";
import { EmployeeList } from "../components/EmployeeList";

export default function Home() {
  return (
    <EmployeeProvider>
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">
            Employee Salary Management
          </h1>
          <EmployeeList />
        </div>
      </div>
    </EmployeeProvider>
  );
}
