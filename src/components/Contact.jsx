import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Reveal from "./Reveal";
import emailjs from "@emailjs/browser";

const CONTACT_INFO = [
  { icon: "✉️", label: "EMAIL", val: "ravigupta7275450@gmail.com", href: "mailto:ravigupta7275450@gmail.com", color: "#FF6B6B" },
  { icon: "📍", label: "LOCATION", val: "Lucknow, India", href: "https://maps.google.com/?q=Lucknow,India", color: "#4ECDC4" },
  { icon: "📞", label: "PHONE", val: "+91 9305987672", href: "tel:+919305987672", color: "#A18CD1" },
  { icon: "🐙", label: "GITHUB", val: "github.com/Ravigupta0522", href: "https://github.com/Ravigupta0522", color: "#68A063" },
  { icon: "🔗", label: "LINKEDIN", val: "linkedin.com/in/ravishankar", href: "https://www.linkedin.com/in/ravi-gupta-2066a5295", color: "#0A66C2" },
];

function InfoCard({ icon, label, val, href, color, index }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 6, boxShadow: `0 8px 28px ${color}25` }}
      style={{
        display: "flex", alignItems: "center", gap: 16,
        background: "rgba(255,255,255,0.03)",
        borderRadius: 14, padding: "16px 20px",
        border: `1px solid rgba(255,255,255,0.07)`,
        textDecoration: "none",
        transition: "background 0.3s, border-color 0.3s",
        cursor: "pointer",
      }}
      animate={{}}
      onHoverStart={e => {
        e.currentTarget.style.background = `${color}0d`;
        e.currentTarget.style.borderColor = `${color}50`;
      }}
      onHoverEnd={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
      }}
    >
      {/* Icon box */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 6 }}
        transition={{ type: "spring", stiffness: 350 }}
        style={{
          width: 42, height: 42, borderRadius: 11, flexShrink: 0,
          background: `${color}1a`, border: `1px solid ${color}35`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19,
        }}
      >
        {icon}
      </motion.div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
          {label}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,0.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {val}
        </div>
      </div>
      {/* Arrow indicator */}
      <div style={{ fontSize: 14, color: `${color}80`, flexShrink: 0 }}>→</div>
    </motion.a>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    setError("");
    if (!formData.name || !formData.email || !formData.msg) {
      setError("Please fill in Name, Email, and Message.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.msg,
        createdAt: serverTimestamp(),
      });

      // Send email notification (non-blocking — won't break submit if it fails)
      try {
        await emailjs.send(
          "service_mfu786g",
          "__ejs-test-mail-service__",
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.msg,
          },
          "yp--FjdPUGl7HaT5L"
        );
      } catch (emailErr) {
        console.warn("EmailJS error (non-critical):", emailErr);
      }

      setSent(true);
      setFormData({ name: "", email: "", subject: "", msg: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error("Send error:", err);
      setError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (id, color = "#FF6B6B") => ({
    className: "contact-input",
    value: formData[id],
    onChange: (e) => setFormData((p) => ({ ...p, [id]: e.target.value })),
    onFocus: () => setFocused(id),
    onBlur: () => setFocused(null),
    style: {
      borderColor: focused === id ? color : undefined,
      boxShadow: focused === id ? `0 0 0 3px ${color}18, 0 0 20px ${color}18` : undefined,
    },
  });

  return (
    <section id="contact" style={{ padding: "96px 5%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Heading */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: "#FF6B6B", letterSpacing: 2 }}>// contact.send()</span>
            <h2 style={{ fontSize: "2.6rem", fontWeight: 800, color: "white", marginTop: 10 }}>
              Let's Build Together 🤝
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, marginTop: 12 }}>
              Have a project in mind or just want to connect? I’m always open to new opportunities and conversations.
            </p>
          </div>
        </Reveal>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 32, alignItems: "start" }}>

          {/* ── Left: Contact Info ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {CONTACT_INFO.map((c, i) => <InfoCard key={c.label} {...c} index={i} />)}

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: "0 12px 36px rgba(78,205,196,0.2)" }}
              style={{
                background: "rgba(78,205,196,0.06)",
                border: "1px solid rgba(78,205,196,0.25)",
                borderRadius: 14, padding: "18px 20px",
                marginTop: 4,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <motion.div
                  animate={{ boxShadow: ["0 0 4px #4ECDC4", "0 0 14px #4ECDC4", "0 0 4px #4ECDC4"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 9, height: 9, borderRadius: "50%", background: "#4ECDC4" }}
                />
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: 12, color: "#4ECDC4", fontWeight: 700, letterSpacing: 1 }}>
                  Currently Available
                </span>
              </div>
              <p style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>
                Available for freelance projects, full-time opportunities, and meaningful collaborations.
              </p>
            </motion.div>
          </div>

          {/* ── Right: Form ── */}
          <Reveal dir="right" delay={0.15}>
            <motion.div
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: 22, padding: "36px 40px",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>
                <span style={{ color: "rgba(255,255,255,0.25)" }}>// </span>send_message()
              </div>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    style={{ textAlign: "center", padding: "40px 0" }}
                  >
                    <motion.div
                      animate={{ rotate: [0, -12, 12, -8, 8, 0], scale: [1, 1.25, 1] }}
                      transition={{ duration: 0.6 }}
                      style={{ fontSize: 64, marginBottom: 16 }}
                    >🎉</motion.div>
                    <h3 style={{ fontFamily: "'Courier New', monospace", fontSize: 22, color: "#4ECDC4" }}>Message Sent!</h3>
                    <p style={{ color: "rgba(255,255,255,0.45)", marginTop: 8 }}>Jaldi hi reply karunga! 🚀</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {/* Name + Email */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#FF6B6B", display: "block", marginBottom: 8, letterSpacing: 2 }}>NAME *</label>
                        <input {...inputStyle("name", "#FF6B6B")} className="contact-input" placeholder="Your Name" style={{ ...inputStyle("name", "#FF6B6B").style }} />
                      </div>
                      <div>
                        <label style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#4ECDC4", display: "block", marginBottom: 8, letterSpacing: 2 }}>EMAIL *</label>
                        <input {...inputStyle("email", "#4ECDC4")} className="contact-input" type="email" placeholder="email@domain.com" style={{ ...inputStyle("email", "#4ECDC4").style }} />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 8, letterSpacing: 2 }}>SUBJECT</label>
                      <input {...inputStyle("subject", "#A18CD1")} className="contact-input" placeholder="Project Discussion / Job Opportunity / Collaboration" style={{ ...inputStyle("subject", "#A18CD1").style }} />
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#FF6B6B", display: "block", marginBottom: 8, letterSpacing: 2 }}>MESSAGE *</label>
                      <textarea {...inputStyle("msg", "#FF6B6B")} className="contact-input" rows={5} placeholder="Share your project, ideas, or any details you'd like to discuss..." style={{ resize: "none", ...inputStyle("msg", "#FF6B6B").style }} />
                    </div>

                    {/* Error message */}
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ color: "#FF6B6B", fontFamily: "'Courier New', monospace", fontSize: 12, textAlign: "center", margin: 0 }}
                      >
                        ⚠️ {error}
                      </motion.p>
                    )}

                    {/* Send button */}
                    <motion.button
                      onClick={handleSend}
                      disabled={loading}
                      whileHover={!loading ? { scale: 1.04, boxShadow: "0 16px 48px rgba(255,107,107,0.5)", y: -3 } : {}}
                      whileTap={!loading ? { scale: 0.97 } : {}}
                      transition={{ type: "spring", stiffness: 380, damping: 15 }}
                      style={{
                        padding: "15px 0", borderRadius: 50, border: "none",
                        cursor: loading ? "not-allowed" : "pointer",
                        background: loading
                          ? "rgba(255,107,107,0.4)"
                          : "linear-gradient(135deg, #FF6B6B, #FF8E53)",
                        color: "white", fontFamily: "'Courier New', monospace",
                        fontSize: 13, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700,
                        boxShadow: loading ? "none" : "0 8px 32px rgba(255,107,107,0.3)",
                        opacity: loading ? 0.7 : 1,
                        transition: "background 0.3s, opacity 0.3s",
                      }}
                    >
                      {loading ? "SENDING... ⏳" : "SEND MESSAGE ⚡"}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
