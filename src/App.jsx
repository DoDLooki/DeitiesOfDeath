import { useEffect, useState } from 'react';
import HeroIntro from './components/HeroIntro';
import { motion } from 'framer-motion';
import YouTubeSection from './components/YouTubeSection';
import SectionSeparator from './components/SectionSeperator';
import Members from './components/Members';
import BouncingMembers from './components/BouncingMembers';
import AboutUsSection from './components/AboutUsSection';
import TwitchSection from './components/TwitchSection';
import DiscordSection from './components/DiscordSection';

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
  const [killedDoDMember, setKilledDoDMember] = useState(false);
  const isMobile = window.innerWidth <= 900; // or 900 or whatever you consider mobile
  console.log('isMobile', isMobile);

  useEffect(() => {
    //  reset scrool position to top
    window.scrollTo(0, 0);
    setHasUserScrolled(false);
    setAutoScrollComplete(false);
  }, []);

  // Trigger auto scroll after 8s
  useEffect(() => {
    if (autoScrollComplete) return;
    const timer = setTimeout(() => {
      if (hasUserScrolled) return;
      //smoothScrollBy(window.innerHeight * 0.6, 3000);
    
      setTimeout(() => {
        setAutoScrollComplete(true);
        setHasUserScrolled(false)
      }, 3000);
    }, 10000);
  
    return () => clearTimeout(timer);
  }, [hasUserScrolled]);
  
  // chech if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasUserScrolled(true); // Always set it as soon as user scrolls
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <HeroIntro setHasUserScrolled={setHasUserScrolled} isMobile={isMobile} />
      {autoScrollComplete && !hasUserScrolled && (
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '40px',
            fontSize: 'clamp(2rem, 2vw + 2rem, 4rem)',
            color: '#ffffff', // black
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
        zIndex: 1,
        paddingTop:'100vh',
      }}>
        
          <SectionSeparator isMobile={isMobile} />
          <AboutUsSection isMobile={isMobile}/>
          <SectionSeparator isMobile={isMobile} />
          <DiscordSection isMobile={isMobile} />
          <SectionSeparator isMobile={isMobile} />
          <YouTubeSection isMobile={isMobile} />
          <SectionSeparator isMobile={isMobile} />
          <TwitchSection isMobile={isMobile} />
          <SectionSeparator isMobile={isMobile} />
          {
            killedDoDMember ? <BouncingMembers isMobile={isMobile} /> : <Members isMobile={isMobile} setKilledDoDMember={setKilledDoDMember} />
          }
      </div>
    </>
  )
}

export default App
