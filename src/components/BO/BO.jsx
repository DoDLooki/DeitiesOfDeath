// BO.jsx
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import BOComponent from './BOComponent';
import { Link } from 'react-router-dom';

const BO = () => {
  const isMobile = window.innerWidth <= 900;

  const god = 'Hades';

  const [BO, setBO] = useState(null)


  useEffect(() => {
    fetch(`/assets/BOs/${god}/Hades - Vault of Erebus - Basic Build.xlsx`)
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });

        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          decodeExcelData(jsonData);
        });
      })
      .catch(err => console.error('Failed to load file:', err));
  }, []);

  function decodeExcelData(data) {

    if (BO !== null) return

    let bo_ = {
      title: '',
      god: god,
      build: [
      ]
    }
    let time=-1
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (i === 0) {
        // First row is the title
        bo_.title = row[0];
      }
      else {
        if (
          row.length === 1 &&
          (
            row[0].split(' ')[0].toLowerCase().includes('advance') ||
            row[0].split(' ')[0].toLowerCase().includes('classical') ||
            row[0].split(' ')[0].toLowerCase().includes('archaic') ||
            row[0].split(' ')[0].toLowerCase().includes('heroic')
          )
        ) {
          bo_.build.push({
            description: row[0],
            steps: []
        })
        time++
        } else {
          bo_.build[time].steps.push(row)
        }}
    }
    setBO(bo_)

    console.log('Decoded Data:', bo_);

  }

  


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
        color: '#FAF9F6',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: isMobile ? 'clamp(0.9rem, 1vw, 1.2rem)' : 'clamp(1rem, 1vw, 1.5rem)',
        height: '100vh',
      }}
    >
      <h1>Coming soon !</h1>
      <Link
              to="/"
              style={{
                color: '#FF4444',
                textDecoration: 'none',
                fontSize: 'clamp(1rem, 1vw, 1.5rem)',
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                border: '1px solid #FF4444',
                borderRadius: '5px',
                backgroundColor: '#111',
                transition: 'background-color 0.3s, color 0.3s',
                cursor: 'pointer',
                display: 'inline-block'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#FF4444';
                e.currentTarget.style.color = '#111';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#111';
                e.currentTarget.style.color = '#FF4444';
              }}
            >
              Back to Home Page
            </Link>
      {/* {
        BO !== null && <BOComponent bo={BO}/>
      } */}
    </div>
  );
};

export default BO;
