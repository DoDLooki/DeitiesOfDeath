import { useAnimationFrame } from 'framer-motion';
import { useRef } from 'react';

const FloatingCard = ({ children, index, isMobile }) => {
  const ref = useRef(null);

  useAnimationFrame((t) => {
    if (isMobile){
      const offset = index * 400; // delay between cards
      const x = Math.sin((t + offset) / 500) * 8; // smooth float
      if (ref.current) {
        ref.current.style.transform = `translateX(${x}px)`;
      }
    }else {
      const offset = index * 400; // delay between cards
      const y = Math.sin((t + offset) / 500) * 8; // smooth float
      if (ref.current) {
        ref.current.style.transform = `translateY(${y}px)`;
      }
    }
  });

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '1rem',
        padding: '1rem',
        textAlign: 'center',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.05)',
        position: 'relative',
        height:isMobile ? '30vh' : '30vh',
        maxHeight: '250px',
        maxWidth: '180px',
        width:isMobile ? '40vw' : '15vw',
        willChange: 'transform',
        border: '2px solid #FF4444',
      }}
    >
      {children}
    </div>
  );
};

export default FloatingCard;