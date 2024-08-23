import React, { useState, useEffect } from 'react';

const PayrollForm = ({ addPayroll, editingPayroll, updatePayroll }) => {
  const [formData, setFormData] = useState({ employeeName: '', salary: '' });

  useEffect(() => {
    if (editingPayroll) {
      setFormData(editingPayroll);
    }
  }, [editingPayroll]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPayroll) {
      updatePayroll(formData);
    } else {
      addPayroll(formData);
    }
    setFormData({ employeeName: '', salary: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-md">
      <div className="mb-2">
        <label className="block mb-1">Employee Name</label>
        <input
          type="text"
          value={formData.employeeName}
          onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Salary</label>
        <input
          type="number"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editingPayroll ? 'Update Payroll' : 'Add Payroll'}
      </button>
    </form>
  );
};

export default PayrollForm;
