import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import profileImg from "../assets/profile.jpg";



const SOCIALS = [
  { name: "GitHub", icon: "💻", color: "#FF6B6B", url: "https://github.com/" },
  { name: "LinkedIn", icon: "🔗", color: "#4ECDC4", url: "https://linkedin.com/in/" },
  { name: "Twitter", icon: "🐦", color: "#A18CD1", url: "https://twitter.com/" },
];

function SocialBtn({ name, icon, color, url }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1, textAlign: "center",
        padding: hovered ? "13px 8px" : "10px 8px",
        borderRadius: 14,
        background: hovered ? `${color}25` : `${color}12`,
        border: `1px solid ${hovered ? color + "80" : color + "30"}`,
        cursor: "pointer",
        fontFamily: "monospace", fontSize: 11, color,
        textDecoration: "none",
        display: "block",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 10px 24px ${color}30` : "none",
      }}
    >
      <div style={{ fontSize: hovered ? 20 : 16, transition: "font-size 0.3s", marginBottom: 4 }}>{icon}</div>
      {name}
    </a>
  );
}

export default function About({ scrollTo }) {
  const [photoHovered, setPhotoHovered] = useState(false);

  return (
    <section id="about" style={{ padding: "96px 5%", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: "#FF6B6B", letterSpacing: 2 }}>// about me</span>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 700, color: "white", marginTop: 10 }}>Who Am I? 👨‍💻</h2>
          </div>
        </Reveal>

        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60, alignItems: "start" }}>
          {/* Photo */}
          <Reveal dir="left">
            <div className="about-photo" style={{ position: "relative" }}>
              <motion.div
                onMouseEnter={() => setPhotoHovered(true)}
                onMouseLeave={() => setPhotoHovered(false)}
                animate={{
                  boxShadow: photoHovered ? "0 20px 60px rgba(255,107,107,0.4)" : "0 8px 24px rgba(0,0,0,0.3)",
                  scale: photoHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.4 }}
                style={{
                  borderRadius: 24,
                  padding: 3,
                  background: photoHovered
                    ? "linear-gradient(135deg, #FF6B6B, #4ECDC4)"
                    : "linear-gradient(135deg, #FF6B6B90, #4ECDC490)",
                  transition: "background 0.4s",
                }}
              >
                <div style={{ borderRadius: 22, overflow: "hidden", background: "#0a0a0f", position: "relative" }}>
                  <motion.img
                    src={profileImg}
                    alt="Ravishankar Gupta"
                    animate={{ scale: photoHovered ? 1.06 : 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "3/4",
                      objectFit: "cover",
                      objectPosition: "center top",
                      display: "block",
                    }}
                  />
                  {/* Gradient overlay */}
                  <motion.div
                    animate={{ opacity: photoHovered ? 0.3 : 0.6 }}
                    style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(180deg, transparent 50%, rgba(10,10,15,1) 100%)",
                    }}
                  />
                  {/* Name overlay on hover */}
                  <AnimatePresence>
                    {photoHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          position: "absolute", bottom: 0, left: 0, right: 0,
                          padding: "20px 16px",
                          background: "linear-gradient(to top, rgba(10,10,15,0.9), transparent)",
                        }}
                      >
                        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 15, fontWeight: 700, color: "white" }}>Ravishankar Gupta</div>
                        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#4ECDC4" }}>Mobile Developer</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Social Links */}
              <div style={{ display: "flex", gap: 10, marginTop: 32, justifyContent: "center" }}>
                {SOCIALS.map((s) => <SocialBtn key={s.name} {...s} />)}
              </div>
            </div>
          </Reveal>

          {/* Bio + Tech Stack */}
          <Reveal dir="right" delay={0.1}>
            <div>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 20 }}>
                I'm a passionate <span style={{ color: "#FF6B6B" }}>Mobile App Developer</span> specializing in <span style={{ color: "#4ECDC4" }}>Flutter and React Native</span>, focused on building modern, high-performance, and user-friendly applications. I enjoy creating smooth user experiences with clean UI designs, engaging animations, and seamless functionality.
              </p>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 20 }}>
                I have experience working with <span style={{ color: "#FFA000" }}>Firebase</span>, <span style={{ color: "#FF6B6B" }}>REST APIs</span>, and responsive mobile interfaces, always aiming to deliver <span style={{ color: "#4ECDC4" }}>scalable and visually appealing solutions</span>. I'm also passionate about exploring new technologies, improving my development skills, and turning creative ideas into real-world digital products.
              </p>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 36 }}>
                Beyond coding, I love learning about <span style={{ color: "#A18CD1" }}>modern app design trends</span>, contributing to innovative projects, and continuously enhancing my problem-solving abilities.
              </p>

              {/* Contact Info Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                {[
                  { icon: "✉️", label: "EMAIL", val: "ravigupta7275450@gmail.com", color: "#FF6B6B" },
                  { icon: "📍", label: "LOCATION", val: "Lucknow, India", color: "#4ECDC4" },
                  { icon: "📞", label: "PHONE", val: "+91 9305987672", color: "#A18CD1" },
                  { icon: "🐙", label: "GITHUB", val: "github.com/ravishankar", color: "#68A063" },
                ].map(({ icon, label, val, color }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -3, borderColor: color + "60", boxShadow: `0 8px 24px ${color}18` }}
                    transition={{ type: "spring", stiffness: 380, damping: 18 }}
                    style={{
                      background: "rgba(255,255,255,0.03)", borderRadius: 12,
                      padding: "14px 16px", border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
                      <span>{icon}</span> {label}
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.75)", wordBreak: "break-all" }}>{val}</div>
                  </motion.div>
                ))}
              </div>

              {/* Tech Stack */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 14, letterSpacing: 2 }}>// TECH STACK</div>
                <div>
                  {[
                    ["Flutter", "#54C5F8"], ["Dart", "#00B4AB"], ["React Native", "#61DAFB"],
                    ["Firebase", "#FFA000"], ["Node.js", "#68A063"], ["REST APIs", "#FF6B6B"],
                    ["Redux", "#764ABC"], ["Bloc", "#4ECDC4"], ["Riverpod", "#A18CD1"],
                    ["Figma", "#F24E1E"], ["Git", "#F05032"], ["CI/CD", "#FFD700"],
                  ].map(([tag, color]) => (
                    <span key={tag} className="skill-tag" style={{ color, borderColor: `${color}40`, background: `${color}12` }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 14, letterSpacing: 2 }}>// CERTIFICATIONS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { name: "Publish single Research Paper in the field of AI and ML Network. ", year: "2023", color: "#4ECDC4" },
                    { name: "Worked as a Designing Team member in NEC IIT Bombay.", year: "2024", color: "#54C5F8" },
                    { name: "Training in Data Engineering of 3 month by HCL TECH. ", year: "2024", color: "#FFA000" },
                    { name: "Summary Internship on Python with Data Science by SoftPro India Computer Technologies PVT.LTD. ", year: "2025", color: "#61DAFB" },
                  ].map(({ name, year, color }) => (
                    <motion.div
                      key={name}
                      whileHover={{ x: 6, borderColor: color + "50", background: `${color}10` }}
                      transition={{ type: "spring", stiffness: 380, damping: 20 }}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "rgba(255,255,255,0.03)", borderRadius: 10,
                        padding: "11px 16px", border: `1px solid ${color}25`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <motion.div
                          animate={{ boxShadow: [`0 0 4px ${color}`, `0 0 10px ${color}`, `0 0 4px ${color}`] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }}
                        />
                        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 12, color: "rgba(255,255,255,0.75)" }}>{name}</span>
                      </div>
                      <span style={{ fontFamily: "monospace", fontSize: 11, color, fontWeight: 700, flexShrink: 0, marginLeft: 12 }}>{year}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 16 }}>
                <motion.a
                  href="/Ravishankar gupta resume.pdf"
                  download="Ravishankar_Gupta_Resume.pdf"
                  className="glow-btn"
                  style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E53)", color: "white", fontSize: 12, textDecoration: "none", display: "inline-block" }}
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(255,107,107,0.5)", y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  Download CV 📄
                </motion.a>
                <motion.button
                  className="glow-btn"
                  onClick={() => scrollTo("projects")}
                  style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.15)", fontSize: 12 }}
                  whileHover={{ scale: 1.05, borderColor: "#4ECDC4", color: "#4ECDC4", y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  See Projects →
                </motion.button>
              </div>

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
