import { useInView } from "../hooks/useInView";
import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, dir = "up" }) {
  const [ref, inView] = useInView();

  const variants = {
    hidden: {
      opacity: 0,
      y: dir === "up" ? 50 : 0,
      x: dir === "left" ? -50 : dir === "right" ? 50 : 0,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1, y: 0, x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
