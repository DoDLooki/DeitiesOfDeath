import { motion } from "framer-motion";
import React from "react";

type MerchProps = {
  id: string;
  image: string;
  title: string;
  price: string;
  baseUrl: string;
};

const MerchItem: React.FC<MerchProps> = ({ id, image, title, price, baseUrl }) => {
  const fullUrl = `${baseUrl}${id}`;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.open(fullUrl, "_blank")}
      style={{
        width: '250px',
        height: '350px',
        cursor: 'pointer',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
      }}
    >
      {/* Image section with white background */}
      <div
        style={{
          width: '100%',
          height: '250px',
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          boxSizing: 'border-box',
          borderRadius: '16px',
          
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>

      {/* Text section with white centered text */}
      <div
        style={{
          height: '100px',
          width: '100%',
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0.5rem',
          boxSizing: 'border-box',
          textAlign: 'center',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)',
            marginBottom: '0.4rem',
            lineHeight: '1.3',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
            opacity: 0.85,
          }}
        >
          {price}
        </div>
      </div>
    </motion.div>
  );
};

export default MerchItem;
