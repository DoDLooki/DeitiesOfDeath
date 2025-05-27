import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const gods = [
  'zeus',
  'poseidon',
  'hades',
  'ra',
  'isis',
  'set',
  'kronos',
  'oranos',
  'gaia',
  'nuwa',
  'shennong',
  'fuxi',
  'odin',
  'thor',
  'loki',
  'freyr',
];

const GodGrid = ({isMobile}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' :'repeat(8, 1fr)',
        gap: '1.5vw',
        justifyItems: 'center',
        marginTop: '5vh',
      }}
    >
      {gods.map((god, index) => (
        <Link
          key={god}
          to={`/build-orders/${god}`}
          style={{ textDecoration: 'none' }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.07,
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
            }}
            animate={ isMobile ? {
              x: [0, -8, 4, -4, 0],
              rotate: [0, 2, -2, 1, 0],
              scale: [1, 1.02, 0.98, 1.01, 1],
            } :{
              y: [0, -8, 4, -4, 0],
              rotate: [0, 2, -2, 1, 0],
              scale: [1, 1.02, 0.98, 1.01, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.4,
            }}
            style={{
              width: isMobile ? "20vw" : '6vw',
              height: isMobile ? "20vw" : '6vw',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: '2px solid #ff4444',
              padding: '0.5rem',
            }}
          >
            <motion.img
              src={`/assets/BOs/images/${god}_icon.png`}
              alt={god}
              style={{
                width: isMobile ? "20vw" : '6vw',
                height: isMobile ? "20vw" : '6vw',
                objectFit: 'cover',
                borderRadius: '50%',
                userSelect: 'none',
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            />
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default GodGrid;
