import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import { motion } from 'framer-motion';
import { useHomeAnimation } from './../../contexts/HomeAnimationContext';
import data from './../../data.json'; 
import MerchItem from './MerchItem';

const Merch = ({}) => {
  const isMobile = window.innerWidth <= 900;
  const { homeAnimation, setHomeAnimation } = useHomeAnimation();
  return (
    <div style ={{
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
          padding: '5rem 2rem',
          paddingTop:'2rem',
          marginTop: '7vh',
          backgroundColor: '#101010',
          color: '#FAF9F6',
          fontFamily: 'Cormorant Garamond, serif',
        }}
      >
        {/* Title with logo */}
        <motion.h2
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
          Our Merch
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
            href="https://bluehorizon-shop.fourthwall.com/en-eur"
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
              src="/assets/blue_horizon.png"
              alt="Liquipedia"
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                maxWidth: '160px',
                borderRadius: '12px',
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
              See our Merch →
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
              If you want to <strong style={highlightHover}>support us</strong>, check out our <strong style={highlightHover}>merch</strong> store! We have a variety of items available, from <strong style={highlightHover}>t-shirts</strong> to <strong style={highlightHover}>mugs</strong>.
            </motion.p>

          </motion.div>
        </div>
      </motion.section>
      {/* Content layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? "repeat(1, auto)" : 'repeat(3, auto)',
          gap: '2rem',
          marginTop: '4rem',
          justifyContent: 'center', // centre toute la grille
          alignItems: 'center',
        }}
      >
        {data.merch.merch.map((item) => (
          <MerchItem
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            baseUrl={data.merch.url}
          />
        ))}
      </div>



      <Footer />
    </div>
  );
};

export default Merch;

const highlightHover = {
  color: '#ff4444',
  fontWeight: 'bold',
  margin: '0 0.3rem',
  textShadow: '0 0 4px rgba(255, 68, 68, 0.6)',
  transition: '0.3s',
};
