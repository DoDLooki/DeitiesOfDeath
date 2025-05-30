import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const imagePaths = [
  '/assets/BOs/images/UI_god_pantheon_Atlantean.png',
  '/assets/BOs/images/UI_god_pantheon_Norse.png',
  '/assets/BOs/images/UI_god_pantheon_Greek.png',
  '/assets/BOs/images/UI_god_pantheon_Chinese.png',
  '/assets/BOs/images/UI_god_pantheon_egyptian.png',
];

export default function AutoImageSlider() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Preload all images on mount
  useEffect(() => {
    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoaded(false); // mark as not loaded when switching
      setIndex((prev) => (prev + 1) % imagePaths.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{
        maxWidth: '200px',
        minWidth: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '3vh',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={imagePaths[index]}
          src={imagePaths[index]}
          alt={`Slide ${index + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            maxWidth: '160px',
            borderRadius: '20px',
            padding: '0.5rem',
            border: '3px solid #ff4d4d',
            boxShadow: '0 0 15px rgba(255, 77, 77, 0.5)',
            cursor: 'pointer',
          }}
        />
      </AnimatePresence>
    </motion.div>
  );
}
