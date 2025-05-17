import React from 'react';
import { Link } from 'react-router-dom';

const Coaching = () => {
  const isMobile = window.innerWidth <= 900;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
        color: '#FAF9F6',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: isMobile ? 'clamp(0.9rem, 1vw, 1.2rem)' : 'clamp(1rem, 1vw, 1.5rem)',
        height: '100vh',
      }}
    >
      <h1>Coming soon !</h1>
      <Link
        to="/"
        style={{
          color: '#FF4444',
          textDecoration: 'none',
          fontSize: 'clamp(1rem, 1vw, 1.5rem)',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          border: '1px solid #FF4444',
          borderRadius: '5px',
          backgroundColor: '#111',
          transition: 'background-color 0.3s, color 0.3s',
          cursor: 'pointer',
          display: 'inline-block'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = '#FF4444';
          e.currentTarget.style.color = '#111';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = '#111';
          e.currentTarget.style.color = '#FF4444';
        }}
      >
        Back to Home Page
      </Link>
    </div>
  );
};

export default Coaching;
