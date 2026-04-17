import { motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeProvider'
import Hero from './components/Hero'
import ModelViewer from './components/ModelViewer'
import FlowSection from './components/FlowSection'
import CodeSection from './components/CodeSection'
import GithubSection from './components/GithubSection'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'
import ThemeToggle from './components/ThemeToggle'

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function App() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <div className="fixed right-4 top-4 z-[90] sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <motion.div initial="initial" animate="animate" variants={pageTransition}>
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-slate-900"
        >
          Skip to content
        </a>

        <Hero />
        <ModelViewer />
        <FlowSection />
        <CodeSection />
        <GithubSection />
        <Contact />
      </motion.div>
    </ThemeProvider>
  )
}
