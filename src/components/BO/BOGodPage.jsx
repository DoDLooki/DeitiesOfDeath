import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './../Header';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';
import BOComponent from './BOComponent';
import data from './../../data.json'; 


import { Toaster } from 'react-hot-toast';
import Footer from './../Footer';

function getImageBO(title, god) {
  const image = data.BO_thumbnail[title];
  if (image) {
    return image;
  }
  return `${god}_icon.png`;
}

const BOGodPage = () => {
  const isMobile = window.innerWidth <= 900;
  const { god, title_share } = useParams();
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);
  const [showModal, setShowModal] = useState(title_share || false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gods = [
    'zeus', 'poseidon', 'hades',
    'ra', 'isis', 'set',
    'kronos', 'oranos', 'gaia',
    'nuwa', 'shennong', 'fuxi',
    'odin', 'thor', 'loki', 'freyr',
  ];

    useEffect(() => {
    if (!gods.includes(god)) {
        navigate('/build-order');
    } else {
        const capitalized = god.charAt(0).toUpperCase() + god.slice(1);
        const path = `/assets/BOs/${capitalized}.xlsx`;

        fetch(path)
        .then((res) => res.arrayBuffer())
        .then((data) => {
            const workbook = XLSX.read(data, { type: 'array' });

            const extractedTitles = workbook.SheetNames.map((sheetName) => {
            const sheet = workbook.Sheets[sheetName];
            const cell = sheet['A1'];
            return cell
                ? { name: sheetName, title: cell.v }
                : null; 
            }).filter(Boolean); 

            setTitles(extractedTitles);
        })
        .catch((err) => {
            console.error('Error loading Excel file:', err);
        });
    }
    }, [god, navigate]);


  const capitalizedGod = god.charAt(0).toUpperCase() + god.slice(1);

return (
  <>
    <Header page="BO" isMobile={isMobile} />
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{
        padding: !isMobile ? '5rem 2rem' : '3rem 1rem',
        paddingTop: '2rem',
        backgroundColor: '#101010',
        color: '#FAF9F6',
        fontFamily: 'Cormorant Garamond, serif',
        marginTop: '7vh',
      }}
    >
      {/* Title with logo */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        whileHover={{ scale: 1.05, color: '#ffffff', cursor: 'pointer' }}
        style={{
          fontSize: 'clamp(2rem, 5vw + 1rem, 4rem)',
          marginBottom: '2rem',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <motion.img
          src={`/assets/BOs/images/${god}_icon.png`}
          alt={`${god} Icon`}
          whileHover={{ scale: 1.15, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          style={{
            width: isMobile ? "20vw" : '6rem',
            height: isMobile ? "20vw" : '6rem',
            objectFit: 'cover',
            borderRadius: '50%',
            border: '3px solid #ff4444',
            padding: '0.3rem',
            boxShadow: '0 0 12px rgba(255, 68, 68, 0.5)',
          }}
        />
        {capitalizedGod}
      </motion.h2>

      {/* Build Order Cards or fallback message */}
      {titles.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: 'clamp(1.1rem, 1.5vw + 0.8rem, 1.6rem)', marginTop: '4rem' }}>
          No build order for now, please come back later 🙂
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            justifyContent: 'center',
          }}
        >
          {titles
            .filter(({ title }) => title && title !== '(No title)')
            .map(({ name, title }, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '2px solid #ff4444',
                  borderRadius: '1rem',
                  padding: '1rem',
                  width: isMobile ? "50vw" :'10vw',
                  boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                }}
                onClick={() => {
                  setShowModal(title);
                }}
              >
                <img
                  src={`/assets/BOs/images/${getImageBO(title, god)}`}
                  alt={`${god} icon`}
                  style={{
                    width: '100%',
                    height: isMobile ? "40vw" : '8vw',
                    objectFit: 'cover',
                    borderRadius: '0.5rem',
                    border: '1px solid #444',
                  }}
                />
                <h3
                  style={{
                    color: '#FAF9F6',
                    fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.4rem)',
                    fontWeight: 'bold',
                  }}
                >
                  {title}
                </h3>
              </motion.div>
            ))}
        </div>
      )}
    </motion.section>
    {showModal && (
    <BOComponent
        god={god}
        title={showModal}
        onClose={() => setShowModal(null)}
        isMobile={isMobile}
    />
    )}
    <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
    <Footer isMobile={isMobile} />
  </>
);

};

export default BOGodPage;
