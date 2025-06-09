import React from 'react';
import Footer from './Footer'; 

const Legal = () => (
    <>
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1rem, 1.2vw, 1.5rem)', color: "#ffffff" }}>

    <h1>Legal Notice</h1>
    <p>Editor: Looki</p>
    <p>Hosting: GitHub Pages</p>
    <p>Contact: via our <a href="/contact">contact page</a></p>
    <p>This website is a non-profit project made for the AoM community.</p>
  </div>
    <Footer />
  </>
);

export default Legal;
