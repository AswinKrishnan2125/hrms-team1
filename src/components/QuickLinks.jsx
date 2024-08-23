





import React, { useState, useEffect } from 'react';

import PieActiveArc from './Cpc';

import { db } from "../fireBaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Dashboard from './Dashboard';

const QuickLinks = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalPayrolls, setTotalPayrolls] = useState(0);

  // Fetch Employee Data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Employee"));
        setTotalEmployees(querySnapshot.docs.length); // Use docs.length instead of size
      } catch (error) {
        console.error("Error fetching employee data: ", error);
      }
    };

    fetchEmployees();
  }, []);

  // Fetch Payroll Data
  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PayrollS"));
        console.log("Payroll Query Snapshot:", querySnapshot); // Log the querySnapshot for debugging
        console.log("Number of Payroll Documents:", querySnapshot.docs.length); // Log the number of documents
        setTotalPayrolls(querySnapshot.docs.length); // Correctly use docs.length
      } catch (error) {
        console.error("Error fetching payroll data: ", error);
      }
    };

    fetchPayrolls();
  }, []);

  return (
    <main className="flex-grow p-6">
      <section className="pl-[240px] pr-0">
        <section>
          <div className="h-8"></div>
          <div className="h-8"></div>
        </section>

        <Dashboard/>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <a className="text-lg font-semibold" href="/directory">Total Employees</a>
              <p className="text-2xl">{totalEmployees}</p>
            </div>
            <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <a className="text-lg font-semibold" href="/" >Today's Attendance</a>
              <p className="text-2xl">15</p>
            </div>
            <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <a className="text-lg font-semibold" href="/" >On Leave</a>
              <p className="text-2xl">8</p>
            </div>
            <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <a className="text-lg font-semibold" href="/payroll" >Payroll</a>
              <p className="text-2xl">{totalPayrolls}</p>
            </div>
          </div>
          
          {/* Right Side: Pie Chart */}
          <div className="md:col-span-1">
            <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-lg font-semibold mb-4">Employee Distribution</h2>
              <PieActiveArc/> 
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
};

export default QuickLinks;
