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
  const isMobile = window.innerWidth <= 900;
  const navigate = useNavigate();

  // -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_


  // When the user load the website from an other page than the '/' one, it causes a 404 error
  // because it will search the index.html corresponding to the page (for example '/build-order') and it doesnt exist
  // and there is no server to redirect to the right page.

  // So we instead redirect to '/' (see 'public/404.html') and store the wanted page url in the session storage
  // And so when the user is redirected here, the page will then redirect to the wanted page (stored in session storage)

  // anyway if you don't understand its fine just don't touch at this :p

  useEffect(() => {
    const redirect = sessionStorage.redirect;
    if (redirect) {
      sessionStorage.removeItem('redirect');
      navigate(redirect);
    }
  }, []);


  // -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

  useEffect(() => {
    //  reset scrool position to top
    window.scrollTo(0, 0);
    setHasUserScrolled(false);
    setAutoScrollComplete(false);
  }, []);

  useEffect(() => {
    if (autoScrollComplete) return;
    const timer = setTimeout(() => {
      if (hasUserScrolled) return;

      /*

      Trigger auto scroll after 8 second (if the user didnt scroll yet)
      to help the lost users navigate

      currently disabled but not deleted in case we decide enable back

      */
      
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
        setHasUserScrolled(true); 
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
          <Footer isMobile={isMobile} />
      </div>
    </>
  )
}

export default App
