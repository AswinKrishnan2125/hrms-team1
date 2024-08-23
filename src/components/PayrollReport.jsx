import React from 'react';
import { saveAs } from 'file-saver';

const PayrollReport = ({ payrolls }) => {
  const generateReport = () => {
    const reportContent = payrolls.map(p => `Employee: ${p.employeeName}, Salary: ${p.salary}`).join('\n');
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'payroll_report.txt');
  };

  return (
    <div className="mt-4">
      <button onClick={generateReport} className="bg-green-500 text-white p-2 rounded">
        Download Payroll Report
      </button>
    </div>
  );
};

export default PayrollReport;
