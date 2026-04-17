import { AnimatePresence, motion } from 'framer-motion'

export default function InfoPanel({ open, onClose, data }) {
  return (
    <AnimatePresence>
      {open && data && (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="panel-title"
            className="glass-panel pointer-events-auto relative w-full max-w-md overflow-hidden rounded-3xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl"
              aria-hidden
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-xl border border-slate-200/90 bg-white/90 px-3 py-1 text-sm text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Close
            </button>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400/90">
              Component
            </p>
            <h2 id="panel-title" className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
              {data.title}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{data.description}</p>
            <div className="rounded-2xl border border-cyan-500/20 bg-slate-100/80 p-4 dark:bg-slate-950/50 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Role in system</p>
              <p className="mt-2 text-sm text-cyan-800 dark:text-cyan-100/90">{data.role}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
