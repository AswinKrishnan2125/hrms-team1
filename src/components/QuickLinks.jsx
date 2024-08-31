

import React, { useState, useEffect } from 'react';
import { db } from "../fireBaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Dashboard from './Dashboard';
import PieActiveArc from '../components/Cpc'; // Adjust the import path as needed

const QuickLinks = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [payrollData, setPayrollData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [totalDepartments, setTotalDepartments] = useState(0);

  // Fetch Employee Data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Employee"));
        setTotalEmployees(querySnapshot.docs.length);
      } catch (error) {
        console.error("Error fetching employee data: ", error);
      }
    };

    fetchEmployees();
  }, []);

  // Fetch Payroll Data
  useEffect(() => {
    const fetchPayrolls = async () => {
      const payrollsCollection = collection(db, "Payrolls");
      const payrollSnapshot = await getDocs(payrollsCollection);
      const payrollList = payrollSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPayrollData(payrollList);
    };
    fetchPayrolls();
  }, []);

  // Fetch Department Data
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Departments"));
        const departmentsData = querySnapshot.docs.map(doc => doc.data());
        setDepartments(departmentsData);
        setTotalDepartments(departmentsData.length);
      } catch (error) {
        console.error("Error fetching department data: ", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <main className="flex-grow p-6">
      <section className="pl-[240px] pr-0">
        <section>
          <div className="h-8"></div>
          <div className="h-8"></div>
          <div className="h-8"></div>
        </section>

        <Dashboard />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <a className="text-lg font-semibold" href="/directory">Total Employees</a>
              <p className="text-2xl">{totalEmployees}</p>
            </div>
            <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <a className="text-lg font-semibold" href="/department-management">Department</a>
              <p className="text-2xl">{totalDepartments}</p>
            </div>
            <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <a className="text-lg font-semibold" href="/leave">On Leave</a>
              <p className="text-2xl">8</p>
            </div>
            <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <a className="text-lg font-semibold" href="/payroll">Payroll</a>
              <p className="text-2xl">{payrollData.length}</p>
            </div>
          </div>
          
          {/* Right Side: Pie Chart */}
          <div className="md:col-span-1">
            <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-lg font-semibold mb-4">Department Distribution</h2>
              <PieActiveArc departments={departments} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default QuickLinks;












