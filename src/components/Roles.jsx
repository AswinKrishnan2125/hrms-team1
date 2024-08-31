import React, { useState } from 'react';
import Dashboard from './Dashboard';


const Role = () => {
  // Hardcoded user role (this would normally come from authentication)
  const [loggedInUserRole] = useState('SuperAdmin'); // Possible values: 'SuperAdmin', 'HR', 'Manager'
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeRole, setNewEmployeeRole] = useState('Employee');
  const [addedEmployees, setAddedEmployees] = useState([]); // List to store added employees

  const handleNameChange = (e) => {
    setNewEmployeeName(e.target.value);
  };

  const handleRoleChange = (e) => {
    setNewEmployeeRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check role-based restrictions
    if (loggedInUserRole === 'Manager' && newEmployeeRole !== 'Employee') {
      alert("Managers can only assign the Employee role.");
    } else if (loggedInUserRole === 'HR' && newEmployeeRole === 'HR') {
      alert("HR cannot assign the HR role.");
    } else {
      // Add the new employee to the list with a timestamp
      setAddedEmployees([
        ...addedEmployees,
        { 
          addedBy: loggedInUserRole, 
          employeeName: newEmployeeName, 
          employeeRole: newEmployeeRole, 
          addedTime: new Date().toLocaleString() // Add current date and time
        }
      ]);
      alert(`Employee ${newEmployeeName} added as ${newEmployeeRole}`);
      // Clear the input fields after submission
      setNewEmployeeName('');
      setNewEmployeeRole('Employee');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <Dashboard/>
        <section>
          <div className="h-8"></div>
          {/* <div className="h-8"></div> */}
          <div className="h-8"></div>
        </section>
      <form className="bg-white shadow-md rounded px-8 pt-18 pb-8 mb-4 w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Add Role</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Employee Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter employee name"
            value={newEmployeeName}
            onChange={handleNameChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Assign Role
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            value={newEmployeeRole}
            onChange={handleRoleChange}
            required
          >
            {/* Conditional rendering based on logged-in user's role */}
            {loggedInUserRole === 'SuperAdmin' && (
              <>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </>
            )}
            {loggedInUserRole === 'HR' && (
              <>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </>
            )}
            {loggedInUserRole === 'Manager' && (
              <option value="Employee">Employee</option>
            )}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Role
          </button>
        </div>
      </form>

      {/* Display the table of added employees */}
      <div className="w-full max-w-4xl mt-8">
        <h3 className="text-xl font-bold mb-4">Who Added Whom</h3>
        {addedEmployees.length === 0 ? (
          <p className="text-gray-700">No employees added yet.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-200">Employee Name</th>
                <th className="px-4 py-2 border-b border-gray-200">Role</th>
                <th className="px-4 py-2 border-b border-gray-200">Added By</th>
                <th className="px-4 py-2 border-b border-gray-200">Added Time</th>
              </tr>
            </thead>
            <tbody>
              {addedEmployees.map((entry, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b border-gray-200">{entry.employeeName}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{entry.employeeRole}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{entry.addedBy}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{entry.addedTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Role;




