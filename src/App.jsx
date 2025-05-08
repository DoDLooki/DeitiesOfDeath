import { useEffect, useState } from 'react';
import HeroIntro from './components/HeroIntro';
import { motion } from 'framer-motion';

function smoothScrollBy(targetY = 100, duration = 2000) {
  const startY = window.scrollY;
  const startTime = performance.now();

  function scroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

    window.scrollTo(0, startY + targetY * ease);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}


function App() {
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  const [autoScrollComplete, setAutoScrollComplete] = useState(false);

  // Ignore scrolls until auto-scroll is done
  useEffect(() => {
    const handleScroll = () => {
      if (autoScrollComplete && window.scrollY > 110) {
        setHasUserScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoScrollComplete]);

  // Trigger auto scroll after 8s
  useEffect(() => {
    const timer = setTimeout(() => {
      smoothScrollBy(window.innerHeight * 0.2, 3000); // scroll down 100px over 3s
  
      setTimeout(() => {
        setAutoScrollComplete(true);
      }, 3000);
    }, 10000);
  
    return () => clearTimeout(timer);
  }, []);
  

  
  
  return (
    <>
      <HeroIntro />
      {autoScrollComplete && !hasUserScrolled && (
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            fontSize: '4rem',
            color: '#000', // black
            zIndex: 100,
            fontFamily: 'Cormorant Garamond, serif',
            pointerEvents: 'none',
          }}
        >
          ↓
        </motion.div>
      )}


      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '2000px',
        backgroundColor: '#FAF9F6',
        zIndex: 1,
        paddingTop:'100vh'
      }}>
          <h1
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Cormorant Garamond, serif',
          color: 'red',
          fontSize: '4rem',
        }}
      >
        test
      </h1>


      </div>
    </>
  )
}

export default App
