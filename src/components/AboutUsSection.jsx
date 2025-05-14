// components/AboutUsSection.jsx
import { motion } from 'framer-motion';

export default function AboutUsSection({isMobile}) {
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
      {/* Title with logo */}
      <motion.h2
        id="about us"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
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
          src="/DeitiesOfDeath/assets/logoOnly.jpg"
          alt="About Icon"
          whileHover={{ scale: 1.2}}
          transition={{ duration: 0.3 }}
          style={{
            width: '5rem',
            height: '5rem',
            objectFit: 'cover',
          }}
        />
        About Us
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
        {/* Liquipedia Callout */}
        <motion.a
          href="https://liquipedia.net/ageofempires/Deities_of_Death"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          whileHover={{ scale: 1.1 }}
          style={{
            flex: '1 1 200px',
            maxWidth: '240px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            color: '#FAF9F6',
            gap: '1rem',
          }}
        >
          <motion.img
            src="/DeitiesOfDeath/assets/OIP.png"
            alt="Liquipedia"
            transition={{ duration: 0.3 }}
            style={{
              width: '100%',
              maxWidth: '160px',
              borderRadius: '12px',
              background: '#fff',
              padding: '0.5rem',
              boxShadow: '0 0 12px rgba(255,255,255,0.3)',
              marginTop:'3vh'
            }}
          />
          <motion.span
            transition={{ duration: 0.3 }}
            style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            Visit our Liquipedia →
          </motion.span>
        </motion.a>

        {/* Text Block */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
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
            <strong style={highlightHover}>DoD</strong> has been a <strong style={highlightHover}>dominant force</strong> in the <strong style={highlightHover}>competitive scene</strong> for over 20 years, known for <strong style={highlightHover}>skill</strong>, <strong style={highlightHover}>strategy</strong>, and a <strong style={highlightHover}>large</strong> and <strong style={highlightHover}>engaged community</strong>.
          </motion.p>

        </motion.div>
      </div>
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
