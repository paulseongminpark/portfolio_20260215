import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Stat { value: string; label: string; }
interface StatsBarProps { stats: Stat[]; dark?: boolean; }

export function StatsBar({ stats, dark }: StatsBarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={`p12-stats-bar${dark ? " p12-stats-dark" : ""}`} style={dark ? { borderColor: "rgba(255,255,255,0.1)" } : {}}>
      {stats.map((s, i) => (
        <motion.div
          key={i}
          className="p12-stat"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          style={dark ? { borderColor: "rgba(255,255,255,0.1)" } : {}}
        >
          <div className="p12-stat-number">{s.value}</div>
          <div className="p12-stat-label">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
