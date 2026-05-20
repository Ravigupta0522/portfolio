import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { EXPERIENCE } from "../data/constants";

// ── Single timeline card ──────────────────────────────────────────────────────
function ExpCard({ e, i }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", gap: 24, marginBottom: 28 }}
    >
      {/* ── Dot ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <motion.div
          animate={
            hovered
              ? { scale: 1.3, boxShadow: `0 0 20px ${e.color}80` }
              : { scale: 1,  boxShadow: "none" }
          }
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          style={{
            width: 18, height: 18, borderRadius: "50%",
            background: e.color,
            border: `3px solid ${e.color}40`,
            zIndex: 1,
          }}
        />
      </div>

      {/* ── Card ── */}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          borderColor: hovered ? `${e.color}50` : "rgba(255,255,255,0.07)",
          boxShadow:   hovered ? `0 8px 32px ${e.color}18` : "none",
        }}
        transition={{ duration: 0.25 }}
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.025)",
          borderRadius: 14,
          border: "1px solid",
          padding: "20px 24px",
        }}
      >
        {/* Period badge */}
        <div style={{
          display: "inline-block",
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          color: e.color,
          letterSpacing: 1,
          marginBottom: 10,
        }}>
          {e.period}
        </div>

        {/* Role */}
        <h3 style={{
          fontSize: 17, fontWeight: 700,
          color: "white", margin: "0 0 4px",
        }}>
          {e.role}
        </h3>

        {/* Company */}
        <div style={{
          fontFamily: "monospace", fontSize: 13,
          color: "rgba(255,255,255,0.4)",
          marginBottom: 14,
        }}>
          {e.company}
        </div>

        {/* Bullet points */}
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
          {e.points.map((pt, idx) => (
            <li
              key={idx}
              style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                fontFamily: "'Courier New', monospace",
                fontSize: 12.5,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: e.color, marginTop: 2, flexShrink: 0 }}>▸</span>
              {pt}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <section id="experience" style={{ padding: "96px 5%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Heading */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: "#F7971E", letterSpacing: 2 }}>
              // work history
            </span>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 700, color: "white", marginTop: 10 }}>
              Experience 💼
            </h2>
          </div>
        </Reveal>

        {/* Timeline */}
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>

          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: 8, top: 0, bottom: 0,
              width: 2,
              background: "linear-gradient(to bottom, #FF6B6B, #4ECDC4, #A18CD1, #F7971E)",
              opacity: 0.35,
              originY: 0,
            }}
          />

          {/* Cards */}
          <div style={{ paddingLeft: 42 }}>
            {EXPERIENCE.map((e, i) => (
              <ExpCard key={e.role} e={e} i={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
