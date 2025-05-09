import { motion } from "framer-motion";
import membersData from "../data.json";
import FlipDiv from "./FlipDiv";

const Members = () => {
  const members = membersData.members;
  const oneThird = Math.floor(members.length / 3);
  const twoThird = oneThird * 2;

const renderRow = (list, direction, duration) => {
  const scrollX = direction === "left" ? "-50%" : "0%";
  const initialX = direction === "left" ? "0%" : "-50%";

  return (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div
        initial={{ x: initialX }}
        animate={{ x: scrollX }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "1.5rem", flexShrink: 0 }}
      >
        {[...list, ...list].map(({ name, year }, i) => (
          <FlipDiv key={`${name}-${year}-${i}`} text={name} under={year} />
        ))}
      </motion.div>
    </div>
  );
};

  return (
    <div
      style={{
        backgroundColor: "#101010",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "2rem",
      }}
    >
            {/* Title */}
      <motion.h2
        id="members"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        whileHover={{
          scale: 1.05,
          color: "#ffffff",
          textShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
        }}
        style={{
          fontSize: "clamp(2rem, 5vw + 1rem, 4rem)",
          marginBottom: "2rem",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "Cormorant Garamond, serif",
          color: "#FAF9F6",
        }}
      >
        {/* Emoji animé à gauche du titre */}
        <motion.span
          role="img"
          aria-label="shield"
          style={{ fontSize: "clamp(1.8rem, 2.5vw + 1rem, 3rem)", display: "inline-block", userSelect: "none"}}
          whileHover={{ scale: 1.2, cursor: "pointer" }}
          whileTap={{ scale: 0.9 }}
        >
          🛡️
        </motion.span>
        Members
      </motion.h2>


      {/* Description */}
      <motion.p
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={{
          color: "#ffffff",
          textShadow: "0 0 8px rgba(255, 255, 255, 0.4)",
          scale: 1.02,
        }}
        style={{
          fontSize: 'clamp(1.2rem, 2vw + 1rem, 2rem)',
          color: "#FAF9F6",
          maxWidth: "900px",
          margin: "0 auto 2rem",
          textAlign: "center",
          fontFamily: "Cormorant Garamond, serif",
        }}
      >
        Discover the full list of{' '}
        <strong style={{ color: "#FF4444", fontWeight: "bold" }}>Deities of Death</strong>{' '}
        members <br/> from <strong style={{ color: "#FF4444" }}>2005</strong> to{' '}
        <strong style={{ color: "#FF4444" }}>today</strong>.
      </motion.p>


      {renderRow(members.slice(0, oneThird), "left", 65)}
      {renderRow(members.slice(oneThird, twoThird), "right", 90)}
      {renderRow(members.slice(twoThird), "left", 75)}
    </div>
  );
};

export default Members;
