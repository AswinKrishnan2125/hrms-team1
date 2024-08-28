



// import React, { useState, useEffect } from 'react';
// import { db } from "../fireBaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import Dashboard from './Dashboard';
// import PieActiveArc from './Cpc'; // Assuming PieActiveArc is in Cpc.js

// const QuickLinks = () => {
//   const [totalEmployees, setTotalEmployees] = useState(0);
//   const [totalPayrolls, setTotalPayrolls] = useState(0);
//   const [departments, setDepartments] = useState([]);

//   // Fetch Employee Data
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "Employee"));
//         setTotalEmployees(querySnapshot.docs.length);
//       } catch (error) {
//         console.error("Error fetching employee data: ", error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   // Fetch Payroll Data
//   useEffect(() => {
//     const fetchPayrolls = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "PayrollS"));
//         setTotalPayrolls(querySnapshot.docs.length);
//       } catch (error) {
//         console.error("Error fetching payroll data: ", error);
//       }
//     };

//     fetchPayrolls();
//   }, []);

//   // Fetch Department Data
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "Departments")); // Adjust the collection name as needed
//         const departmentsData = querySnapshot.docs.map(doc => doc.data());
//         setDepartments(departmentsData);
//       } catch (error) {
//         console.error("Error fetching department data: ", error);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   return (
//     <main className="flex-grow p-6">
//       <section className="pl-[240px] pr-0">
//         <section>
//           <div className="h-8"></div>
//           <div className="h-8"></div>
//           <div className="h-8"></div>
//         </section>

//         <Dashboard />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="md:col-span-2 grid grid-cols-2 gap-4">
//             <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//               <a className="text-lg font-semibold" href="/directory">Total Employees</a>
//               <p className="text-2xl">{totalEmployees}</p>
//             </div>
//             <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//               <a className="text-lg font-semibold" href="/department-management" >Department</a>
//               <p className="text-2xl">15</p>
//             </div>
//             <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//               <a className="text-lg font-semibold" href="/" >On Leave</a>
//               <p className="text-2xl">8</p>
//             </div>
//             <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//               <a className="text-lg font-semibold" href="/payroll" >Payroll</a>
//               <p className="text-2xl">{totalPayrolls}</p>
//             </div>
//           </div>
          
//           {/* Right Side: Pie Chart */}
//           <div className="md:col-span-1">
//             <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//               <h2 className="text-lg font-semibold mb-4">Department Distribution</h2>
//               <PieActiveArc departments={departments} />
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default QuickLinks;











import React, { useState, useEffect } from 'react';
import { db } from "../fireBaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Dashboard from './Dashboard';
import PieActiveArc from './Cpc'; // Assuming PieActiveArc is in Cpc.js

const QuickLinks = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalPayrolls, setTotalPayrolls] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [totalDepartments, setTotalDepartments] = useState(0); // State for total departments

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
      try {
        const querySnapshot = await getDocs(collection(db, "PayrollS"));
        setTotalPayrolls(querySnapshot.docs.length);
      } catch (error) {
        console.error("Error fetching payroll data: ", error);
      }
    };

    fetchPayrolls();
  }, []);

  // Fetch Department Data
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Departments")); // Adjust the collection name as needed
        const departmentsData = querySnapshot.docs.map(doc => doc.data());
        setDepartments(departmentsData);
        setTotalDepartments(departmentsData.length); // Set total departments
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
              <a className="text-lg font-semibold" href="/">On Leave</a>
              <p className="text-2xl">8</p>
            </div>
            <div className="text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <a className="text-lg font-semibold" href="/payroll">Payroll</a>
              <p className="text-2xl">{totalPayrolls}</p>
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
