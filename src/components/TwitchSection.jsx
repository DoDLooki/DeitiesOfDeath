// components/TwitchSection.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';

export default function TwitchSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{
        padding: '5rem 2rem',
        paddingTop:'2rem',
        backgroundColor: '#101010',
        color: '#FAF9F6',
        fontFamily: 'Cormorant Garamond, serif',
      }}
    >
      <motion.h2
        id="twitch"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          fontSize: 'clamp(2rem, 5vw + 1rem, 4rem)',
          marginBottom: '2rem',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}
        whileHover={{
          scale: 1.05,
          color: '#ffffff',
        }}
      >
        <motion.a
          href="https://www.twitch.tv/deitiesofdeath"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block' }}
        >
          <motion.img
            src="/DeitiesOfDeath/assets/twitch-logo.png"
            alt="Twitch Icon"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '3rem',
              height: '3rem',
              objectFit: 'cover',
              marginTop: '0.5rem',
              filter: 'drop-shadow(0 0 6px rgba(145,70,255,0.4))',
            }}
            />

        </motion.a>
        Twitch
      </motion.h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            flex: '1 1 300px',
            maxWidth: '480px',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '12px',
            cursor: 'pointer',
            marginTop: '2rem',
          }}
          onClick={() => setShowModal(true)}
        >
          <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
            <img
              src="/DeitiesOfDeath/assets/twitch_thumbnail.png"
              alt="Latest Twitch stream preview"
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
              initial={{ opacity: 0 }}
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
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ flex: '1 1 300px', maxWidth: '400px', textAlign: 'left' }}
        >
          <motion.p
            whileHover={{
              scale: 1.05,
              color: '#ffffff',
              textShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
            }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: 'clamp(1.2rem, 2vw + 1rem, 1.8rem)',
              marginBottom: '2rem',
            }}
          >
            We stream multiple times on Twitch, come say hi and join our community!
            <strong style={highlightHover}> ranked matches</strong>,
            <strong style={highlightHover}> events</strong>,
            <strong style={highlightHover}> strategy tips</strong>,
            and <strong style={highlightHover}>community games</strong>.
          </motion.p>

          <div style={{ 
            marginTop: '2rem', 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '2rem', 
            flexWrap: 'wrap',
            textAlign: 'center' 
          }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              style={{
                marginTop: '1.5rem',
                color: '#FAF9F6',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.5rem)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Watch us live!</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ fontSize: '1.5rem' }}
              >
                👉
              </motion.span>
            </motion.div>

            <motion.a
              href="https://www.twitch.tv/deitiesofdeath"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', position: 'relative' }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 20px rgba(145,70,255,0.4)',
                    '0 0 40px rgba(145,70,255,0.7)',
                    '0 0 20px rgba(145,70,255,0.4)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '-10px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  zIndex: 1,
                  background: 'rgba(145,70,255,0.1)',
                  filter: 'blur(10px)',
                }}
              />

              <motion.img
                src="/DeitiesOfDeath/assets/twitch-logo.png"
                alt="Twitch Logo"
                width="100"
                height="100"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  zIndex: 2,
                  position: 'relative',
                  background: '#fff',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  boxShadow: '0 0 15px rgba(145,70,255,0.4)',
                }}
              />
            </motion.a>
          </div>
        </motion.div>
      </div>

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
            src="https://player.twitch.tv/?channel=deitiesofdeath&parent=localhost"
            title="Twitch Stream"
            frameBorder="0"
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
  );
}

const highlightHover = {
  color: '#9146FF',
  fontWeight: 'bold',
  margin: '0 0.3rem',
  textShadow: '0 0 4px rgba(145, 70, 255, 0.6)',
  transition: '0.3s',
};
