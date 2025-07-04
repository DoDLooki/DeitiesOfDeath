import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Header({isMobile, page, setHasUserScrolled, setHomeAnimation}) {
    
  const scrollTo = (id) => {
      const el = document.getElementById(id);
      if (!el) {
          console.warn(`Element with id "${id}" not found`);
          return;
      }

      const offset = 120;
      const scrollContainer = document.getElementById('root'); // 💥 THIS is your scrollable container

      const targetY = el.getBoundingClientRect().top + scrollContainer.scrollTop - offset;
      const startY = scrollContainer.scrollTop;
      const distance = targetY - startY;

      console.log({ startY, targetY, distance });

      if (Math.abs(distance) < 10) {
          console.log('Already at target position or too close.');
          return;
      }

      const duration = 1500;
      const startTime = performance.now();

      function scrollStep(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = progress < 0.5
              ? 16 * Math.pow(progress, 5)
              : 1 - Math.pow(-2 * progress + 2, 5) / 2;

          scrollContainer.scrollTop = startY + distance * ease;

          if (progress < 1) {
              requestAnimationFrame(scrollStep);
          }
      }

      requestAnimationFrame(scrollStep);
      setHasUserScrolled(true);
  };



    const getPathFromLabel = (label) => {
      if (label === "About Us" && page !== 'HomePage') {
        return '/';
      }
        switch (label) {
            case 'Build Orders':
            return '/build-orders';
            case 'Coaching':
            return '/coaching';
            case 'Merch':
            return '/merch';
            case 'Random Draft':
            return '/random-draft';
            default:
            return null; // internal scroll section
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
            position: 'fixed',
            top: 0,
            width: page === 'HomePage' ? '100%' : 'calc(100% - 12px)',
            display: 'flex',
            justifyContent: 'center',
            gap: '5vw',
            paddingTop: '2vh',
            paddingBottom: '2vh',
            color: '#FAF9F6',
            fontFamily: 'Cormorant Garamond, serif',
            zIndex: 999,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderBottom: '2px solid #9c1111',
            backdropFilter: 'blur(6px)',
            height: '7vh',
            maxHeight: '7vh',
            }}
        >
            {((isMobile || page !== 'HomePage') ? ['About Us', 'Build Orders', 'Coaching', 'Merch', 'Random Draft'] : ['About Us', 'Discord', 'Build Orders', 'Coaching', 'Merch', 'Random Draft']).map((label) => {
          const path = getPathFromLabel(label);

          return <motion.div
            key={label}
            whileHover={{
              scale: 1.05,
              color: '#ffffff',
              textShadow: '0 0 8px rgba(255,255,255,0.4)',
              borderBottom: '2px solid #FF0000',
            }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex', // <- use flex to normalize vertical alignment
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%', // optional: if your header has height
            }}
          >
            {path ? (
              <Link
                to={path}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.7rem, 1.5vw, 1.5rem)',
                  fontFamily: 'Cormorant Garamond, serif',
                  zIndex: 999,
                  paddingBottom: '0',
                  whiteSpace: 'nowrap',
                  lineHeight: '1',
                  margin: '0',
                  textDecoration: isMobile ? 'underline' : 'none',
                  textDecorationColor: '#FF0000',
                  textDecorationThickness: '1px',
                  textUnderlineOffset: '5px',
                }}
                onClick={() => setHomeAnimation(prev => prev || (page === 'HomePage' ? true : false))} // Reset animation state on click
              >
                {label}
              </Link>
            ) : (
              <button
                onClick={() => scrollTo(label.toLowerCase())}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.7rem, 1.5vw, 1.5rem)',
                  fontFamily: 'Cormorant Garamond, serif',
                  zIndex: 999,
                  paddingBottom: '0',
                  whiteSpace: 'nowrap',
                  lineHeight: '1',
                  margin: '0',
                  textDecoration: isMobile ? 'underline' : 'none',
                  textDecorationColor: '#FF0000',
                  textDecorationThickness: '1px',
                  textUnderlineOffset: '5px',
                }}
              >
                {label}
              </button>
            )}
          </motion.div>

        })}
        </motion.div>
    )
}