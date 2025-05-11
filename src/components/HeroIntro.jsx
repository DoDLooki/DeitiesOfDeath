import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import data from '../data.json';

export default function HeroIntro({setHasUserScrolled}) {
  const [showText, setShowText] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (showText) {
      const timer = setTimeout(() => {
        setStartSplit(true);
  
        // Then reveal info 2s after logo appears
        setTimeout(() => setShowInfo(true), 2000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showText]);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Each step height in %, and vertical offset
  const steps = [
    { top: '0%', height: '33.33%', delay: 0.5 },
    { top: '33.33%', height: '33.33%', delay: 0.7 },
    { top: '66.66%', height: '33.34%', delay: 0.9 },
  ];

  const [startSplit, setStartSplit] = useState(false);
  useEffect(() => {
    if (startSplit) {
      const audio = new Audio('/DeitiesOfDeath/assets/intro.mp3');
      audio.volume = 1; // optional, 0.0 to 1.0
      audio.play().catch((err) => {
        console.warn('Auto-play blocked or failed:', err);
      });
    }
  }, [startSplit]);
  

  useEffect(() => {
    // Trigger split 2 seconds after showText (accounts for text animations)
    if (showText) {
      const timer = setTimeout(() => {
        setStartSplit(true);
      }, 2000); // 1s initial animation + 1s wait
      return () => clearTimeout(timer);
    }
  }, [showText]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
  
    const targetY = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2; // Adjusted to start from the bottom of the screen
    const startY = window.scrollY ; // Adjusted to start from the bottom of the screen
    const distance = targetY - startY;
    const duration = 1500; // in ms
    const startTime = performance.now();
  
    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5
      ? 16 * Math.pow(progress, 5)
      : 1 - Math.pow(-2 * progress + 2, 5) / 2;
    
      
      window.scrollTo(0, startY + distance * ease);
  
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }
  
    requestAnimationFrame(scrollStep);
    setHasUserScrolled(true);
  };
  

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      backgroundColor: '#FAF9F6',
    }}>

      {showInfo && (
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '5rem',
          padding: '1rem 2rem',
          color: '#FAF9F6',
          fontFamily: 'Cormorant Garamond, serif',
          zIndex: 999,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          borderBottom: '2px solid #9c1111',
          backdropFilter: 'blur(6px)',
          height: '7vh',
          maxHeight: '7vh',
        }}
      >
        {['About us', 'YouTube','Twitch', 'Discord', 'Members'].map((label) => (
          <motion.button
            key={label}
            whileHover={{
              scale: 1.05,
              color: '#ffffff',
              textShadow: '0 0 8px rgba(255,255,255,0.4)',
              borderBottom: '2px solid #FF0000',
            }}
            transition={{ duration: 0.3 }}
            onClick={() => scrollTo(label.toLowerCase())}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: 'clamp(1.4rem, 1vw + 1rem, 1.7rem)',
              fontFamily: 'Cormorant Garamond, serif',
              zIndex: 999,
              paddingBottom: '0.25rem',
            }}
          >
            {label}
          </motion.button>
        ))}
      </motion.div>
      
      )}
      {/* Stair blocks individually animated */}
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ duration:1.2, ease: [0.42, 0, 0.58, 1], delay: step.delay }}
          style={{
            position: 'absolute',
            top: step.top,
            left: 0,
            height: step.height,
            width: '100%',
            backgroundColor: '#101010',
            zIndex: 10,
          }}
        />
      ))}

  {showText && (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        fontFamily: 'Cormorant Garamond, serif',
        color: '#FAF9F6',
        fontSize: 'clamp(2rem, 5vw + 1rem, 4rem)',
      }}
    >
      <motion.div
        initial={{ x: '-130%', opacity: 0 }}
        animate={{
          x: startSplit ? '-100vw' : '-50%',
          opacity: 1,
        }}
        transition={{
          duration: startSplit ? 1 : 1,
          ease: startSplit ? 'easeOut' : 'anticipate',
          delay: startSplit ? 0 : 0.1,
        }}
      >
        Deities
      </motion.div>

      <motion.div
        initial={{ x: '-70%', opacity: 0 }}
        animate={{
          x: startSplit ? '100vw' : '50%',
          opacity: 1,
        }}
        transition={{
          duration: startSplit ? 1 : 1,
          ease: startSplit ? 'easeOut' : 'anticipate',
          delay: startSplit ? 0 : 0.3,
        }}
      >
        of Death
      </motion.div>
    </div>
  )}
    {startSplit && (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 15,
          pointerEvents: 'auto',
        }}
      >
        <motion.img
          src="/DeitiesOfDeath/assets/PNGDoD.png"
          alt="centerpiece"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: [0, 0, 0.75, -0.75, 0],
            y: [0, 0, -1, 1, 0],
          }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeOut' },
            scale: { duration: 1.2, ease: 'easeOut' },
            rotate: {
              delay: 0,
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            y: {
              delay: 0,
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          draggable="false"
          className="logo-hover-effect"
          style={{
            width: '27vw',
            height: 'auto',
            display: 'block',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />


      </div>
    )}

{showInfo && (
  <>
    {/* Left text */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.2 }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '10%',
        transform: 'translateY(-50%)',
        color: '#FAF9F6',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(1.5rem, 3vw + 1rem, 2.5rem)',
        textAlign: 'left',
        zIndex: 40,
        maxWidth: '30vw',
      }}
    >
      <motion.p
        whileHover={{
          scale: 1.05,
          color: '#ffffff',
          textShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
        }}
        transition={{ duration: 0.3 }}
        style={{ cursor: 'default' }}
      >
        The largest community,<br />{data.members.length} Members
      </motion.p>
    </motion.div>


    {/* Right text */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.4 }}
      style={{
        position: 'absolute',
        top: '50%',
        right: '10%',
        transform: 'translateY(-50%)',
        color: '#FAF9F6',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(1.5rem, 3vw + 1rem, 2.5rem)',
        textAlign: 'right',
        zIndex: 40,
        maxWidth: '30vw',
      }}
    >
      <motion.p
        whileHover={{
          scale: 1.05,
          color: '#ffffff',
          textShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
        }}
        transition={{ duration: 0.3 }}
        style={{ cursor: 'default' }}
      >
        One of the oldest clans,<br />since 2005
      </motion.p>
    </motion.div>

  </>
)}



    </div>
  );
}
