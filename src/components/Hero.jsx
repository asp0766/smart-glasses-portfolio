import { motion } from 'framer-motion'

const float = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
}

export default function Hero() {
  const scrollToModel = () => {
    document.getElementById('model')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden px-4 pb-24 pt-28 sm:px-8 md:px-12"
    >
      <div className="gradient-mesh pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-[0.4]">
        {[...Array(48)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-600/55 dark:bg-cyan-400/60"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.6, 1.2, 0.6],
            }}
            transition={{
              duration: 3 + (i % 5),
              repeat: Infinity,
              delay: i * 0.08,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-800 backdrop-blur-md dark:border-cyan-500/20 dark:bg-slate-950/50 dark:text-cyan-300/90"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          IoT · Computer Vision · Edge
        </motion.div>

        <motion.h1
          className="mb-6 max-w-4xl bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-4xl font-semibold leading-tight tracking-tight text-transparent dark:from-white dark:via-slate-100 dark:to-slate-400 sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          Smart IoT Glasses for Drowsiness Detection
        </motion.h1>

        <motion.p
          className="mb-10 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          A wearable edge system that watches for prolonged eye closure and triggers an audible alert
          before fatigue becomes dangerous — built for safer roads and focused work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <motion.button
            type="button"
            onClick={scrollToModel}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-10 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/25"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 transition group-hover:brightness-110" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Project
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-8 text-left sm:gap-12"
          variants={float}
          animate="animate"
        >
          {[
            { label: 'Latency', value: '< 100 ms' },
            { label: 'Alert window', value: '4–5 s' },
            { label: 'Platform', value: 'ESP32 + CV' },
          ].map((item) => (
            <div key={item.label} className="glass-panel rounded-2xl px-6 py-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">{item.label}</p>
              <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden
      >
        <div className="h-10 w-6 rounded-full border-2 border-slate-500/50 p-1">
          <motion.div
            className="mx-auto h-2 w-1 rounded-full bg-cyan-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
