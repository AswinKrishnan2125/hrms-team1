import React, { useState } from 'react';
import { Button, Input } from '@mui/material';
import * as XLSX from 'xlsx';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../fireBaseConfig'; // Adjust the import according to your setup

const BulkUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Bulk upload to Firestore
      const payrollsCollection = collection(db, 'Payrolls');
      const batch = db.batch();

      jsonData.forEach((row) => {
        const docRef = collection(payrollsCollection).doc();
        batch.set(docRef, row);
      });

      await batch.commit();
      alert('Bulk data uploaded successfully!');
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <Input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleFileUpload}>
        Upload
      </Button>
    </div>
  );
};

export default BulkUpload;
