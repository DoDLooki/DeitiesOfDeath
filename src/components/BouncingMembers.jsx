import { motion } from "framer-motion";
import membersData from "../data.json";
import FlipDiv from "./FlipDiv";
import { useEffect, useRef } from "react";

const BouncingMembers = () => {
  const members = membersData.members;
  const alarmRef = useRef(null);

  useEffect(() => {
    alarmRef.current = new Audio('/DeitiesOfDeath/assets/alarm.mp3');
    alarmRef.current.loop = true;
    alarmRef.current.volume = 0.4; // optional: set volume

    // Start alarm when component mounts
    alarmRef.current.play().catch((e) => console.warn("Autoplay blocked:", e));

    return () => {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    };
  }, []);


    const BouncingRow = ({ list }) => {
      const containerRef = useRef(null);
      const itemRefs = useRef([]);
      const velocities = useRef([]);

      useEffect(() => {
      itemRefs.current = itemRefs.current.slice(0, list.length);
      velocities.current = list.map(() => ({
        x: (Math.random() * 5 + 0.5) * (Math.random() < 0.5 ? -1 : 1),
        y: (Math.random() * 5 + 0.5) * (Math.random() < 0.5 ? -1 : 1),
      }));

      const positions = list.map(() => ({ x: 0, y: 0 }));

      const animate = () => {
        itemRefs.current.forEach((el, i) => {
          if (!el) return;

          const rect = el.getBoundingClientRect();
          const vel = velocities.current[i];
          const pos = positions[i];

          // Bounce check + nudge to prevent sticking
          if (rect.left <= 0) {
            vel.x = Math.abs(vel.x);
            pos.x += 1;
          } else if (rect.right >= window.innerWidth) {
            vel.x = -Math.abs(vel.x);
            pos.x -= 1;
          }

          if (rect.top <= 0) {
            vel.y = Math.abs(vel.y);
            pos.y += 1;
          } else if (rect.bottom >= window.innerHeight) {
            vel.y = -Math.abs(vel.y);
            pos.y -= 1;
          }

          // Update position
          pos.x += vel.x;
          pos.y += vel.y;

          el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        });

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, [list]);



  return (
    <div ref={containerRef} style={{ position: "relative", height: 0 }}>
      {list.map(({ name, year }, i) => (
        <div
          key={`${name}-${year}-${i}`}
          ref={(el) => (itemRefs.current[i] = el)}
          data-tx="0"
          data-ty="0"
          style={{
            position: "fixed",
            left: `${Math.random() * 90}vw`,
            top: `${Math.random() * 30 + 60}vh`, // randomly between 60% and 90% of screen height
            transition: "transform 0.1s linear",
            willChange: "transform",
            pointerEvents: "none",
          }}
        >
          <FlipDiv text={name} under={year} />
        </div>
      ))}

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
    style={{
      backgroundColor: "#101010",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      padding: "2rem",
    }}
  >
    <div className="red-flash-overlay" />

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
                src={`/DeitiesOfDeath/assets/${name}.png`}
                alt={name}
                style={{
                  width: "7vw",
                  height: "7vw",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "0.15vw solid #FF4444",
                }}
              />
              <p style={{ marginTop: "0.8vw", fontSize: "clamp(1rem, 1.5vw, 1.4rem)" }}>{name}</p>
              <div
                style={{
                  width: "4vw",
                  height: "0.15vw",
                  backgroundColor: "#FF4444",
                  margin: "0.3vw 0",
                }}
              ></div>
              <p style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", color: "#FF4444" }}>{title}</p>
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
                src={`/DeitiesOfDeath/assets/${name}.png`}
                alt={name}
                style={{
                  width: "7vw",
                  height: "7vw",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "0.15vw solid #FF4444",
                }}
              />
              <p style={{ marginTop: "0.8vw", fontSize: "clamp(1rem, 1.5vw, 1.4rem)" }}>{name}</p>
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
              fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
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
        maxWidth: "900px",
        margin: "0 auto 2rem",
        textAlign: "center",
        fontFamily: "Cormorant Garamond, serif",
      }}
    >
      Discover the full list of{' '}
      <strong style={{ color: "#FF4444", fontWeight: "bold" }}>Deities of Death</strong>{' '}
      members <br /> from <strong style={{ color: "#FF4444" }}>2005</strong> to{' '}
      <strong style={{ color: "#FF4444" }}>today</strong>.
    </motion.p>

    <BouncingRow list={members} />
  </div>
);

};

export default BouncingMembers;
