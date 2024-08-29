// import React, { useState } from 'react';

// const Reports = () => {
//   // State to track the active tab
//   const [activeTab, setActiveTab] = useState('employeeReport');

//   // Function to render content based on the active tab
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'employeeReport':
//         return (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Employee Report</h2>
//             <p className="text-gray-700">This is where you can access the Employee Report.</p>
//             <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//               View Employee Report
//             </button>
//           </div>
//         );
//       case 'payrollReport':
//         return (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Payroll Report</h2>
//             <p className="text-gray-700">This is where you can access the Payroll Report.</p>
//             <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//               View Payroll Report
//             </button>
//           </div>
//         );
//       case 'leaveReport':
//         return (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Leave Report</h2>
//             <p className="text-gray-700">This is where you can access the Leave Report.</p>
//             <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//               View Leave Report
//             </button>
//           </div>
//         );
//       case 'performanceReport':
//         return (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Performance Report</h2>
//             <p className="text-gray-700">This is where you can access the Performance Report.</p>
//             <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//               View Performance Report
//             </button>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl">
//         <h1 className="text-3xl font-bold mb-6 text-center">Reports</h1>

//         {/* Tab Navigation */}
//         <div className="flex justify-center space-x-4 mb-8">
//           <button
//             onClick={() => setActiveTab('employeeReport')}
//             className={`py-2 px-4 rounded ${activeTab === 'employeeReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//           >
//             Employee Report
//           </button>
//           <button
//             onClick={() => setActiveTab('payrollReport')}
//             className={`py-2 px-4 rounded ${activeTab === 'payrollReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//           >
//             Payroll Report
//           </button>
//           <button
//             onClick={() => setActiveTab('leaveReport')}
//             className={`py-2 px-4 rounded ${activeTab === 'leaveReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//           >
//             Leave Report
//           </button>
//           <button
//             onClick={() => setActiveTab('performanceReport')}
//             className={`py-2 px-4 rounded ${activeTab === 'performanceReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//           >
//             Performance Report
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="p-4 border-t border-gray-200">
//           {renderTabContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reports;




import React, { useState } from 'react';
import Dashboard from './Dashboard';

const Reports = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('employeeReport');

  // Function to render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'employeeReport':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Employee Report</h2>
            <p className="text-gray-700 mb-4">This is where you can access the Employee Report.</p>
            <a 
              href="/employee-report" 
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Employee Report
            </a>
          </div>
        );
      case 'payrollReport':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payroll Report</h2>
            <p className="text-gray-700 mb-4">This is where you can access the Payroll Report.</p>
            <a 
              href="/payroll-report" 
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Payroll Report
            </a>
          </div>
        );
      case 'leaveReport':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Leave Report</h2>
            <p className="text-gray-700 mb-4">This is where you can access the Leave Report.</p>
            <a 
              href="/leave-report" 
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Leave Report
            </a>
          </div>
        );
      case 'performanceReport':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Performance Report</h2>
            <p className="text-gray-700 mb-4">This is where you can access the Performance Report.</p>
            <a 
              href="/performance-report" 
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Performance Report
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Dashboard/>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Reports</h1>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('employeeReport')}
            className={`py-2 px-4 rounded ${activeTab === 'employeeReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Employee Report
          </button>
          <button
            onClick={() => setActiveTab('payrollReport')}
            className={`py-2 px-4 rounded ${activeTab === 'payrollReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Payroll Report
          </button>
          <button
            onClick={() => setActiveTab('leaveReport')}
            className={`py-2 px-4 rounded ${activeTab === 'leaveReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Leave Report
          </button>
          <button
            onClick={() => setActiveTab('performanceReport')}
            className={`py-2 px-4 rounded ${activeTab === 'performanceReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Performance Report
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 border-t border-gray-200">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Reports;
