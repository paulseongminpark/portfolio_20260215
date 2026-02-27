import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

interface FadeInProps {
  children: React.ReactNode;
  id?: string;
  delay?: number;
  style?: React.CSSProperties;
}
export function FadeIn({ children, id, delay = 0, style }: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}
