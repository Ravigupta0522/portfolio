import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { PROJECTS } from "../data/constants";

/* ── Tilt Card Hook ── */
function useTilt() {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };
  return { ref, handleMouseMove, handleMouseLeave };
}

/* ── Project Detail Modal ── */
function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
          }}
        >
          <motion.div
            key="modal"
            initial={{ y: 60, opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(145deg, #141420, #1a1a2e)",
              borderRadius: 28, padding: "40px",
              maxWidth: 560, width: "100%",
              border: `1px solid ${project.color1}40`,
              boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 80px ${project.color1}20`,
              position: "relative",
            }}
          >
            {/* Gradient top bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: 4, background: `linear-gradient(90deg, ${project.color1}, ${project.color2})`, borderRadius: 4, marginBottom: 28, originX: 0 }}
            />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.15, background: "rgba(255,107,107,0.2)", color: "#FF6B6B" }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: "absolute", top: 20, right: 20,
                background: "rgba(255,255,255,0.06)", border: "none",
                color: "rgba(255,255,255,0.5)", width: 36, height: 36,
                borderRadius: "50%", cursor: "pointer", fontSize: 18,
                transition: "all 0.2s",
              }}
            >✕</motion.button>

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1, stiffness: 300 }} style={{ fontSize: 56, marginBottom: 12, display: "inline-block" }}>
              {project.emoji}
            </motion.div>

            <motion.h2
              initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}
              style={{ fontFamily: "'Courier New', monospace", fontSize: 26, fontWeight: 700, color: "white", marginBottom: 8 }}
            >
              {project.title}
            </motion.h2>

            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ fontFamily: "monospace", fontSize: 11, color: project.color1, background: `${project.color1}18`, padding: "4px 14px", borderRadius: 8, display: "inline-block", marginBottom: 24 }}
            >
              {project.tag}
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 28 }}
            >
              {project.desc}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}
            >
              {project.stats.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3 + i * 0.08 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  style={{ background: `${project.color1}15`, border: `1px solid ${project.color1}30`, borderRadius: 12, padding: "10px 18px", fontFamily: "monospace", fontSize: 12, color: project.color1, fontWeight: 600 }}
                >
                  {s}
                </motion.div>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ display: "flex", gap: 12 }}>
              {/* Live Demo Button */}
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: `0 14px 36px ${project.color1}50`, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 15 }}
                style={{
                  flex: 1, padding: "13px 0", borderRadius: 50, border: "none", cursor: "pointer",
                  background: `linear-gradient(135deg, ${project.color1}, ${project.color2})`,
                  color: "white", fontFamily: "'Courier New', monospace", fontSize: 12,
                  letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700,
                  textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}
              >
                🌐 View Live ↗
              </motion.a>

              {/* GitHub Button */}
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, borderColor: project.color1, color: project.color1, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 15 }}
                style={{
                  flex: 1, padding: "13px 0", borderRadius: 50, cursor: "pointer",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.7)", fontFamily: "'Courier New', monospace", fontSize: 12,
                  letterSpacing: 1.5, textTransform: "uppercase",
                  textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}
              >
                💻 GitHub
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Tilt Project Card ── */
function ProjectCard({ p, onClick, index }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { handleMouseLeave(); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
        onClick={onClick}
        style={{
          background: hovered ? `linear-gradient(145deg, ${p.color1}14, ${p.color2}14)` : "rgba(255,255,255,0.03)",
          borderRadius: 20, overflow: "hidden",
          border: `1px solid ${hovered ? p.color1 + "55" : "rgba(255,255,255,0.06)"}`,
          boxShadow: hovered ? `0 24px 64px rgba(0,0,0,0.4), 0 0 50px ${p.color1}22` : "0 8px 32px rgba(0,0,0,0.3)",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Header */}
        <div style={{ padding: "28px 28px 20px", background: `linear-gradient(135deg, ${p.color1}22, ${p.color2}22)`, borderBottom: `1px solid ${p.color1}20`, position: "relative", overflow: "hidden" }}>
          {/* Shimmer on hover */}
          {hovered && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{ position: "absolute", top: 0, bottom: 0, width: "50%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)", pointerEvents: "none" }}
            />
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div>
              <motion.span
                style={{ fontSize: 40, display: "inline-block", marginBottom: 10 }}
                animate={hovered ? { scale: 1.2, rotate: -8, y: -4 } : { scale: 1, rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {p.emoji}
              </motion.span>
              <h3 style={{ fontFamily: "'Courier New', monospace", fontSize: 20, fontWeight: 700, color: "white", marginBottom: 4 }}>{p.title}</h3>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: p.color1, background: `${p.color1}18`, padding: "3px 10px", borderRadius: 8 }}>{p.tag}</span>
            </div>
            <motion.div
              style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${p.color1}, ${p.color2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}
              animate={hovered ? { rotate: 45, scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >↗</motion.div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 28px 24px" }}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {p.stats.map((s) => (
              <span key={s} style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: 10 }}>{s}</span>
            ))}
          </div>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.3, x: hovered ? 4 : 0 }}
            style={{ marginTop: 16, fontFamily: "monospace", fontSize: 10, color: hovered ? p.color1 : "rgba(255,255,255,0.25)", letterSpacing: 1.5, textTransform: "uppercase", transition: "color 0.3s" }}
          >
            ✦ Click to explore →
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
      <section id="projects" style={{ padding: "96px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: "#A18CD1", letterSpacing: 2 }}>// featured work</span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 700, color: "white", marginTop: 10 }}>Projects 🚀</h2>

            </div>
          </Reveal>
          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} p={p} index={i} onClick={() => setSelected(p)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
