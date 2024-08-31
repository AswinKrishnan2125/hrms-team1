


import React, { useState } from 'react';
import Dashboard from './Dashboard';
import PayrollReport from './PayrollReport';
import EmployeeTable from './Directory';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('employeeReport');
  

  const resetReportsVisibility = () => {
    setShowPayrollReport(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'employeeReport':
        return (
          <div className="text-center">
             <section style={{  paddingLeft: '250px' }}>
            <h2 className="text-2xl font-bold mb-4">Employee Report</h2>
            <p className="text-gray-700 mb-4">This is where you can access the Employee Report.</p>
            </section>
            {/* <button 
              onClick={() => setActiveTab('employeeReport')}
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Employee Report
            </button> */}
            <EmployeeTable/>
          
          </div>
        );
      case 'payrollReport':
        return (
          
          <div className="text-center">
            <section style={{  paddingLeft: '250px' }}>
            <h2 className="text-2xl font-bold mb-4">Payroll Report</h2>
            <p className="text-gray-700 mb-4">This is where you can access the Payroll Report.</p>
            {/* <button 
              onClick={() => setShowPayrollReport(true)}
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Payroll Report
            </button> */}
            </section>
            <PayrollReport/>
          </div>
        );
      case 'leaveReport':
        return (
          <div className="text-center">
             <section style={{  paddingLeft: '250px' }}>
            <h2 className="text-2xl font-bold mb-4">Leave Report</h2>
            <p className="text-gray-700 mb-4">This is where you can access the Leave Report.</p>
            {/* <button 
              onClick={() => setActiveTab('leaveReport')}
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Leave Report
            </button> */}
            </section>
          </div>
        );
      case 'performanceReport':
        return (
          <div className="text-center">
             <section style={{  paddingLeft: '250px' }}>
            <h2 className="text-2xl font-bold mb-4">Performance Report</h2>
            <p className="text-gray-700 mb-4">This is where you can access the Performance Report.</p>
            {/* <button 
              onClick={() => setActiveTab('performanceReport')}
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Performance Report
            </button> */}
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Dashboard />
      <section style={{  paddingRight: '0px', paddingTop: '70px' }}>
      <div className="flex-1 flex flex-col">
      <section style={{  paddingLeft: '820px' }}>
        <h1 className=" text-3xl font-bold mb-6 ">Reports</h1>
        </section>
        {/* Tab Navigation */}
        <div className=" flex justify-center space-x-6 mb-4">
        <section style={{  paddingLeft: '250px' }}>
          <button
            onClick={() => { setActiveTab('employeeReport'); resetReportsVisibility(); }}
            className={`py-2 px-4 rounded paddingLeft: '540px' ${activeTab === 'employeeReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Employee Report
          </button>

          <button
            onClick={() => { setActiveTab('payrollReport'); resetReportsVisibility(); }}
            className={`py-2 px-4 rounded  paddingLeft: '40px' ${activeTab === 'payrollReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Payroll Report
          </button>
          <button
            onClick={() => { setActiveTab('leaveReport'); resetReportsVisibility(); }}
            className={`py-2 px-4 rounded ${activeTab === 'leaveReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Leave Report
          </button>
          <button
            onClick={() => { setActiveTab('performanceReport'); resetReportsVisibility(); }}
            className={`py-2 px-4 rounded ${activeTab === 'performanceReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Performance Report
          </button>
          </section>
        </div>
        

        {/* Tab Content */}
        <div className="flex-1 p-4 border-t border-gray-200 bg-white shadow-md rounded-lg">
          {renderTabContent()}
        </div>
      </div>
</section>
      
    </div>
  );
};

export default Reports;
