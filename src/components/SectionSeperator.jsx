import { useState } from 'react';
import { motion } from 'framer-motion';

const SectionSeparator = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#101010',
        padding: '2.5rem 0',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          boxShadow: isHovered ? '0 0 10px rgba(156, 17, 17, 0.6)' : 'none',
        }}
        transition={{ duration: 0.3 }}
        style={{
          width: '80px',
          height: '4px',
          backgroundColor: '#9c1111',
          margin: '0 auto',
          borderRadius: '3px',
          opacity: 0.9,
        }}
      />
    </div>
  );
};

export default SectionSeparator;
