import React from 'react';
import Footer from './Footer'; 

const Contact = () => (
    <>
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1rem, 1.2vw, 1.5rem)', color: "#ffffff" }}>
    <h1>Contact</h1>
    <p>You can reach us via our Discord server:</p>
    <p>
      <a href="https://discord.com/invite/Q4nR7Re7tp" target="_blank" rel="noopener noreferrer">
        Join our Discord
      </a>
    </p>
    <p>We typically reply quickly there!</p>
  </div>    
  <Footer />
  </>
);

export default Contact;
