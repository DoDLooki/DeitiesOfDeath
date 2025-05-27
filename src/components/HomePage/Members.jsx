import { motion } from "framer-motion";
let data;

(async () => {
  const response = await fetch('/assets/data.json');
  data = await response.json();

  // If needed, call the main function here:
  // init(data);
})();

import FlipDiv from "./FlipDiv";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Papa from "papaparse";
import { ungzip } from "pako";


const Members = ({setKilledDoDMember, isMobile}) => {
  const [scrollValue, setScrollValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(isMobile ? false : true);
  const intervalRef = useRef(null);
  const [selectedText, setSelectedText] = useState(null);
  const [J4count, setJ4count] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" }); // preload slightly before

  const members = membersData.members;
  const oneThird = Math.floor(members.length / 3);
  const twoThird = oneThird * 2;

  useEffect(() => {
    if (isInView && isPlaying) {
      intervalRef.current = setInterval(() => {
        setScrollValue((prev) => (prev + 0.03) % 50);
      }, 40);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, isInView]); // ✅ include isInView


  const handleSelection = (text) => {
    setSelectedText(prevText => prevText === text ? null : text);
    if (text.trim().toLowerCase() === "j4jc3") {
      setJ4count((prevCount) => prevCount + 1);
    }
  }


    const renderRow = (list, scrollValue, reverse = false) => {
      // Extend the list to simulate offscreen space
      const bufferSize = 15;
      const extendedList = reverse
        ? [...list.slice(-bufferSize), ...list] // content starts offscreen (left), flows in to right
        : [...list, ...list.slice(0, bufferSize)];

      // Compute scroll position
      const scrollX = reverse ? `-${50 - scrollValue}%` : `-${scrollValue}%`; // 👈 THIS is key

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
            animate={{ x: scrollX }}
            transition={{ type: "tween", duration: 0.5 }}
            style={{
              display: "flex",
              gap: "1.5rem",
              flexShrink: 0,
            }}
          >
            {extendedList.map(({ name, year }, i) => (
              <FlipDiv key={`${name}-${year}-${i}-${reverse}`} text={name} under={year} onSelect={() => handleSelection(name)} selectedText={selectedText} isMobile={isMobile}/>
            ))}
          </motion.div>
        </div>
      );
    };

  const staff = [
    { name: "J4Jc3", title: "Boss" },
    { name: "Fox", title: "Underboss" },
    { name: "Godschalk", title: "General" },
    { name: "Joe", title: "General" },
    { name: "Jollyman", title: "General" },
    { name: "Kries", title: "General" },
  ];

  const generals = staff.filter((m) => m.title === "General");
  const others = staff.filter((m) => m.title !== "General");


  return (
    <div
      ref={containerRef}
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
          fontSize: "clamp(2rem, 5vw + 1.5rem, 4rem)",
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
          style={{ fontSize: "clamp(1.8rem, 2.5vw + 1.5rem, 3rem)", display: "inline-block", userSelect: "none"}}
          whileHover={{ scale: 1.2, cursor: "pointer" }}
          whileTap={{ scale: 0.9 }}
        >
          🛡️
        </motion.span>
        Members
      </motion.h2>

            {/* Staff Section */}
      {/* Staff Section */}
      {/* Staff Row - All in one line */}
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "2rem",
        flexWrap: "wrap",
      }}
    >
      {/* Non-generals */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3vw",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {others.map(({ name, title }) => (
            <div
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#FAF9F6",
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              <img
                src={`/assets/${name}.png`}
                alt={name}
                style={{
                  width: isMobile ? "20vw" : "7vw",
                  height: isMobile ? "20vw" : "7vw",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "0.15vw solid #FF4444",
                }}
              />
              <p style={{ marginTop: "0.8vw", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}>{name}</p>
              <div
                style={{
                  width: "4vw",
                  height: "0.15vw",
                  backgroundColor: "#FF4444",
                  margin: "0.3vw 0",
                }}
              ></div>
              <p style={{ fontSize: "clamp(1.1rem, 1.2vw, 1.1rem)", color: "#FF4444" }}>{title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generals group */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap:'0',
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
            paddingRight: isMobile ? "10vw" : "0vw",
            paddingLeft: isMobile ? "10vw" : "0vw",
          }}
        >
          {generals.map(({ name }) => (
            <div
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#FAF9F6",
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              <img
                src={`/assets/${name}.png`}
                alt={name}
                style={{
                 width: isMobile ? "20vw" : "7vw",
                  height: isMobile ? "20vw" : "7vw",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "0.15vw solid #FF4444",
                }}
              />
                <p style={{ marginTop: "0.8vw", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}>{name}</p>

            </div>
          ))}
        </div>

        {/* Shared line and title below the group */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "28vw",
              height: "0.15vw",
              backgroundColor: "#FF4444",
              margin: "0.3vw",
            }}
          ></div>
          <p
            style={{
              fontSize: "clamp(1.1rem, 1.2vw, 1.1rem)",
              color: "#FF4444",
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Generals
          </p>
        </div>
      </div>
    </div>





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
          maxWidth: isMobile ? "80vw" : "900px",
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <input
          type="range"
          min="0"
          max="50"
          value={scrollValue}
          onChange={(e) => setScrollValue(parseInt(e.target.value))}
          style={{
            width: isMobile ? "70vw" : "200px",
            accentColor: "#FF4444",
            cursor: "pointer",
          }}
          aria-label="Scroll All Rows"
        />
        { !isMobile && (!isPlaying ? (
        <button
          onClick={() => setIsPlaying(true)}
          style={{
            background: "none",
            border: "1px solid #00C853",
            color: "#00C853",
            borderRadius: "0.3rem",
            fontSize: "1rem",
            padding: "0.4rem 1rem",
            cursor: "pointer",
          }}
        >
          ▶️ Play
        </button>
      ) : (
        <button
          onClick={() => setIsPlaying(false)}
          style={{
            background: "none",
            border: "1px solid #FF4444",
            color: "#FF4444",
            borderRadius: "0.3rem",
            fontSize: "1rem",
            padding: "0.4rem 1rem",
            cursor: "pointer",
          }}
        >
          ⏹️ Stop
        </button>)
          
      )}
      <div>
        {J4count > 20 && (
          <button
            onClick={() => setKilledDoDMember(true)}
            style={{
              background: "linear-gradient(145deg, #FF4444 0%, #990000 100%)",
              border: "1px solid #FF4444",
              color: "#fff",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              padding: "0.6rem 1.2rem",
              cursor: "pointer",
              boxShadow: "0 0 12px rgba(255, 68, 68, 0.8), 0 0 24px rgba(255, 68, 68, 0.4)",
              animation: "pulse 1.5s infinite ease-in-out",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 24px rgba(255, 255, 255, 0.9), 0 0 48px rgba(255, 68, 68, 0.8)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 12px rgba(255, 68, 68, 0.8), 0 0 24px rgba(255, 68, 68, 0.4)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ✨ Kill DoD Members ✨
          </button>
        )}

        </div>

      </div>
    {isInView && (
      <>
        {renderRow(members.slice(0, oneThird), scrollValue)}
        {renderRow(members.slice(oneThird, twoThird), scrollValue, true)}
        {renderRow(members.slice(twoThird), scrollValue)}
      </>
    )}


    </div>
  );
};

export default Members;
