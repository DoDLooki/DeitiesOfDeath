import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DiscordSection({isMobile}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('discord');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const starCount = isMobile ? 30 : 60; // adjust how many Discord stars you want
  const stars = Array.from({ length: starCount });

  return (
    <div
      id="discord"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '50vh',
        background: '#0f0f0f',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? "3rem 0" : '4rem 1rem',
        color: '#FAF9F6',
        textAlign: 'center',
        maxWidth: '100vw',
      }}
    >
      {/* Star-field made of Discord logos */}
      {stars.map((_, i) => {
        const size = Math.random() * 20 + 10; // 10px to 30px
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = Math.random() * 0.4 + 0.1;
        const delay = Math.random() * 2;
        const duration = Math.random() * 4 + 3;

        return (
          isVisible && (
            <motion.img
            key={i}
            src="/assets/discord-icon.png"
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration,
              delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              filter: 'drop-shadow(0 0 4px #5865F2)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )
        );
      })}

      {/* Foreground content */}
      {/* Interactive cluster of Discord icons (clickable) */}
    {/* Floating clickable Discord icons – like bright stars */}
    {[...Array(isMobile ? 4 : 7)].map((_, i) => {
        const size = isMobile ? Math.random() * 25 + 30 : Math.random() * 30 + 40; // 40px to 70px
        const left = Math.random() * 90 + 5;
        let top = Math.random() * 85 + 5;
        const delay = Math.random() * 10;
        const floatDistance = Math.random() * 5 + 5;
        const opacity = Math.random() * 0.4 + 0.6;
        const duration = Math.random() * 3 + 3;
        const rotate = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees

        if (top > 35 && top < 55) {
            top += 10; // Move down if in the middle range
        }

        return (
            isVisible && <motion.a
                key={`clickable-${i}`}
                href="https://discord.com/invite/Q4nR7Re7tp"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity }}
                transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration,
                    delay,
                    ease: 'easeInOut',
                }}
                style={{
                    position: 'absolute',
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    zIndex: 5,
                    display: 'block',
                }}
                >
                <motion.img
                    src="/assets/discord-icon.png"
                    alt="Join our Discord"
                    whileHover={{
                    scale: 1.25,
                    rotate: [0, 5, -5, 0],
                    filter: 'drop-shadow(0 0 15px #5865F2)',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    cursor: 'pointer',
                    filter: 'drop-shadow(0 0 6px #5865F2)',
                    }}
                    draggable="false"
                />
                </motion.a>

        );
        })}



      {/* Title + link with entrance animation */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
                zIndex: 10,
                textAlign: 'center',
                cursor: 'default',
            }}
            >
            <motion.h2
                whileHover={{
                scale: 1.05,
                textShadow: '0 0 12px rgba(88, 101, 242, 0.5)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.7rem, 4vw, 3rem)',
                letterSpacing: '0.05em',
                margin: 0,
                }}
            >
                JOIN OUR{' '}
                <a
                    href="https://discord.gg/zCkpuXgj"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: '#5865F2',
                        borderBottom: '0.25vh solid #5865F2',      // custom underline
                        textDecoration: 'none',                 // disable default underline
                        paddingBottom: '4px',                   // pushes line further down
                        lineHeight: '1',                      // increases space below text
                        cursor: 'pointer',
                    }}
                    >
                    DISCORD
                </a>

            </motion.h2>
            </motion.div>

            {/* Subtitle with separate entrance + hover effect */}
            <motion.div
            initial={{ opacity: 0}}
            animate={isVisible ? { opacity: 1} : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ zIndex: 10 }}
            >
            <motion.p
                whileHover={{
                scale: 1.03,
                color: '#ffffff',
                textShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                color: '#cccccc',
                marginTop: '1rem',
                maxWidth: '90vw',
                cursor: 'default',
                }}
            >
                Over 600 members sharing builds, strategies, content, and games.
            </motion.p>
        </motion.div>


    </div>
  );
}
