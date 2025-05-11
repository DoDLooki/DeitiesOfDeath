import { motion } from "framer-motion";
import { useMemo } from "react";

// Color themes
const colorThemes = [
  { border: "#FF0000", bg: "rgba(255, 0, 0, 0.08)", hover: "#FF0000" },
  { border: "#FF0000", bg: "rgba(255, 0, 0, 0.08)", hover: "#FF0000" },
  { border: "#00C853", bg: "rgba(0, 200, 83, 0.08)", hover: "#00E676" },
  { border: "#8A2BE2", bg: "rgba(138, 43, 226, 0.08)", hover: "#BA55D3" },
];

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipDiv = ({ text, under, selectedText, onSelect }) => {
  const theme = useMemo(() => {
    return colorThemes[Math.floor(Math.random() * colorThemes.length)];
  }, []);

  const isSelected = selectedText === text;

  return (
    <div
      onClick={onSelect}
      style={{
        display: "inline-block",
        minWidth: "4rem",
        border: `1px solid ${theme.border}`,
        backgroundColor: isSelected ? theme.hover : theme.bg,
        color: isSelected ? "#FAF9F6" : theme.border,
        fontSize: "clamp(0.75rem, 0.9vw, 1rem)",
        borderRadius: "0.5rem",
        transition: "background-color 0.2s, color 0.2s",
        cursor: "pointer",
      }}
    >
      <motion.div
        initial="initial"
        animate={isSelected ? "hovered" : "initial"}
        style={{
          position: "relative",
          display: "block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "1rem 1.5rem",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.05em",
          lineHeight: 0.85,
        }}
      >
        {/* Default text */}
        <div>
          <motion.span
            style={{ display: "inline-block" }}
            variants={{
              initial: { y: "-10%" },
              hovered: { y: "-500%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER,
            }}
          >
            {text}
          </motion.span>
        </div>

        {/* Selected (flipped) text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.span
            style={{
              fontSize: "clamp(1rem, 1vw + 0.4rem, 1.5rem)",
              fontWeight: 600,
            }}
            variants={{
              initial: { y: "500%" },
              hovered: { y: "0%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER,
            }}
          >
            {under ?? text}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipDiv;
