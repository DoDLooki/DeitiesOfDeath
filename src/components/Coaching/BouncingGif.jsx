import React, { useRef, useEffect, useState } from 'react';
import { useAnimationFrame } from 'framer-motion';

const BouncingGif = ({ id, src, width = 60, height = 60 }) => {
  const ref = useRef(null);
  const container = useRef({ width: window.innerWidth, height: window.innerHeight });

  const [pos, setPos] = useState({
    x: Math.random() * (container.current.width - width),
    y: Math.random() * (container.current.height - height),
  });

  const [dir, setDir] = useState({
    dx: Math.random() > 0.5 ? 1 : -1,
    dy: Math.random() > 0.5 ? 1 : -1,
  });

  useAnimationFrame(() => {
    setPos((prev) => {
      let newX = prev.x + dir.dx * 2;
      let newY = prev.y + dir.dy * 2;

      let newDx = dir.dx;
      let newDy = dir.dy;

      if (newX <= 0 || newX >= container.current.width - width) newDx *= -1;
      if (newY <= 0 || newY >= container.current.height - height) newDy *= -1;

      setDir({ dx: newDx, dy: newDy });

      return { x: newX, y: newY };
    });

    if (ref.current) {
      ref.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
  });

  return (
    <img
      ref={ref}
      src={src}
      alt="Bouncing"
      style={{
        position: 'fixed',
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default BouncingGif;