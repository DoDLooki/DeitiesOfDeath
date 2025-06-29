import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';
import data from './../../data.json'; 
import { FaPlayCircle } from 'react-icons/fa';
import { HelpCircle, ScrollText, X } from 'lucide-react';
import ShareButton from './ShareButton';
import convertBOToRtsOverlay from './RTSOverlayConvert';

function formatKeywords(text, isDarkMode) {
  const italicWords = ['builds','build','empower', 'empowers','transition', 'pre-queue', 'research', 'transform','heroise', 'auto-queue', 'autoqueue'];

  if (typeof text !== 'string') return text;

  italicWords.forEach(word => {
    const regex = new RegExp(`\\b(${word})\\b`, 'gi');
    text = text.replace(regex, (match, p1) => {
      if (match.includes('font-weight')) return match; // ignore already bolded words
      return `<i style="color: ${isDarkMode ? "#22c55e" : "#0047ab"};">${p1}</i>`; // blue + italic
    });
  });

  return text;
}

function replaceWithIcons(text, isDarkMode) {
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

  replaced = formatKeywords(replaced, isDarkMode);

  return replaced;
}

let rtsOverlayBO = {}; // Store BO in RTS Overlay format

const BOComponent = ({ god, title, onClose, isMobile }) => {
  const [bo, setBO] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [rtsOverlay, copyRtsOverlay] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // dark by default
  const [youTubeLinks, setYouTubeLinks] = useState([]);

  useEffect(() => {
    const match = document.cookie.match(/theme=(dark|light)/);
    const savedTheme = match?.[1];

    if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true); // default
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.cookie = `theme=${newMode ? 'dark' : 'light'}; path=/; max-age=31536000`; // 1 year
  };

  useEffect(() => {
    if (showHelp) {
      const timer = setTimeout(() => setShowHelp(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showHelp]);

  useEffect(() => {
    if (rtsOverlay) {
      // Copy to clipboard BO in RTS Overlay format
      navigator.clipboard.writeText(JSON.stringify(rtsOverlayBO, null, 4))
        .catch(err => console.error("Failed to copy RTS Overlay BO to clipboard:", err));

      // Instructions indicated for a limited amount of time
      const timer = setTimeout(() => copyRtsOverlay(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [rtsOverlay]);

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

  const YOUTUBE_REGEX = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/\S+/i;

  const decodeExcelData = (jsonData_) => {
    const links = [];

    while (
      jsonData_.length > 0 &&
      jsonData_[jsonData_.length - 1].every(cell => cell.length === 0)
    ) {
      jsonData_.pop();
    }

    console.log("Decoded JSON Data:", jsonData_);

    let bo_ = {
      title: jsonData_[0]?.[0] || title,
      god: god,
      build: [],
    };

    let time = -1;
    for (let i = 1; i < jsonData_.length; i++) {
      const row = jsonData_[i].map(cell => {
        if (cell && YOUTUBE_REGEX.test(cell)) {
          links.push(cell);
          return ''; // remove YouTube link from the row
        }
        return cell;
      });
      if (
        row[0] &&
        (
          row[0].toLowerCase().includes('advance') ||
          row[0].toLowerCase().includes('classical') ||
          row[0].toLowerCase().includes('archaic') ||
          row[0].toLowerCase().includes('heroic') || 
          row[0].toLowerCase().includes('notes')
        ) &&
        row.slice(1).every(cell => cell === '' || cell === '\r')
      ) {
        console.log("New phase detected:", row[0]);
        bo_.build.push({ description: row[0], steps: [] });
        time++;
      } else {
        console.log("Adding step to phase:", row);
        if (time >= 0) bo_.build[time].steps.push(row);
      }
    }

    console.log("Parsed Build Order:", bo_);

    // Clean steps and remove empty columns
    bo_.build.forEach(phase => {
      if (phase.steps.length === 0) return;

      phase.steps = phase.steps.filter(step =>
        step.some(cell => cell && cell.trim() !== '\r' && cell.trim() !== '')
      );

      if (phase.steps.length === 0) return;

      const colCount = Math.max(...phase.steps.map(step => step.length));
      const keepIndices = [];

      for (let col = 0; col < colCount; col++) {
        const hasNonEmpty = phase.steps.some(step => step[col] && step[col].trim() !== '\r' && step[col].trim() !== '');
        if (hasNonEmpty) keepIndices.push(col);
      }

      phase.steps = phase.steps.map(step => keepIndices.map(i => step[i] ?? ''));
    });

    setBO(bo_);
    setYouTubeLinks(links);
    console.log(links)

    // Convert BO to RTS Overlay format, and store it (for clipboard copy)
    rtsOverlayBO = convertBOToRtsOverlay(bo_);
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
      id="1"     
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: isMobile ? '12vh' : '3vh',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        zIndex: 9998,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto',
        padding: isMobile ? '0' : '2rem',
        height: '100%',
        backdropFilter: 'blur(4px)',
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 600,
        color: isDarkMode ? '#e5e7eb' : '#000',
        flexDirection: 'column',
        paddingRight: isMobile ? '1rem' : '2rem',
        paddingLeft: isMobile ? '1rem' : '2rem',
        maxWidth: "100vw",
        overflowX: 'hidden',
      }}
      onClick={onClose}
    >
      <motion.div
      id = '2'
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: isDarkMode ? '#1e293b' : '#f5f5f5',
          color: isDarkMode ? '#e5e7eb' : '#000',
          border: `1px solid ${isDarkMode ? '#334155' : '#000'}`,
          padding: isMobile ? '1.5rem' : '2rem',
          borderRadius: '1rem',
          maxWidth: isMobile ? '100vw' : '60vw',
          width: '100%',
          overflowY: 'auto',
          position: 'relative',
          fontFamily: "'Cormorant Garamond', serif",
          paddingBottom: isMobile ? '10vh' : '2rem',
          boxShadow: isDarkMode ? '0 0 15px rgba(0,0,0,0.5)' : undefined,
          overflowX: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <ShareButton title={title} god={god} />

        <motion.button
          onClick={toggleTheme}
          style={{
            ...baseButtonStyle,
            right: isMobile ? '5rem' : '11.5rem',
            color: '#facc15',
            backgroundColor: 'transparent',
            border: '1px solid #facc15',
          }}
          onMouseEnter={(e) =>
            e.currentTarget.style.backgroundColor = isDarkMode ? '#92400e' : '#fef3c7'
          }
          onMouseLeave={(e) =>
            e.currentTarget.style.backgroundColor = 'transparent'
          }
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle Theme"
        >
          {/* sun-moon icon */}
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v1" />
            <path d="M12 20v1" />
            <path d="M3 12h1" />
            <path d="M20 12h1" />
            <path d="m18.364 5.636-.707.707" />
            <path d="m6.343 17.657-.707.707" />
            <path d="m5.636 5.636.707.707" />
            <path d="m17.657 17.657.707.707" />
            <circle cx="12" cy="12" r="5" />
            <path d="M19 5a7 7 0 0 1-9 9 7 7 0 0 0 9-9" />
          </svg>
        </motion.button>

        {!isMobile && <motion.button
          onClick={() => setShowHelp(true)}
          style={{
            ...baseButtonStyle,
            right: isMobile ? '5rem' : '8rem',
            color: isDarkMode ? '#22c55e' : '#16a34a',
            backgroundColor: 'transparent',
            border: `1px solid ${isDarkMode ? '#22c55e' : '#16a34a'}`,
          }}
          onMouseEnter={(e) =>
            e.currentTarget.style.backgroundColor = isDarkMode ? '#14532d' : '#d1fae5'
          }
          onMouseLeave={(e) =>
            e.currentTarget.style.backgroundColor = 'transparent'
          }
          whileTap={{ scale: 0.95 }}
          aria-label="Help"
        >
          <HelpCircle size={20} />
        </motion.button>}

        {!isMobile && <motion.button
          onClick={() => copyRtsOverlay(true)}
          style={{
            ...baseButtonStyle,
            right: isMobile ? '5rem' : '4.5rem',
            color: isDarkMode ? '#6666ff' : '#0080ff',
            backgroundColor: 'transparent',
            border: `1px solid ${isDarkMode ? '#6666ff' : '#0080ff'}`,
          }}
          onMouseEnter={(e) =>
            e.currentTarget.style.backgroundColor = isDarkMode ? '#4c0099' : '#cce5ff'
          }
          onMouseLeave={(e) =>
            e.currentTarget.style.backgroundColor = 'transparent'
          }
          whileTap={{ scale: 0.95 }}
          aria-label="Help"
        >
          <ScrollText size={20} />
        </motion.button>}

        <motion.button
          onClick={onClose}
          style={{
            ...baseButtonStyle,
            right: isMobile ? '2rem' : '1rem',
            color: isDarkMode ? '#ef4444' : '#dc2626',
            backgroundColor: 'transparent',
            border: `1px solid ${isDarkMode ? '#ef4444' : '#dc2626'}`,
          }}
          onMouseEnter={(e) =>
            e.currentTarget.style.backgroundColor = isDarkMode ? '#7f1d1d' : '#fee2e2'
          }
          onMouseLeave={(e) =>
            e.currentTarget.style.backgroundColor = 'transparent'
          }
          whileTap={{ scale: 0.95 }}
          aria-label="Close"
        >
          <X size={20} />
        </motion.button>

        {bo ? (
          <div style={{
            
          }}>
            <motion.h2 style={{
              fontSize: 'clamp(1.5rem, 2vw, 2.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: isDarkMode ? '#f9fafb' : '#000',
            }}>
              {bo.title}
            </motion.h2>

            {bo.build.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                style={{ marginBottom: '3rem', maxWidth: '100%', width: '100%' }}
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
                    border: `1px solid ${isDarkMode ? '#CCCCCC' : '#d1d5db'}`,
                    borderRadius: '0.5rem',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontSize: isMobile ? '0.60rem' : '0.95rem',
                    backgroundColor: isDarkMode ? '#0f172a' : '#fff',
                    color: isDarkMode ? '#e5e7eb' : '#000',
                  }}
                >
                  <motion.tbody>
                    {phase.steps.map((step, stepIdx) => (
                      <motion.tr
                        key={stepIdx}
                        style={{
                          backgroundColor: isDarkMode
                            ? stepIdx % 2 === 0 ? '#1e293b' : '#334155'
                            : stepIdx % 2 === 0 ? '#f9fafb' : '#ffffff',
                        }}
                      >
                        {step.length === 1 ? (
                          <motion.td
                            colSpan={6}
                            style={{
                              padding: '1rem',
                              fontStyle: 'italic',
                              color: isDarkMode ? '#cbd5e1' : '#4b5563',
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                              lineHeight: '1.5',
                              backgroundColor: isDarkMode ? '#1e293b' : '#fff7ed',
                              border: `1px solid ${isDarkMode ? '#CCCCCC' : '#d1d5db'}`,
                            }}
                          >
                            <motion.span dangerouslySetInnerHTML={{ __html: replaceWithIcons(step[0], isDarkMode) }} />
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
                                border: `1px solid ${isDarkMode ? '#CCCCCC' : '#d1d5db'}`,
                                backgroundColor: colIdx === 0
                                  ? (isDarkMode ? '#334155' : '#fff7ed')
                                  : 'transparent',
                              }}
                            >
                              <motion.span dangerouslySetInnerHTML={{ __html: replaceWithIcons(col, isDarkMode) }} />
                            </motion.td>
                          ))
                        )}
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </motion.table>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p style={{ fontSize: 'clamp(1rem, 1.3vw, 1.4rem)' }}>Loading...</motion.p>
        )}

        { youTubeLinks.length > 0 && (
          <motion.h2
            id="youtube"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
                fontSize: "clamp(2rem, 5vw + 1rem, 3.5rem)",
                marginBottom: '3rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                color: isDarkMode ? '#f9fafb' : '#000',
            }}
            whileHover={{
                scale: 1.05,
            }}
        >
        <motion.a
            href="https://www.youtube.com/@DeitiesofDeath"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', paddingTop: '0.75rem' }}
        >
            <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="#FF0000"
            width="2.8rem"
            height="2.8rem"
            whileHover={{ scale: 1.2 }}
            >
            <path d="M549.655 124.083c-6.281-23.65-24.822-42.21-48.472-48.48C465.915 64 288 64 288 64S110.085 64 74.817 75.603c-23.65 6.27-42.191 24.82-48.472 48.47C15.73 159.385 15.73 256 15.73 256s0 96.615 10.615 131.917c6.281 23.65 24.822 42.21 48.472 48.48C110.085 448 288 448 288 448s177.915 0 213.183-11.603c23.65-6.27 42.191-24.82 48.472-48.47C560.27 352.615 560.27 256 560.27 256s0-96.615-10.615-131.917zM232 336V176l142 80-142 80z" />
            </motion.svg>
        </motion.a>
        Video Tutorial
        </motion.h2>
        )

        }
        
      <div style={{
        display: 'flex',
        flexDirection: 'column', // or 'row' if you want them side-by-side
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: '4rem',
      }}>
        {youTubeLinks.length > 0 && youTubeLinks.map((link, index) => {
          const match = link.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
          const videoId = match ? match[1] : null;
          if (!videoId) return null;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ 
                maxWidth: '480px',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                cursor: 'pointer',
                marginBottom: '0rem',
              }}
              onClick={() => window.open(link, '_blank')}
            >
              <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="YouTube thumbnail"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                />

                <motion.div
                  initial={{ opacity: isMobile ? 0.5 : 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    zIndex: 5,
                  }}
                >
                  <FaPlayCircle
                    style={{
                      color: '#ffffff',
                      fontSize: '4rem',
                      filter: 'drop-shadow(0 0 6px white)',
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>


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
              backgroundColor: isDarkMode ? '#0f172a' : '#fff',
              color: isDarkMode ? '#f1f5f9' : '#000',
              border: `1px solid ${isDarkMode ? '#334155' : '#000'}`,
              padding: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 0 10px rgba(0,0,0,0.4)',
              maxWidth: '300px',
              zIndex: 10000,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            🛈 Hover the icons to see what they represent.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy to clipboard for RTS Overlay */}
      <AnimatePresence>
        {rtsOverlay && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '3rem',
              right: '1rem',
              backgroundColor: isDarkMode ? '#0f172a' : '#fff',
              color: isDarkMode ? '#f1f5f9' : '#000',
              border: `1px solid ${isDarkMode ? '#334155' : '#000'}`,
              padding: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 0 10px rgba(0,0,0,0.4)',
              maxWidth: '300px',
              zIndex: 10000,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            The build order was copied to clipboard with <strong style={{ color: '#969696' }}>RTS Overlay</strong> format.
            Paste it in the editor of <a href="https://rts-overlay.github.io/?gameId=aom"
            target="_blank" rel="noopener noreferrer" style={{ color: '#969696' }}>rts-overlay.github.io</a>.
          </motion.div>
        )}
      </AnimatePresence>
      
    </motion.div>
  </AnimatePresence>
);

};

export default BOComponent;
