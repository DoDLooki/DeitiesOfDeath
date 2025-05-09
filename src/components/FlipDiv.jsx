import { motion } from "framer-motion";

// 👇 Palette de couleurs utilisées aléatoirement
const colorThemes = [
  { border: "#FF0000", bg: "rgba(255, 0, 0, 0.08)", hover: "#FF0000" },       // rouge vif
  { border: "#FF0000", bg: "rgba(255, 0, 0, 0.08)", hover: "#FF0000" },       // rouge vif
  { border: "#FF8C00", bg: "rgba(255, 140, 0, 0.08)", hover: "#FFA500" },     // orange foncé / orange vif
  { border: "#00C853", bg: "rgba(0, 200, 83, 0.08)", hover: "#00E676" },      // vert éclatant (lime / néon)
];



const DURATION = 0.25;
const STAGGER = 0.025;

const FlipDiv = ({ text, under }) => {
  const theme = colorThemes[Math.floor(Math.random() * colorThemes.length)];

  return (
    <div
      style={{
        display: "inline-block",
        minWidth: "4rem",
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.bg,
        color: theme.border,
        fontSize: "clamp(0.75rem, 0.9vw, 1rem)",
        borderRadius: "0.5rem",
        transition: "background-color 0.2s, color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.hover;
        e.currentTarget.style.color = "#FAF9F6";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme.bg;
        e.currentTarget.style.color = theme.border;
      }}
    >
      <motion.div
        initial="initial"
        whileHover="hovered"
        style={{
          position: "relative",
          display: "block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "1rem 1.5rem",
          fontSize: "clamp(0.7rem, 0.8vw + 0.4rem, 1rem)",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.05em",
          lineHeight: 0.85,
        }}
      >
        {/* Texte normal */}
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

        {/* Texte hover */}
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
              fontSize: "clamp(1rem, 1.4vw + 0.4rem, 1.75rem)",
              fontWeight: 700,
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
            {under ? under : <span style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)" }}>{text}</span>}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipDiv;
