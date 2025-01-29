import React from "react"
import { motion } from "framer-motion"
import { LineChart, Code2, Users, GitBranch, BarChart, Zap } from "lucide-react"

const features = [
  {
    name: "Real-time Analytics",
    description: "Track your coding activity and progress as it happens.",
    icon: LineChart,
  },
  {
    name: "Code Quality Insights",
    description: "Get actionable insights to improve your code quality.",
    icon: Code2,
  },
  {
    name: "Team Collaboration",
    description: "Seamlessly collaborate with your team members.",
    icon: Users,
  },
  {
    name: "Version Control Integration",
    description: "Integrate with popular version control systems.",
    icon: GitBranch,
  },
  {
    name: "Performance Metrics",
    description: "Monitor and optimize your application's performance.",
    icon: BarChart,
  },
  {
    name: "AI-Powered Suggestions",
    description: "Receive intelligent suggestions to enhance your workflow.",
    icon: Zap,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">Powerful Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to track and improve your development workflow
          </p>
        </motion.div>
        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <feature.icon className="h-12 w-12 text-blue-500 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">{feature.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

