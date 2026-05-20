import { useState } from "react";

const LINKS = [
  { label: "GitHub", color: "#FF6B6B", url: "#" },
  { label: "LinkedIn", color: "#4ECDC4", url: "#" },
  { label: "Twitter", color: "#A18CD1", url: "#" },
];

function FooterLink({ label, color, url }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "monospace", fontSize: 12,
        color: hovered ? color : "rgba(255,255,255,0.3)",
        textDecoration: "none",
        transition: "all 0.25s",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        display: "inline-block",
      }}
    >
      {label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ padding: "36px 5%", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div
        className="footer-inner"
        style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}
      >
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 14 }}>
          <span style={{ color: "#FF6B6B" }}>&lt;</span>
          <span style={{ background: "linear-gradient(90deg, #FF6B6B, #4ECDC4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Ravishankar Gupta
          </span>
          <span style={{ color: "#4ECDC4" }}>/&gt;</span>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {LINKS.map((l) => <FooterLink key={l.label} {...l} />)}
        </div>

        <div style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
          Made with ❤️ & ☕ · {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
