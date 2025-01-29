import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu } from "lucide-react"
import { Button } from "../components/ui/button"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Testimonials from "../components/Testimonials"
import Pricing from "../components/Pricing"
import Footer from "../components/Footer"
import ParticleBackground from "../components/ParticleBackground"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 overflow-hidden"
      >
        <ParticleBackground />
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20">
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="flex items-center justify-between h-16">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
                <a
                  href="#"
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
                >
                  DevLitics
                </a>
              </motion.div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {["Features", "Testimonials", "Pricing"].map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="ml-4 bg-blue-500 hover:bg-blue-600 text-white">Get Started</Button>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="ml-4 p-2 rounded-md md:hidden hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <Menu className="h-6 w-6" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-40 bg-white dark:bg-gray-900 md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                {["Features", "Testimonials", "Pricing"].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMenuOpen(false)}
                  className="mt-8 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative z-10">
          <Hero />
          <Features />
          <Testimonials />
          <Pricing />
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}

