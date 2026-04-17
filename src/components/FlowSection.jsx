import { motion } from 'framer-motion'

const steps = [
  {
    icon: '📷',
    title: 'Camera captures face',
    body: 'Frames are acquired at a steady rate and cropped to the face region for stable tracking.',
  },
  {
    icon: '👁️',
    title: 'Eye detection (CV)',
    body: 'OpenCV / MediaPipe landmarks locate eyes; aspect ratio or EAR estimates openness vs closure.',
  },
  {
    icon: '⏱️',
    title: 'Closure timing (4–5 s)',
    body: 'A timer accumulates only while eyes stay closed; crossing the threshold arms the alert.',
  },
  {
    icon: '🔊',
    title: 'Speaker alert',
    body: 'ESP32 drives a buzzer or speaker with a clear tone — interrupting drowsiness before risk spikes.',
  },
]

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function FlowSection() {
  return (
    <section id="flow" className="scroll-mt-20 px-4 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            End-to-end workflow
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
            From pixels to protection — a tight loop that runs on the glasses hardware with minimal latency.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="relative">
            <div className="absolute left-[1.35rem] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-cyan-500/70 via-violet-500/50 to-transparent dark:from-cyan-500/50 dark:via-violet-500/40 lg:block" />
            <ol className="space-y-6">
              {steps.map((s, i) => (
                <motion.li
                  key={s.title}
                  className="glass-panel relative flex gap-5 rounded-2xl p-5 pl-4 sm:pl-5"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 to-violet-600/25 text-2xl ring-1 ring-slate-200/80 dark:from-cyan-500/20 dark:to-violet-600/20 dark:ring-white/10">
                    <span aria-hidden>{s.icon}</span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-cyan-500/90 dark:text-cyan-400/90">
                      Step {i + 1}
                    </p>
                    <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          <motion.div
            className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="mb-6 text-center text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
              Signal flow
            </p>
            <div className="relative mx-auto flex max-w-md flex-col items-center gap-4">
              {['Sensor', 'Vision', 'Timer', 'Alert'].map((label, i) => (
                <div key={label} className="flex w-full flex-col items-center">
                  <motion.div
                    className="w-full rounded-2xl border border-cyan-500/35 bg-white/85 px-4 py-3 text-center text-sm font-medium text-slate-800 shadow-sm dark:border-cyan-500/25 dark:bg-slate-950/50 dark:text-cyan-100 dark:shadow-none"
                    whileHover={{ scale: 1.02 }}
                  >
                    {label}
                  </motion.div>
                  {i < 3 && (
                    <motion.svg
                      width="40"
                      height="36"
                      viewBox="0 0 40 36"
                      className="text-cyan-600/85 dark:text-cyan-400/80"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <motion.path
                        d="M20 4 L20 28"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        variants={lineVariants}
                        custom={i}
                      />
                      <motion.path
                        d="M14 22 L20 30 L26 22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        variants={lineVariants}
                        custom={i}
                      />
                    </motion.svg>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
