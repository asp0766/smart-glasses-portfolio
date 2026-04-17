import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 })

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-1 origin-left bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
