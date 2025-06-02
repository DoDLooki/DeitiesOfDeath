import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useHomeAnimation } from './../../contexts/HomeAnimationContext';
import Header from './../Header'

export default function HeroIntro({setHasUserScrolled, isMobile}) {
  const [showText, setShowText] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { homeAnimation, setHomeAnimation } = useHomeAnimation();

  useEffect(() => {
    if (showText) {
      const timer = setTimeout(() => {
        setStartSplit(true);
  
        // Then reveal info 2s after logo appears
        setTimeout(() => {
          setShowInfo(true);
          setHomeAnimation(true); // Disable animation after showing info
        }, 2000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showText]);
  
  useEffect(() => {
    if (homeAnimation) {
      console.log('Animation already completed, skipping...');
      setShowInfo(true);
      return;
    }
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
      const audio = new Audio('/assets/intro.mp3');
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


  return (
    <div style={{
      position: 'relative',
      height: isMobile ?'100vh' : '100vh',
      width: '100vw',
      overflowX: 'hidden',
      backgroundColor: homeAnimation ? '#101010' : '#FAF9F6',
    }}>

      {showInfo && (
        <Header isMobile={isMobile} page={"HomePage"} setHasUserScrolled={setHasUserScrolled} setHomeAnimation={setHomeAnimation}/>
      )}
      {/* Stair blocks individually animated */}
      { steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ duration: homeAnimation ? 0 : 1.2, ease: [0.42, 0, 0.58, 1], delay: homeAnimation ? 0 : step.delay }}
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

  {showText && !homeAnimation && (
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
    {(startSplit || homeAnimation) && (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 15,
          pointerEvents: 'auto',
          flexDirection: 'column',
        }}
      >
        <motion.img
          src="/assets/PNGDoD.png"
          alt="centerpiece"
          initial={ homeAnimation ? {opacity:1} : { opacity: 0, scale: 0.7 }}
          animate={ homeAnimation ? {opacity:1} :{
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
            width: isMobile ?'70vw' : '27vw',
            height: 'auto',
            display: 'block',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        {showInfo && (
          <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            transition={{ duration:2, delay: 0.2 }}
            style={{
              position: 'absolute',
              bottom: isMobile ? "16vh" : '8vh', // adjust if needed
              textAlign: 'center',
              color: '#FAF9F6',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.2rem, 2vw + 1rem, 2rem)',
              zIndex: 20,
            }}
            
          >
            <motion.p whileHover={{
              scale: 1.05,
              color: '#ffffff',
              textShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
            }}
            transition={{ duration: 0.3 }} 
            style={{ margin: 0, cursor: 'default', padding: 0 }}
            >
              Once in DoD, Always in DoD
            </motion.p>
          </motion.div>
        )}


      </div>
    )}

{showInfo && (
  <>
    {/* Left text */}
    {!isMobile && <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.2 }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '15%',
        transform: 'translateY(-50%)',
        color: '#FAF9F6',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(1.2rem, 2vw + 1rem, 2rem)',
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
        A large active AOM<br /> community, <br />over 80 Members
      </motion.p>
    </motion.div>}


    {/* Right text */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.2 }}
      style={{
        position: 'absolute',
        top: isMobile ? "15%" : '50%',
        right: isMobile ? "50%" : '15%',
        transform: isMobile ? "translateX(+50%)" : 'translateY(-50%)',
        color: '#FAF9F6',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(1.2rem, 2vw + 1rem, 2rem)',
        textAlign: isMobile ? "center" : 'right',
        zIndex: 40,
        width: isMobile ? "90vw" : '30vw',
        maxWidth: isMobile ? "90vw" : '30vw',
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
        A legacy of over<br /> two decades,<br/> founded in 2005
      </motion.p>
    </motion.div>

  </>
)}



    </div>
  );
}
