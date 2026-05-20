import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import SkillBar from "./SkillBar";
import { SKILLS, SKILL_CATEGORIES } from "../data/constants";

const FILTERS = ["ALL", "MOBILE", "BACKEND", "DESIGN", "DEVOPS"];

function FilterTab({ label, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      style={{
        padding: "8px 22px",
        borderRadius: 50,
        border: "none",
        cursor: "pointer",
        fontFamily: "'Courier New', monospace",
        fontSize: 12,
        letterSpacing: 1.5,
        fontWeight: 700,
        transition: "all 0.25s",
        background: active
          ? "linear-gradient(135deg, #FF6B6B, #FF8E53)"
          : "rgba(255,255,255,0.06)",
        color: active ? "white" : "rgba(255,255,255,0.45)",
        boxShadow: active ? "0 6px 24px rgba(255,107,107,0.35)" : "none",
      }}
    >
      {label}
    </motion.button>
  );
}

function CategoryCard({ cat, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, boxShadow: `0 20px 48px ${cat.color}22` }}
      style={{
        background: hovered ? `linear-gradient(135deg, ${cat.color}10, rgba(255,255,255,0.02))` : "rgba(255,255,255,0.02)",
        borderRadius: 16, padding: "20px 24px",
        border: `1px solid ${hovered ? cat.color + "35" : "rgba(255,255,255,0.07)"}`,
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <motion.span
          animate={hovered ? { rotate: 12, scale: 1.2 } : { rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ fontSize: 16, display: "inline-block" }}
        >
          {cat.icon}
        </motion.span>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 700, color: cat.color }}>
          {cat.title}
        </span>
      </div>

      {/* Skill Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {cat.items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 + i * 0.05 }}
            whileHover={{ scale: 1.1, background: `${cat.color}22`, color: cat.color, borderColor: `${cat.color}55` }}
            style={{
              fontFamily: "monospace", fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.05)",
              padding: "4px 11px", borderRadius: 8,
              border: "1px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredSkills = activeFilter === "ALL"
    ? SKILLS
    : SKILLS.filter(s => s.category === activeFilter.toLowerCase());

  const filteredCategories = activeFilter === "ALL"
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(c => c.category === activeFilter.toLowerCase());

  return (
    <section id="skills" style={{ padding: "96px 5%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Heading */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: "#4ECDC4", letterSpacing: 2 }}>// skills & tools</span>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 700, color: "white", marginTop: 10 }}>My Skillset ⚡</h2>
          </div>
        </Reveal>

        {/* Filter Tabs */}
        <Reveal delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 52 }}>
            {FILTERS.map((f) => (
              <FilterTab key={f} label={f} active={activeFilter === f} onClick={() => setActiveFilter(f)} />
            ))}
          </div>
        </Reveal>

        {/* Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>

          {/* Left — Proficiency Bars */}
          <Reveal dir="left">
            <motion.div
              layout
              style={{
                background: "rgba(255,255,255,0.02)",
                borderRadius: 20, padding: "32px 36px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#FF6B6B", marginBottom: 28, letterSpacing: 2 }}>
                // proficiency
              </div>
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((s, i) => (
                  <motion.div
                    key={s.name}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                  >
                    <SkillBar skill={s} delay={i * 0.08} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </Reveal>

          {/* Right — Category Cards */}
          <Reveal dir="right" delay={0.1}>
            <AnimatePresence mode="popLayout">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {(filteredCategories.length > 0 ? filteredCategories : SKILL_CATEGORIES).map((cat, i) => (
                  <CategoryCard key={cat.title} cat={cat} index={i} />
                ))}
              </div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
