import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHomeAnimation } from './../../contexts/HomeAnimationContext';

export default function HeroIntro({setHasUserScrolled, isMobile}) {
  const [showText, setShowText] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const { homeAnimation, setHomeAnimation } = useHomeAnimation();

  const handleClick = (label) => {
    if (label === 'Build Orders') {
      navigate('/build-order');
    } else if (label === 'Coaching') {
      navigate('/coaching');
    } else if (label === 'Merch') {
      navigate('/merch');
    }else {
      scrollTo(label.toLowerCase());
    }
  };

  const getPathFromLabel = (label) => {
  switch (label) {
    case 'Build Orders':
      return '/build-order';
    case 'Coaching':
      return '/coaching';
    case 'Merch':
      return '/merch';
    default:
      return null; // internal scroll section
  }
};


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
      backgroundColor: homeAnimation ? '#101010' : '#FAF9F6',
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
          gap: '5vw',
          paddingTop: '2vh',
          paddingBottom: '2vh',
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
        {(isMobile ? ['About us', 'Build Orders', 'Coaching', 'Merch'] : ['About us', 'Discord', 'Build Orders', 'Coaching', 'Merch']).map((label) => {
          const path = getPathFromLabel(label);

          return <motion.div
            key={label}
            whileHover={{
              scale: 1.05,
              color: '#ffffff',
              textShadow: '0 0 8px rgba(255,255,255,0.4)',
              borderBottom: '2px solid #FF0000',
            }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex', // <- use flex to normalize vertical alignment
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%', // optional: if your header has height
            }}
          >
            {path ? (
              <Link
                to={path}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                  fontFamily: 'Cormorant Garamond, serif',
                  zIndex: 999,
                  paddingBottom: '0',
                  whiteSpace: 'nowrap',
                  lineHeight: '1',
                  margin: '0',
                  textDecoration: isMobile ? 'underline' : 'none',
                  textDecorationColor: '#FF0000',
                  textDecorationThickness: '1px',
                  textUnderlineOffset: '5px',
                }}
                onClick={() => setHomeAnimation(true)}
              >
                {label}
              </Link>
            ) : (
              <button
                onClick={() => scrollTo(label.toLowerCase())}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                  fontFamily: 'Cormorant Garamond, serif',
                  zIndex: 999,
                  paddingBottom: '0',
                  whiteSpace: 'nowrap',
                  lineHeight: '1',
                  margin: '0',
                  textDecoration: isMobile ? 'underline' : 'none',
                  textDecorationColor: '#FF0000',
                  textDecorationThickness: '1px',
                  textUnderlineOffset: '5px',
                }}
              >
                {label}
              </button>
            )}
          </motion.div>

        })}
      </motion.div>
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
