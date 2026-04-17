import { motion } from 'framer-motion'

const contact = {
  name: 'Anurag Parmar',
  email: 'asp07660766@gmail.com',
  linkedin: 'https://www.linkedin.com/in/asp0766',
  portfolio: 'https://asp0766.netlify.app/',
}

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-4 pb-28 pt-12 sm:px-8 md:px-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Let’s talk
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Reach out for collaborations, internships, or full-time roles in IoT, embedded systems, and web
            engineering.
          </p>
        </motion.div>

        <motion.div
          className="glass-panel rounded-[2rem] p-8 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.18)] dark:shadow-none sm:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/35 to-violet-600/35 text-xl font-semibold text-white shadow-inner ring-1 ring-white/15">
              {contact.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{contact.name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Smart glasses · IoT · Computer vision · Full-stack
              </p>
            </div>
          </div>

          <dl className="space-y-4">
            <div className="flex flex-col gap-1 rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-slate-950/40">
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</dt>
              <dd>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-cyan-700 transition hover:underline dark:text-cyan-400"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-slate-950/40">
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">LinkedIn</dt>
              <dd>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-cyan-700 transition hover:underline dark:text-cyan-400"
                >
                  {contact.linkedin}
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-slate-950/40">
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Portfolio</dt>
              <dd>
                <a
                  href={contact.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-cyan-700 transition hover:underline dark:text-cyan-400"
                >
                  {contact.portfolio}
                </a>
              </dd>
            </div>
          </dl>
        </motion.div>

        <p className="mt-10 text-center text-xs text-slate-500 dark:text-slate-600">
          © {new Date().getFullYear()} {contact.name}. Built with React, Vite, Tailwind, R3F & Framer Motion.
        </p>
      </div>
    </section>
  )
}
