import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV } from "../data/constants";
import profileImg from "../assets/profile.jpg";

export default function Navbar({ active, scrollY, barVisible, menuOpen, setMenuOpen, scrollTo }) {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{
        position: "fixed",
        top: barVisible ? 36 : 0,
        left: 0, right: 0,
        zIndex: 999,
        background: scrollY > 50 ? "rgba(10,10,15,0.92)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(24px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrollY > 50 ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "top 0.35s ease, background 0.3s",
        padding: "0 5%",
      }}
    >
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 64,
      }}>

        {/* Logo */}
        <motion.div
          onClick={() => scrollTo("home")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, zIndex: 1002 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            style={{
              width: 40, height: 40, borderRadius: "50%", padding: 2,
              background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
              boxShadow: "0 0 14px rgba(255,107,107,0.5)",
              flexShrink: 0,
            }}
            whileHover={{ boxShadow: "0 0 28px rgba(78,205,196,0.7)", rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <img
              src={profileImg}
              alt="Profile"
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", objectPosition: "center top" }}
            />
          </motion.div>
          <motion.span
            className="desktop-nav"
            style={{
              fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 600,
              background: "linear-gradient(90deg, #FF6B6B, #4ECDC4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: 1,
            }}
          >
            &lt;Dev/&gt;
          </motion.span>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="desktop-nav" style={{ display: "flex", gap: 6 }}>
          {NAV.map((n) => (
            <motion.span
              key={n}
              className={`nav-item${active === n ? " active" : ""}`}
              onClick={() => scrollTo(n)}
              onHoverStart={() => setHovered(n)}
              onHoverEnd={() => setHovered(null)}
              style={{ padding: "8px 14px", borderRadius: 8, position: "relative" }}
              whileHover={{ color: "#ff6b6b" }}
              whileTap={{ scale: 0.92 }}
            >
              {hovered === n && (
                <motion.span
                  layoutId="nav-pill"
                  style={{
                    position: "absolute", inset: 0, borderRadius: 8,
                    background: "rgba(255,107,107,0.08)",
                    border: "1px solid rgba(255,107,107,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {n}
            </motion.span>
          ))}
        </div>

        {/* Hire Me — desktop only */}
        <motion.a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
          className="glow-btn desktop-nav"
          style={{
            background: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
            color: "white", fontSize: 12, padding: "10px 24px",
            textDecoration: "none", display: "inline-block",
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(255,107,107,0.45)" }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Hire Me
        </motion.a>

        {/* Hamburger — always visible on mobile */}
        <motion.div
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            cursor: "pointer",
            display: "none",          /* CSS overrides to flex on mobile */
            flexDirection: "column",
            gap: 5, zIndex: 1002, padding: 8,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{ width: 24, height: 2.5, background: "#FF6B6B", borderRadius: 2, originX: 0.5 }}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45, y: 7.5 }
                  : i === 1 ? { opacity: 0, scaleX: 0 }
                  : { rotate: -45, y: -7.5 }
                  : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              overflow: "hidden",
              background: "rgba(10,10,15,0.97)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ padding: "16px 5% 24px" }}>
              {NAV.map((n, i) => (
                <motion.div
                  key={n}
                  className="nav-item"
                  onClick={() => { scrollTo(n); setMenuOpen(false); }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 8, color: "#FF6B6B" }}
                  style={{
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    color: active === n ? "#FF6B6B" : "rgba(255,255,255,0.7)",
                    fontSize: 14, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 10,
                  }}
                >
                  <span style={{ color: "#FF6B6B", fontFamily: "monospace" }}>→</span> {n}
                </motion.div>
              ))}

              {/* Mobile Hire Me button */}
              <motion.button
                onClick={() => { scrollTo("contact"); setMenuOpen(false); }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV.length * 0.07 + 0.05 }}
                style={{
                  marginTop: 20, width: "100%",
                  background: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
                  color: "white", border: "none", borderRadius: 50,
                  padding: "13px 0",
                  fontFamily: "'Courier New', monospace",
                  fontSize: 13, letterSpacing: 1.5, fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(255,107,107,0.35)",
                }}
              >
                Hire Me ✨
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
