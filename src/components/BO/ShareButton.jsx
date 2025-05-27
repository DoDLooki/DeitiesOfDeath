import { Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';
import toast from 'react-hot-toast';

const ShareButton = ({ title, god }) => {
  const handleCopy = () => {
    const url = `${window.location.origin}/build-order/${god}/${encodeURIComponent(title)}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link.');
      });
  };

  return (
    <motion.button
      onClick={handleCopy}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: '#16a34a',
        color: '#ffffff',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.5rem 1rem',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.2s ease',
        fontFamily: `'Cormorant Garamond', serif`,
        fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
      }}
      whileHover={{ backgroundColor: '#15803d' }}
      whileTap={{ scale: 0.95, backgroundColor: '#166534' }}
    >
      <Share2 size={18} />
      Share
    </motion.button>
  );
};

export default ShareButton;
