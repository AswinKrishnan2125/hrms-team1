import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

const PayrollTable = ({ payrolls, deletePayroll, editPayroll }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="p-4 border">Employee Name</th>
            <th className="p-4 border">Salary</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((payroll) => (
            <tr key={payroll.id}>
              <td className="p-4 border">{payroll.employeeName}</td>
              <td className="p-4 border">{payroll.salary}</td>
              <td className="p-4 border">
                <button onClick={() => editPayroll(payroll)} className="mr-2">
                  <FiEdit className="text-blue-500" />
                </button>
                <button onClick={() => deletePayroll(payroll.id)}>
                  <FiTrash className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollTable;
