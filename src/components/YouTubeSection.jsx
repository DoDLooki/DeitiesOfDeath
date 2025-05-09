// components/YouTubeSection.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';

export default function YouTubeSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{
        padding: '5rem 2rem',
        backgroundColor: '#101010',
        color: '#FAF9F6',
        fontFamily: 'Cormorant Garamond, serif',
      }}
    >
    {/* Title */}
    <motion.h2
        id="youtube"
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
            href="https://www.youtube.com/@DeitiesofDeath"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block' }}
        >
            <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="#FF0000"
            width="2.8rem"
            height="2.8rem"
            whileHover={{ scale: 1.2 }}
            >
            <path d="M549.655 124.083c-6.281-23.65-24.822-42.21-48.472-48.48C465.915 64 288 64 288 64S110.085 64 74.817 75.603c-23.65 6.27-42.191 24.82-48.472 48.47C15.73 159.385 15.73 256 15.73 256s0 96.615 10.615 131.917c6.281 23.65 24.822 42.21 48.472 48.48C110.085 448 288 448 288 448s177.915 0 213.183-11.603c23.65-6.27 42.191-24.82 48.472-48.47C560.27 352.615 560.27 256 560.27 256s0-96.615-10.615-131.917zM232 336V176l142 80-142 80z" />
            </motion.svg>
        </motion.a>
        YouTube
        </motion.h2>


      {/* Text + Thumbnail */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ flex: '1 1 300px', maxWidth: '500px', textAlign: 'left' }}
        >
          <motion.p
            whileHover={{
              scale: 1.05,
              color: '#ffffff',
              textShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
            }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: 'clamp(1.2rem, 2vw + 1rem, 2rem)',
              marginBottom: '2rem',
            }}
          >
            Our YouTube channel features multiple new videos every week:
            <strong style={highlightHover}> build orders</strong>,
            <strong style={highlightHover}> gameplay</strong>,
            <strong style={highlightHover}> coaching sessions</strong>,
            <strong style={highlightHover}> commentaries</strong>, and more.
          </motion.p>

          {/* Spinning logo + arrows */}
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

            {/* Label + pointing arrow */}
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
                <span style={{ fontWeight: 'bold' }}>Visit our Channel!</span>
                <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ fontSize: '1.5rem' }}
                >
                👉
                </motion.span>
            </motion.div>
            <motion.a
                href="https://www.youtube.com/@DeitiesofDeath"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', position: 'relative' }}
                whileHover={{ scale: 1.1 }}
            >
                {/* Glowing pulse background */}
                <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                    '0 0 20px rgba(255,0,0,0.4)',
                    '0 0 40px rgba(255,0,0,0.7)',
                    '0 0 20px rgba(255,0,0,0.4)',
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
                    background: 'rgba(255,0,0,0.1)',
                    filter: 'blur(10px)',
                }}
                />

                {/* YouTube logo bobbing */}
                <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="#FF0000"
                width="80"
                height="80"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    zIndex: 2,
                    position: 'relative',
                    background: '#fff',
                    padding: '1rem',
                    borderRadius: '50%',
                    boxShadow: '0 0 15px rgba(255,0,0,0.4)',
                }}
                >
                <path d="M549.655 124.083c-6.281-23.65-24.822-42.21-48.472-48.48C465.915 64 288 64 288 64S110.085 64 74.817 75.603c-23.65 6.27-42.191 24.82-48.472 48.47C15.73 159.385 15.73 256 15.73 256s0 96.615 10.615 131.917c6.281 23.65 24.822 42.21 48.472 48.48C110.085 448 288 448 288 448s177.915 0 213.183-11.603c23.65-6.27 42.191-24.82 48.472-48.47C560.27 352.615 560.27 256 560.27 256s0-96.615-10.615-131.917zM232 336V176l142 80-142 80z" />
                </motion.svg>
            </motion.a>
            </div>


        </motion.div>

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

            {/* Aspect ratio wrapper */}
            <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
                <img
                src="https://img.youtube.com/vi/5lVXLz3iZRA/hqdefault.jpg"
                alt="Latest video thumbnail"
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
            src="https://www.youtube.com/embed/5lVXLz3iZRA?autoplay=1"
            title="Latest YouTube Video"
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
  );
}

const highlightHover = {
  color: '#ff4444',
  fontWeight: 'bold',
  margin: '0 0.3rem',
  textShadow: '0 0 4px rgba(255, 68, 68, 0.6)',
  transition: '0.3s',
};
