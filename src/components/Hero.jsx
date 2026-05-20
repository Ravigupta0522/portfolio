import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";

export default function Hero({ scrollTo }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);

  // GSAP title stagger on mount
  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(chars,
      { y: 80, opacity: 0, rotationX: -90 },
      { y: 0, opacity: 1, rotationX: 0, stagger: 0.04, duration: 0.8, delay: 0.5, ease: "back.out(1.7)" }
    );
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { y: 40, opacity: 0, filter: "blur(8px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const name = "Ravishankar Gupta".split("");

  return (
    <section ref={containerRef} id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 5%", position: "relative", overflow: "hidden" }}>
      {/* Background Blobs — parallax */}
      <motion.div className="floating-blob" style={{ width: 500, height: 500, background: "#FF6B6B", top: "10%", left: "-10%", y }} />
      <motion.div className="floating-blob" style={{ width: 400, height: 400, background: "#4ECDC4", bottom: "5%", right: "-5%", y: useTransform(scrollYProgress, [0, 1], [0, -80]) }} />
      <motion.div className="floating-blob" style={{ width: 300, height: 300, background: "#A18CD1", top: "40%", right: "20%", y: useTransform(scrollYProgress, [0, 1], [0, 60]) }} />

      <motion.div
        style={{ maxWidth: 1100, margin: "0 auto", width: "100%", paddingTop: 120, opacity, scale }}
      >
        <motion.div
          className="hero-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left — Text */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            {/* Available badge */}
            <motion.div variants={itemVariants} style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <motion.div
                style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ECDC4" }}
                animate={{ boxShadow: ["0 0 0 0 rgba(78,205,196,0.6)", "0 0 0 10px rgba(78,205,196,0)", "0 0 0 0 rgba(78,205,196,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: "#4ECDC4", letterSpacing: 2 }}>Available for work</span>
            </motion.div>

            {/* Hi I'm */}
            <motion.div variants={itemVariants}>
              <h1 style={{ fontSize: "3.8rem", fontWeight: 800, lineHeight: 1.1, marginBottom: 12, textAlign: "center" }}>
                <span style={{ color: "white" }}>Hi, I'm</span><br />
                {/* GSAP char animation */}
                <span ref={titleRef} style={{ display: "inline-block", perspective: "600px" }}>
                  {name.map((char, i) => (
                    <span
                      key={i}
                      className="char"
                      style={{
                        display: "inline-block",
                        background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 30%, #FFC371 60%, #4ECDC4 100%)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        opacity: 0,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={itemVariants} style={{ fontFamily: "'Courier New', monospace", fontSize: 18, color: "rgba(255,255,255,0.5)", marginBottom: 24, textAlign: "center" }}>
              <span style={{ color: "#FF6B6B" }}>{">"}</span> Mobile Developer
              <motion.span
                style={{ marginLeft: 2, color: "#FF6B6B" }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >_</motion.span>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 460, marginBottom: 40, textAlign: "center" }}>
              Creating smooth, scalable, and visually stunning mobile apps using Flutter & React Native — turning ideas into powerful digital experiences. 🚀
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="hero-btns" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48, justifyContent: "center" }}>
              <motion.button
                className="glow-btn"
                onClick={() => scrollTo("projects")}
                style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E53)", color: "white", boxShadow: "0 8px 32px rgba(255,107,107,0.35)" }}
                whileHover={{ scale: 1.06, boxShadow: "0 16px 48px rgba(255,107,107,0.55)", y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                View Projects 🚀
              </motion.button>
              <motion.button
                className="glow-btn"
                onClick={() => scrollTo("contact")}
                style={{ background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
                whileHover={{ scale: 1.06, background: "rgba(78,205,196,0.1)", borderColor: "rgba(78,205,196,0.4)", color: "#4ECDC4", y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                Contact Me ✉️
              </motion.button>
            </motion.div>

          </div>

          {/* Right — Phone Mockup */}
          <motion.div
            className="phone-mock"
            style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
            variants={itemVariants}
          >
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative" }}
            >
              {/* Glow rings */}
              <motion.div
                style={{ position: "absolute", inset: -40, borderRadius: "50%", border: "1px solid rgba(255,107,107,0.15)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                style={{ position: "absolute", inset: -20, borderRadius: "50%", border: "1px solid rgba(78,205,196,0.1)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />

              {/* Phone */}
              <motion.div
                style={{
                  width: 200, height: 400,
                  background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                  borderRadius: 36, border: "2px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
                  display: "flex", flexDirection: "column", overflow: "hidden", position: "relative",
                }}
                whileHover={{ scale: 1.04, rotateY: 6, rotateX: -4, boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(255,107,107,0.15)" }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Notch */}
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 14, paddingBottom: 8 }}>
                  <div style={{ width: 60, height: 14, background: "#0A0A0F", borderRadius: 10 }} />
                </div>
                {/* App UI */}
                <div style={{ flex: 1, padding: "8px 14px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>9:41</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>●●●</span>
                  </div>
                  <div style={{ background: "linear-gradient(135deg, #FF6B6B22, #4ECDC422)", borderRadius: 12, padding: "10px 12px", marginBottom: 4 }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 2, fontFamily: "monospace" }}>Good morning 👋</div>
                    <div style={{ fontSize: 14, color: "white", fontWeight: 600 }}>Ravishankar Gupta</div>
                  </div>
                  {[
                    { color: "#FF6B6B", label: "Active Projects", val: "4" },
                    { color: "#4ECDC4", label: "Apps Live", val: "20+" },
                    { color: "#A18CD1", label: "Today's Commits", val: "12" },
                  ].map((c) => (
                    <div key={c.label} style={{ background: `${c.color}18`, border: `1px solid ${c.color}30`, borderRadius: 10, padding: "8px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>{c.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: c.color }}>{c.val}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-around", padding: "10px 0 4px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    {["🏠", "📱", "⚡", "👤"].map((e, i) => (
                      <span key={i} style={{ fontSize: i === 0 ? 18 : 14, opacity: i === 0 ? 1 : 0.4 }}>{e}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating Badges */}
              <motion.div
                style={{ position: "absolute", top: 20, right: -60, background: "linear-gradient(135deg, #FF6B6B, #FF8E53)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "white", fontWeight: 600, boxShadow: "0 8px 20px rgba(255,107,107,0.4)", whiteSpace: "nowrap" }}
                animate={{ x: [0, 6, 0], y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1 }}
              >
                Flutter 🐦
              </motion.div>
              <motion.div
                style={{ position: "absolute", bottom: 60, left: -70, background: "linear-gradient(135deg, #4ECDC4, #44A08D)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "white", fontWeight: 600, boxShadow: "0 8px 20px rgba(78,205,196,0.4)", whiteSpace: "nowrap" }}
                animate={{ x: [0, -6, 0], y: [0, 4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                React Native ⚛️
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
