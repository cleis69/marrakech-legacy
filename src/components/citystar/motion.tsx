import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 55 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function Fact({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  return <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}><strong>{value}<sup>{suffix}</sup></strong><span>{label}</span></motion.div>;
}

export function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] }); const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const reduce = useReducedMotion();
  return <div className="parallax-wrap" ref={ref}><motion.img style={reduce ? {} : { y }} src={src} alt={alt} loading="lazy" /></div>;
}
