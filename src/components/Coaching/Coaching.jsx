import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './../Header';
import Footer from './../Footer';
import { useHomeAnimation } from './../../contexts/HomeAnimationContext';
import { Toaster, toast } from 'react-hot-toast';
import data from './../../data.json'
import { useState } from 'react';
import FloatingCard from './FloatingCards';
import BouncingGif from './BouncingGif';
import { FaCopy } from 'react-icons/fa'; // Solid copy icon
const timelineSteps = [
  {
    icon: '🎮',
    title: 'Play the Game',
    description: "You're already grinding, but hit a wall.",
  },
  {
    icon: '🧑‍🏫',
    title: 'Get a Coach',
    description: 'Learn build orders, timings, strategies.',
  },
  {
    icon: '📈',
    title: 'Improve Fast',
    description: 'See results quickly and climb the ranks.',
  },
  {
    icon: '🏆',
    title: 'Dominate Ladder',
    description: 'Outplay your opponents consistently.',
  },
  {
    icon: '😄',
    title: 'Have Fun',
    description: 'Enjoy the game more with confidence.',
  }
];


const Coaching = () => {
  const isMobile = window.innerWidth <= 900;
  const { homeAnimation, setHomeAnimation } = useHomeAnimation();

  useEffect(() => {
    const el = document.getElementById('top_page');
    if (el) el.scrollIntoView({ behavior: 'auto' }); // or 'auto'
  }, []);

  const highlightHover = {
    color: '#ff4444',
    fontWeight: 'bold',
    margin: '0 0.3rem',
    textShadow: '0 0 4px rgba(255, 68, 68, 0.6)',
    transition: '0.3s',
  };
const [easterEggs, setEasterEggs] = useState([]);

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
      <Toaster position="bottom-right" toastOptions={{ duration: 6000 }} />
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          padding: isMobile ? "2rem 2rem" : '5rem 2rem',
          paddingTop: '2rem',
          paddingBottom: isMobile ? "0rem" : '5rem',
          backgroundColor: '#101010',
          color: '#FAF9F6',
          fontFamily: 'Cormorant Garamond, serif',
          marginTop: '7vh',
          minHeight: '100vh',
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
            marginBottom: isMobile ? '1rem' : '2rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <motion.img
            src="/assets/logoOnly.png"
            alt="Coaching Icon"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '5rem',
              height: '5rem',
              objectFit: 'cover',
            }}
          />
          Coaching
        </motion.h2>

        {/* Content layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.3 }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            marginTop: isMobile ? '0' : '2rem',
            padding: '2rem 1rem',
          }}
        >
          {timelineSteps.map((step, index) => (
            <FloatingCard key={index} index={index} isMobile={isMobile}>
            <div
              style={{ fontSize: '2.5rem', marginBottom: '0.5rem', cursor: step.icon === '📈' ? 'pointer' : 'default', userSelect: 'none' }}
              onClick={() => {
                if (step.icon === '📈') {
                  setEasterEggs((prev) => [
                    ...prev,
                    { id: Date.now() },
                  ]);
                }
              }}
            >
              {step.icon}
            </div>

            <h4 style={{ color: '#FF4444', fontSize: 'clamp(1.2rem, 1.1vw + 0.6rem, 1.55rem)', marginBottom: '0.5rem' }}>{step.title}</h4>
            <p style={{ color: '#ccc', fontSize: 'clamp(1rem, 1vw + 0.3rem, 1.2rem)' }}>{step.description}</p>

            {!isMobile && index < timelineSteps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  right: '-2.1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  height: '2px',
                  width: '2.1rem',
                  backgroundColor: '#FF4444',
                }}
              />
            )}
            {isMobile && index < timelineSteps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '-2.1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '2px',
                  height: '2.1rem',
                  backgroundColor: '#FF4444',
                }}
              />
            )}
          </FloatingCard>

          ))}
        </motion.div>

       <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            width: '100%',
            padding: isMobile ? '0' : '2rem',
            marginTop: isMobile ? '0' : '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, color: '#ffffff' }}
            style={{
              fontSize: 'clamp(2rem, 5vw + 1rem, 4rem)',
              marginBottom: isMobile ? '1rem' : '2rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
          <motion.h2
            src="/assets/logoOnly.png"
            alt="Coaching Icon"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: '4rem',
              objectFit: 'cover',
            }}
          >
            🎯
          </motion.h2>
          Our Coaches
        </motion.h2>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#ccc',
              textAlign: 'center',
              marginTop: '-1rem',
              marginBottom: isMobile ? '1rem' : '2rem',
              maxWidth: '600px',
            }}
          >
            To book a coaching session, please{' '}
            <a
              href="https://discord.com/invite/Q4nR7Re7tp"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#3399ff',
                textDecoration: 'underline',
              }}
            >
              join our Discord server
            </a>{' '}
            and ask for a coach, an admin will assist you in booking a session.
          </p>


          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2rem',
              maxWidth: '1000px',
            }}
          >
            {data.coaches.map((coach, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 68, 68, 0.4)' }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: '#1a1a1a',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  width: isMobile ? '200px' : '250px',
                  color: '#FAF9F6',
                  textAlign: 'center',
                  boxShadow: '0 0 12px rgba(255, 255, 255, 0.05)',
                }}
              >
                <img
                  src={coach.avatar}
                  alt={coach.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    marginBottom: '1rem',
                    border: '2px solid #FF4444',
                  }}
                />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{coach.name}</h3>
                <p style={{ color: '#FF4444', fontWeight: 'bold' }}>ELO: {coach.elo}</p>
                <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>{coach.tagline}</p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginTop: '1.5rem',
                  }}
                >
                  {/* AoM Stats Link */}
                  <a href={coach.aomstats} target="_blank" rel="noopener noreferrer">
                    <img
                      src="/assets/aomstats.webp"
                      alt="AoM Stats"
                      style={{
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        filter: 'drop-shadow(0 0 2px #fff)',
                        transition: 'transform 0.3s',
                        marginTop:"0.2rem"
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                    />
                  </a>

                  {/* Discord Link */}
                  <div
                    title={`Copy ${coach.name}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    <FaCopy
                      size={20}
                      style={{
                        cursor: 'pointer',
                        filter: 'drop-shadow(0 0 1px #fff)',
                        transition: 'transform 0.2s',
                      }}
                      title="Copy username"
                      onClick={() => {
                        navigator.clipboard.writeText(coach.name);
                        toast.success(`Copied ${coach.name} to clipboard!`);
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                    />
                  </div>

                </div>

              </motion.div>

            ))}
          </div>
        </motion.div>

        <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          width: '100%',
          overflowX: 'auto',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
          flexDirection: 'column',
          alignItems: 'center',
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
          <motion.span
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: '3rem', display: 'inline-block', pointer:'cursor'}}
          >
            💵
          </motion.span>
          Prices
        </motion.h2>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#ccc',
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '2rem',
              maxWidth: '600px',
            }}
          >
            Please note that prices can be negotiated with the coaches.           
          </p>
        <table
          style={{
            width: isMobile ? '80vw' : '50vw',
            borderCollapse: 'collapse',
            fontSize: 'clamp(1rem, 1.2vw, 1.5rem)',
            fontFamily: 'Cormorant Garamond, serif',
            color: '#FAF9F6',
            backgroundColor: '#1a1a1a',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 0 12px rgba(255, 255, 255, 0.1)',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#222' }}>
              <th style={thStyle}>Coach ELO</th>
              <th style={thStyle}>Hourly Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>&lt; 1500</td>
              <td style={tdStyle}>10€</td>
            </tr>
            <tr>
              <td style={tdStyle}>1500 – 1650</td>
              <td style={tdStyle}>15€</td>
            </tr>
            <tr>
              <td style={tdStyle}>1650 – 1800</td>
              <td style={tdStyle}>20€</td>
            </tr>
            <tr>
              <td style={tdStyle}>1800 - 2000</td>
              <td style={tdStyle}>25€</td>
            </tr>
            <tr>
              <td style={tdStyle}>&gt; 2000</td>
              <td style={tdStyle}>Negotiable price</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      </motion.section>
      <div
        id="gif-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        {easterEggs.map((egg) => (
          <BouncingGif key={egg.id} id={egg.id} src="/assets/stonks-meme.gif" />
        ))}
      </div>



      <Footer />
      </div>
  );
};

const thStyle = {
  padding: '1rem',
  border: '2px solid #444',
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#FF4444',
};

const tdStyle = {
  padding: '1rem',
  border: '1px solid #333',
  textAlign: 'center',
};


export default Coaching;
