import { useEffect, useState } from 'react';
import HeroIntro from './components/HomePage/HeroIntro';
import { motion } from 'framer-motion';
import YouTubeSection from './components/HomePage/YouTubeSection';
import SectionSeparator from './components/SectionSeperator';
import Members from './components/HomePage/Members';
import BouncingMembers from './components/HomePage/BouncingMembers';
import AboutUsSection from './components/HomePage/AboutUsSection';
import TwitchSection from './components/HomePage/TwitchSection';
import DiscordSection from './components/HomePage/DiscordSection';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';

function App() {
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  const [autoScrollComplete, setAutoScrollComplete] = useState(false);
  const [killedDoDMember, setKilledDoDMember] = useState(false);
  const isMobile = window.innerWidth <= 900;
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.redirect;
    if (redirect) {
      sessionStorage.removeItem('redirect');
      navigate(redirect);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setHasUserScrolled(false);
    setAutoScrollComplete(false);
  }, []);

  useEffect(() => {
    if (autoScrollComplete) return;
    const timer = setTimeout(() => {
      if (!hasUserScrolled) {
        setTimeout(() => {
          setAutoScrollComplete(true);
          setHasUserScrolled(false);
        }, 3000);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [hasUserScrolled]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasUserScrolled(true); 
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '100%',
      overflowX: 'hidden',
    }}>
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
            color: '#ffffff',
            zIndex: 100,
            fontFamily: 'Cormorant Garamond, serif',
            pointerEvents: 'none',
          }}
        >
          ↓
        </motion.div>
      )}

      <main style={{ width: '100%', boxSizing: 'border-box' }}>
        <SectionSeparator isMobile={isMobile} />
        <AboutUsSection isMobile={isMobile}/>
        <SectionSeparator isMobile={isMobile} />
        <DiscordSection isMobile={isMobile} />
        <SectionSeparator isMobile={isMobile} />
        <YouTubeSection isMobile={isMobile} />
        <SectionSeparator isMobile={isMobile} />
        <TwitchSection isMobile={isMobile} />
        <SectionSeparator isMobile={isMobile} />
        {killedDoDMember 
          ? <BouncingMembers isMobile={isMobile} />
          : <Members isMobile={isMobile} setKilledDoDMember={setKilledDoDMember} />
        }
        <Footer isMobile={isMobile} />
      </main>
    </div>
  );
}

export default App;
