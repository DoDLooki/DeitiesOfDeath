// BO.jsx
import React, { useEffect, useState } from 'react';
import { useLayoutEffect } from 'react';
import Header from './../Header';
import { useHomeAnimation } from './../../contexts/HomeAnimationContext';
import { motion } from 'framer-motion';
import AutoImageSlider from './AutoImageSlider';
import GodGrid from './GodGrid';
import data from './../../data.json'; 
import { FaPlayCircle } from 'react-icons/fa';
import EmojiAnimated from './EmojiAnimated';
import Footer from './../Footer';

const BO = () => {
  const isMobile = window.innerWidth <= 900;
  const { homeAnimation, setHomeAnimation } = useHomeAnimation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const el = document.getElementById('top_page');
    if (el) el.scrollIntoView({ behavior: 'auto' }); // or 'auto'
  }, []);

  return (
    <div id={"top_page"} style ={{
      backgroundColor: '#101010',
      color: '#FAF9F6',
      fontFamily: 'Cormorant Garamond, serif',
      minHeight: '100vh',
      paddingBottom: '5rem',
      position: 'relative',
      height: '100%',
      width: '100vw',
    }}>
      <Header isMobile={isMobile} page="BO" setHomeAnimation={setHomeAnimation} /> 
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          padding: isMobile ? "2rem 2rem" : '5rem 2rem',
          paddingTop:'2rem',
          paddingBottom: isMobile ? "0rem" : '5rem',
          backgroundColor: '#101010',
          color: '#FAF9F6',
          fontFamily: 'Cormorant Garamond, serif',
          marginTop: '7vh',
        }}
      >
        {/* Title with logo */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          whileHover={{ scale: 1.05, color: '#ffffff' }}
          style={{
            fontSize: 'clamp(2rem, 5vw + 1rem, 4rem)',
            marginBottom: '2rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <motion.img
            src="/assets/logoOnly.png"
            alt="About Icon"
            whileHover={{ scale: 1.2}}
            transition={{ duration: 0.3 }}
            style={{
              width: '5rem',
              height: '5rem',
              objectFit: 'cover',
            }}
          />
          Build Orders
        </motion.h2>

        {/* Content layout */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '3rem',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <AutoImageSlider />

          {/* Text Block */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              flex: '1 1 300px',
              maxWidth: isMobile ? '80%' : '500px',
              textAlign: isMobile ?"center" : 'right',
            }}
          >
            <motion.p
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05, textShadow: '0 0 6px rgba(255,255,255,0.2)' }}
              style={{
                fontSize: 'clamp(1.2rem, 2vw + 1rem, 1.8rem)',
                color: '#FAF9F6',
              }}
            >
              A <strong style={highlightHover}>build order</strong> in Age of Mythology Retold is a 
              smart, <strong style={highlightHover}>ready-to-go plan</strong> that helps you start every match with 
              <strong style={highlightHover}>confidence</strong>, grab an early <strong style={highlightHover}>advantage</strong>, and 
              <strong style={highlightHover}>snowball your way to victory</strong>.
              </motion.p>

          </motion.div>
        </div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1 }}
              style={{
                fontSize: 'clamp(0.9rem, 2vw + 0.5rem, 1.5rem)',
                color: '#FAF9F6',
                fontWeight: '600',
                textAlign: 'left',
                marginTop: '10vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              Find build orders for your favorite god!
              <motion.span
                animate={{ y: [ -2, 3, -2 ] }} // animate between -20 and 20
                transition={{ duration: 1, repeat: Infinity }}            
                style={{
                  display: 'inline-block',
                  rotate: '90deg'
                }}
              >
                👉
              </motion.span>
            </motion.div>
            <div style={{paddingLeft: '10vw', paddingRight: '10vw', marginTop: '10vh'}}>
              <GodGrid isMobile={isMobile} />
            </div>

            <div style={{ 
              marginTop: '4vw', 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '2rem', 
              flexWrap: 'wrap',
              textAlign: 'center' 
              }}>

              {/* Label + pointing arrow */}
              <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  style={{
                  marginTop: isMobile ? '3rem' : '1.5rem',
                  color: '#FAF9F6',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.5rem)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  }}
              >
                  <span style={{ fontWeight: 'bold' }}> Visit our discord to suggest new Build Orders! </span>
                  {!isMobile && (
                    <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ fontSize: '1.5rem' }}
                  >
                  👉
                  </motion.span>
                  )}
              </motion.div>
              {isMobile && (
              <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ fontSize: '1.5rem' }}
                  >
                  👉
                </motion.span>
              )}
              <motion.a
                  href="https://discord.gg/NwXeNmxs5R"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', position: 'relative' }}
                  whileHover={{ scale: 1.1 }}
              >
                
                  
                  {/* YouTube logo bobbing */}
                  <motion.img
                    src="/assets/discord-icon.png"
                    alt="Join our Discord"
                    whileHover={{
                    scale: 1.15,
                    rotate: [0, 5, -5, 0],
                    filter: 'drop-shadow(0 0 15px #5865F2)',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                    width: isMobile ? '30vw' : '10vw',
                    height: isMobile ? '30vw' : '10vw',
                    objectFit: 'contain',
                    cursor: 'pointer',
                    filter: 'drop-shadow(0 0 6px #5865F2)',
                    }}
                    draggable="false"
                />
              </motion.a>
            </div>

            
             <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: isMobile ? '5vh' : '10vh',
              }}>
              <motion.h3
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.05, textShadow: '0 0 6px rgba(255,255,255,0.2)', cursor: 'default' }}
                style={{
                  fontSize: 'clamp(1.4rem, 2vw + 0.5rem, 2.5rem)',
                  fontWeight: '600',
                  color: '#FAF9F6',
                  textAlign: 'center',
                  marginBottom: '5vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                Watch our Build Order Playlist!
                <EmojiAnimated />
              </motion.h3>


              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ 
                  flex: isMobile ? "1 1 250px" : '1 1 300px',
                  width: '90vw',
                  maxWidth: '640px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}
                onClick={() => setShowModal(true)}
              >
                {/* Aspect ratio wrapper */}
                <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
                  <img
                    src={`https://img.youtube.com/vi/${data.youtube_video_id}/hqdefault.jpg`}
                    alt="Latest playlist thumbnail"
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
            </div>

      {/* Modal */}
        {showModal && (
          <div
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.85)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 99999,
              cursor: 'pointer',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/videoseries?list=${data.youtube_playlist_id}&autoplay=1`}
              title="YouTube Playlist"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: '80vw',
                height: '45vw',
                maxWidth: '960px',
                maxHeight: '540px',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(255,255,255,0.2)',
              }}
            />

          </div>
        )}

      </motion.section>
      <Footer />
    </div>
  );
};

export default BO;

const highlightHover = {
  color: '#ff4444',
  fontWeight: 'bold',
  margin: '0 0.3rem',
  textShadow: '0 0 4px rgba(255, 68, 68, 0.6)',
  transition: '0.3s',
};
