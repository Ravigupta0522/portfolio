import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import "./index.css";

const TICKER_ITEMS = [
  { emoji: "🚀", text: "Open to", highlight: "Freelance & Full-Time" },
  { emoji: "📱", text: "Specializing in", teal: "Flutter & React Native" },
  { emoji: "🌍", text: "Available", teal: "Worldwide & Remote" },
  { emoji: "⚡", text: "Currently building", highlight: "something awesome" },
  { emoji: "🤝", text: "Let's", teal: "collaborate" },
  { emoji: "📦", text: "1M+ happy users across all apps" },
];

function AnnouncementBar({ visible }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <motion.div
      className="announcement-bar"
      initial={false}
      animate={{
        y: visible ? 0 : -50,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 999,
        overflow: "hidden",
        background: "#0f0f15",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="ticker-wrap"
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "max-content",
          padding: "12px 0",
          animation: "tickerMove 25s linear infinite",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="ticker-item"
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "40px",
              fontSize: "14px",
              color: "#d1d5db",
            }}
          >
            <span
              className="dot"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FF6B6B",
                marginRight: "10px",
              }}
            />

            <span>{item.emoji}&nbsp;</span>

            <span>{item.text}&nbsp;</span>

            {item.highlight && (
              <span style={{ color: "#FF8E53", fontWeight: 600 }}>
                {item.highlight}
              </span>
            )}

            {item.teal && (
              <span style={{ color: "#2dd4bf", fontWeight: 600 }}>
                {item.teal}
              </span>
            )}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* =========================
   PREMIUM CURSOR
========================= */

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mouse = useRef({
    x: -100,
    y: -100,
  });

  const ring = useRef({
    x: -100,
    y: -100,
  });

  useEffect(() => {
    const moveCursor = (e) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY,
      };

      if (dotRef.current) {
        dotRef.current.style.transform = `
          translate(${e.clientX - 6}px, ${e.clientY - 6}px)
        `;
      }
    };

    let rafId;

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `
          translate(${ring.current.x - 19}px, ${ring.current.y - 19}px)
        `;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", moveCursor);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* DOT */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 99999,
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
          pointerEvents: "none",
          boxShadow: "0 0 15px rgba(255,107,107,0.8)",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />

      {/* RING */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 99998,
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,107,107,0.5)",
          background: "rgba(255,107,107,0.05)",
          pointerEvents: "none",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}

/* =========================
   MAIN APP
========================= */

export default function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  /* =========================
     LENIS SMOOTH SCROLL
  ========================= */

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ({ scroll }) => {
      setScrollY(scroll);
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  /* =========================
     SCROLL TO SECTION
  ========================= */

  const scrollTo = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setActive(id);
    setMenuOpen(false);
  };

  const barVisible = scrollY < 60;

  return (
    <div
      className="app-container"
      style={{
        background: "#0A0A0F",
        color: "#E5E7EB",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <Cursor />

      <AnnouncementBar visible={barVisible} />

      <Navbar
        active={active}
        scrollY={scrollY}
        barVisible={barVisible}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      <main
        style={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Hero scrollTo={scrollTo} />

        <About scrollTo={scrollTo} />

        <Skills />

        <Projects />

        <Experience />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}