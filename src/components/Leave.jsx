import React, { useState } from 'react';
import Dashboard from './Dashboard';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../fireBaseConfig';

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    Employee: '',
    StartDate: '',
    EndDate: '',
    LeaveType: '',
    Reasons: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'LeaveApplication'), {
        Employee: formData.Employee,
        StartDate: formData.StartDate,
        EndDate: formData.EndDate,
        LeaveType: formData.LeaveType,
        Reasons: formData.Reasons,
        createdAt: new Date(),  // Optional: Add a timestamp
      });
      console.log("Document successfully written!");
      setFormData({
        Employee: '',
        StartDate: '',
        EndDate: '',
        LeaveType: '',
        Reasons: '',
      });
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col lg:flex-row justify-center items-center min-h-screen p-4 sm:p-8 lg:p-12 lg:ml-[150px]">
      <Dashboard />
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 lg:p-10 h-[82vh] rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-[100%] lg:ml-12 xl:ml-16"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-5 text-center">
          Leave Application
        </h2>

        {/* Employee Input */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <label className="block text-gray-700 dark:text-gray-200 text-sm lg:text-base font-bold mb-2" htmlFor="employee">
            Employee
          </label>
          <input
            type="text"
            name="Employee"
            value={formData.Employee}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Employee Name"
            required
          />
        </div>

        <div className="mb-4 sm:mb-6 lg:mb-8">
          <label className="block text-gray-700 dark:text-gray-200 text-sm lg:text-base font-bold mb-2" htmlFor="startDate">
            Start Date
          </label>
          <input
            type="date"
            name="StartDate"
            value={formData.StartDate}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 sm:mb-6 lg:mb-8">
          <label className="block text-gray-700 dark:text-gray-200 text-sm lg:text-base font-bold mb-2" htmlFor="endDate">
            End Date
          </label>
          <input
            type="date"
            name="EndDate"
            value={formData.EndDate}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 sm:mb-6 lg:mb-8">
          <label className="block text-gray-700 dark:text-gray-200 text-sm lg:text-base font-bold mb-2" htmlFor="leaveType">
            Leave Type
          </label>
          <select
            name="LeaveType"
            value={formData.LeaveType}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Leave Type</option>
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="earned">Earned Leave</option>
          </select>
        </div>

        <div className="mb-4 sm:mb-6 lg:mb-4">
          <label className="block text-gray-700 dark:text-gray-200 text-sm lg:text-base font-bold mb-2" htmlFor="reasons">
            Reasons
          </label>
          <input
            type="text"
            name="Reasons"
            value={formData.Reasons}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your reasons"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="Submit"
            className="bg-blue-600 text-white font-bold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveForm;
