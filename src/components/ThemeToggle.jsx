import { motion } from 'framer-motion'
import { useTheme } from '../context/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className="glass-panel relative z-50 flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700 transition-colors hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-300"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <span className="text-lg">{isLight ? '🌙' : '☀️'}</span>
    </motion.button>
  )
}
