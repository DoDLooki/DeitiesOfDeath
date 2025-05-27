import { useState } from 'react';
import { motion } from 'framer-motion';

const EmojiAnimated = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.span
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      whileTap={{ scale: 0.8 }}
      animate={isHovering ? { rotate: [0, -20, 20, -10, 0], scale: 1.2 } : { rotate: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{ display: 'inline-block', cursor: 'pointer', userSelect: 'none' }}
    >
      🎥
    </motion.span>
  );
};
export default EmojiAnimated;