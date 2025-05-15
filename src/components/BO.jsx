// BO.jsx
import React, { useEffect } from 'react';
import * as XLSX from 'xlsx';

const BO = () => {
  useEffect(() => {
    fetch('/DeitiesOfDeath/assets/BOs/Hades/Hades - Vault of Erebus - Basic Build.xlsx')
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });

        console.log('Sheet names:', workbook.SheetNames);

        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          console.log(`Content of "${sheetName}":`, jsonData);
        });
      })
      .catch(err => console.error('Failed to load file:', err));
  }, []);

  return (
    <div>
      <h2>BO Component</h2>
      <p>Loading Excel file from /assets/example.xlsx...</p>
    </div>
  );
};

export default BO;
