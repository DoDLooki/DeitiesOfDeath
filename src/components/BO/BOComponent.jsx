import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';
let data;

(async () => {
  const response = await fetch('/assets/data.json');
  data = await response.json();

  // If needed, call the main function here:
  // init(data);
})();


import { HelpCircle, X } from 'lucide-react';
import ShareButton from './ShareButton';

function formatKeywords(text) {
  const italicWords = ['builds','build','empower', 'empowers','transition', 'pre-queue', 'research', 'transform','heroise', 'auto-queue', 'autoqueue'];

  if (typeof text !== 'string') return text;

  italicWords.forEach(word => {
    const regex = new RegExp(`\\b(${word})\\b`, 'gi');
    text = text.replace(regex, (match, p1) => {
      if (match.includes('font-weight')) return match; // ignore already bolded words
      return `<i style="color: #0047ab;">${p1}</i>`; // blue + italic
    });
  });

  return text;
}

function replaceWithIcons(text) {
  if (typeof text !== 'string') return text;

  let replaced = text;

  for (const [keyword, icon] of Object.entries(data.BO_icons)) {
    const regex = new RegExp(`\\b${keyword}s?\\b`, 'gi');

    replaced = replaced.replace(regex, (match) =>
      `<img 
        src="/assets/BOs/images/${icon}" 
        alt="${match}" 
        title="${match}" 
        style="height: 1.5em; vertical-align: middle;" 
      />`
    );
  }

  replaced = formatKeywords(replaced);

  console.log(replaced);

  return replaced;
}

const BOComponent = ({ god, title, onClose, isMobile }) => {
  const [bo, setBO] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (showHelp) {
      const timer = setTimeout(() => setShowHelp(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showHelp]);

  useEffect(() => {
    const capitalized = god.charAt(0).toUpperCase() + god.slice(1);
    const path = `/assets/BOs/${capitalized}.xlsx`;

    fetch(path)
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames.find(name => {
          const sheet = workbook.Sheets[name];
          const cell = sheet['A1'];
          return cell && cell.v === title;
        });

        if (!sheetName) return;

        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: '', // This ensures empty cells are represented as empty strings
        });

        decodeExcelData(jsonData);
      })
      .catch(err => console.error('Failed to load file:', err));
  }, [god, title]);

  const decodeExcelData = (jsonData_) => {

    while (
      jsonData_.length > 0 &&
      jsonData_[jsonData_.length - 1].every(cell => cell.length === 0)
    ) {
      jsonData_.pop();
    }

    let bo_ = {
      title: jsonData_[0]?.[0] || title,
      god: god,
      build: [],
    };

    let time = -1;
    for (let i = 1; i < jsonData_.length; i++) {
      const row = jsonData_[i];
      if (
        row[0] &&
        (
          row[0].toLowerCase().includes('advance') ||
          row[0].toLowerCase().includes('classical') ||
          row[0].toLowerCase().includes('archaic') ||
          row[0].toLowerCase().includes('heroic') || 
          row[0].toLowerCase().includes('notes')
        ) &&
        row.slice(1).every(cell => cell === '')
      ) {
        bo_.build.push({ description: row[0], steps: [] });
        time++;
      } else {
        if (time >= 0) bo_.build[time].steps.push(row);
      }
    }

    // Remove columns that are entirely empty across all steps in each phase & lines
    bo_.build.forEach(phase => {
      if (phase.steps.length === 0) return;

      // Step 1: Remove rows that are completely empty
      phase.steps = phase.steps.filter(step =>
        step.some(cell => cell && cell.trim() !== '')
      );

      if (phase.steps.length === 0) return;

      // Step 2: Remove columns that are completely empty
      const colCount = Math.max(...phase.steps.map(step => step.length));

      const keepIndices = [];
      for (let col = 0; col < colCount; col++) {
        const hasNonEmpty = phase.steps.some(step => step[col] && step[col].trim() !== '');
        if (hasNonEmpty) keepIndices.push(col);
      }

      phase.steps = phase.steps.map(step => keepIndices.map(i => step[i] ?? ''));
    });

    setBO(bo_);
  };

  const baseButtonStyle = {
    position: 'absolute',
    top: isMobile ? '1.5rem' : '2rem',
    border: 'none',
    borderRadius: '0.75rem',
    padding: '0.5rem',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease, transform 0.1s ease',
    backgroundColor: '#f3f4f6', // default fallback bg
  };


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: isMobile ? '12vh' : '3vh',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: 'auto',
          padding: isMobile ?"0" : '2rem',
          height: '100%',
          backdropFilter: 'blur(4px)',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: '#f5f5f5',
            color: '#000',
            border: '1px solid #000',
            padding: isMobile ? '1.5rem' : '2rem',
            borderRadius: '1rem',
            maxWidth: isMobile ? '100vw' : '60vw',
            width: isMobile ? '100vw' : '60vw',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            fontFamily: "'Cormorant Garamond', serif",
            paddingBottom: isMobile ? '10vh' : '2rem',
          }}
          onClick={(e) => e.stopPropagation()}
        >
       
        <ShareButton title={title } god={god} />

        <motion.button
          onClick={() => setShowHelp(true)}
          style={{
            ...baseButtonStyle,
            right: '4.5rem',
            color: '#16a34a', // green-600
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d1fae5'} // light green
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          whileTap={{ scale: 0.95 }}
          aria-label="Help"
        >
          <HelpCircle size={20} />
        </motion.button>

        <motion.button
          onClick={onClose}
          style={{
            ...baseButtonStyle,
            right: '1rem',
            color: '#dc2626', // red-600
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fee2e2'} // light red
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          whileTap={{ scale: 0.95 }}
          aria-label="Close"
        >
          <X size={20} />
        </motion.button>



          {bo ? (
            <>
              <motion.h2 style={{
                fontSize: 'clamp(1.5rem, 2vw, 2.5rem)',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#000'
              }}>
                {bo.title}
              </motion.h2>

              {bo.build.map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  style={{ marginBottom: '3rem' }}
                >
                  <motion.h3 style={{
                    fontSize: 'clamp(1.2rem, 1.5vw, 1.6rem)',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    textDecoration: 'underline',
                  }}>
                    {phase.description}
                  </motion.h3>

                  <motion.table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      tableLayout: 'auto',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontFamily: 'Segoe UI, sans-serif',
                      fontSize: isMobile ? '0.60rem' : '0.95rem',
                      backgroundColor: '#fff',
                    }}
                  >
                    <motion.tbody>
                      {phase.steps.map((step, stepIdx) => (
                        <motion.tr
                          key={stepIdx}
                          style={{
                            backgroundColor: stepIdx % 2 === 0 ? '#f9fafb' : '#ffffff',
                          }}
                        >
                          {step.length === 1 ? (
                            <motion.td
                              colSpan={6}
                              style={{
                                padding: '1rem',
                                fontStyle: 'italic',
                                color: '#4b5563',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                lineHeight: '1.5',
                                backgroundColor: '##fff7ed',
                                border: '1px solid #d1d5db',
                              }}
                            >
                              <motion.span dangerouslySetInnerHTML={{ __html: replaceWithIcons(step[0]) }} />
                            </motion.td>
                          ) : (
                            step.map((col, colIdx) => (
                              <motion.td
                                key={colIdx}
                                style={{
                                  padding: '0.75rem 1rem',
                                  verticalAlign: 'top',
                                  whiteSpace: 'pre-wrap',
                                  wordBreak: 'break-word',
                                  lineHeight: '1.4',
                                  textAlign: 'left',
                                  border: '1px solid #d1d5db',
                                  backgroundColor: colIdx === 0 ? '#fff7ed ' : undefined, // soft blue
                                }}
                              >
                                <motion.span dangerouslySetInnerHTML={{ __html: replaceWithIcons(col) }} />
                              </motion.td>
                            ))
                          )}
                        </motion.tr>
                      ))}
                    </motion.tbody>
                  </motion.table>
                </motion.div>
              ))}
            </>
          ) : (
            <motion.p style={{ fontSize: 'clamp(1rem, 1.3vw, 1.4rem)' }}>Loading...</motion.p>
          )}
        </motion.div>

        {/* Help tooltip */}
        <AnimatePresence>
          {showHelp && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: '3rem',
                right: '1rem',
                backgroundColor: '#fff',
                color: '#000',
                border: '1px solid #000',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                maxWidth: '300px',
                zIndex: 10000,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              🛈 Hover the icons to see what they represent.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default BOComponent;
