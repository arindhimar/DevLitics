import React from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "DevLitics has completely transformed how I track my coding progress. The insights are invaluable.",
    author: "Sarah Chen",
    role: "Senior Developer",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote: "The real-time analytics and GitHub integration make it super easy to monitor team productivity.",
    author: "Michael Rodriguez",
    role: "Tech Lead",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote: "As a coding bootcamp instructor, DevLitics helps me track student progress effectively.",
    author: "James Wilson",
    role: "Lead Instructor",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12"
        >
          What Developers Say
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

