import React, { useState } from 'react';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    image: '',
    name: '',
    password: '',
    joiningDate: '',
    phoneNumber: '',
    email: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employee Data:', employee);
    // Handle form submission (e.g., send data to the server)
  };

  const handleCancel = () => {
    setEmployee({
      image: '',
      name: '',
      password: '',
      joiningDate: '',
      phoneNumber: '',
      email: '',
      role: ''
    });
  };

  const handleUpdate = () => {
    console.log('Updated Employee Data:', employee);
    // Handle employee data update (e.g., send data to the server)
  };

  return (
    <div className="min-h-screen flex  justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold border border-gray-300 rounded-lg py-2 px-3 w-full text-center sm:text-left">
              Add new employee
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-2">
                <img
                  src={employee.image || 'https://via.placeholder.com/150'}
                  alt="Employee"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setEmployee((prevEmployee) => ({
                      ...prevEmployee,
                      image: reader.result
                    }));
                  };
                  reader.readAsDataURL(file);
                }}
                className="text-sm text-gray-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={employee.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={employee.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Joining Date:</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={employee.joiningDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Role:</label>
                <input
                  type="text"
                  name="role"
                  value={employee.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end mt-6 space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              Update
            </button>

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
