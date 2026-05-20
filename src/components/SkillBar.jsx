import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

export default function SkillBar({ skill, delay }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{ marginBottom: 22 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <motion.span
          animate={hovered ? { color: skill.color } : { color: "#e0e0e0" }}
          style={{ fontFamily: "'Courier New', monospace", fontSize: 14 }}
        >
          {skill.icon} {skill.name}
        </motion.span>
        <motion.span
          animate={hovered ? { scale: 1.15 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
          style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: skill.color }}
        >
          {skill.level}%
        </motion.span>
      </div>

      <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
        <motion.div
          initial={{ width: "0%" }}
          animate={inView ? { width: `${skill.level}%` } : { width: "0%" }}
          transition={{ duration: 1.4, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "100%", borderRadius: 3,
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
            boxShadow: `0 0 ${hovered ? 20 : 10}px ${skill.color}${hovered ? "99" : "55"}`,
            transition: "box-shadow 0.3s",
          }}
        />
      </div>
    </motion.div>
  );
}
