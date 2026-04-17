import { motion } from 'framer-motion'

const GITHUB_URL = 'https://github.com/asp0766/smart-glasses-portfolio'

const features = [
  'ESP32 firmware for GPIO, I²S audio, and UART camera bridge',
  'Python/OpenCV pipeline with configurable EAR and dwell time',
  'Audible alert path with safe volume ramp',
  'Low-latency loop suitable for driving / lab demos',
]

const install = [
  'Clone the repo and open `firmware/` in PlatformIO or Arduino IDE',
  'Create a Python 3.10+ venv; `pip install -r requirements.txt`',
  'Flash the ESP32; connect the camera module per `docs/wiring.md`',
  'Run `python scripts/detect.py` and verify serial logs for alerts',
]

export default function GithubSection() {
  return (
    <section id="github" className="scroll-mt-20 px-4 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Source & documentation
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
            Point the button to your real repository before interviews — structure below mirrors a typical
            README.
          </p>
        </motion.div>

        <motion.div
          className="glass-panel rounded-[2rem] p-8 sm:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-500">Project overview</p>
              <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-400">
                Wearable IoT prototype: camera-in, CV-based eye closure tracking, timed alert through a
                speaker when fatigue exceeds a safe window.
              </p>
            </div>
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </motion.a>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Features</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                {features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-1 text-cyan-500">▹</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Installation</h3>
              <ol className="list-decimal space-y-3 pl-5 text-sm text-slate-600 dark:text-slate-400">
                {install.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
