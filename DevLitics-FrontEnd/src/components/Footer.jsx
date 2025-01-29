import React from "react"
import { motion } from "framer-motion"
import { LineChart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-2"
          >
            <div className="flex items-center">
              <LineChart className="h-8 w-8 text-blue-500 mr-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">DevLitics</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Empowering developers with actionable insights and analytics.
            </p>
          </motion.div>
          {["Product", "Company"].map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-4">
                {["Features", "Pricing", "About", "Careers"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-base text-gray-400 dark:text-gray-500">&copy; 2025 DevLitics. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Facebook", "Instagram", "Twitter", "GitHub", "LinkedIn"].map((social) => (
              <a key={social} href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">{social}</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

