import React from "react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: ["Basic analytics", "GitHub integration", "Personal dashboard", "Community support"],
  },
  {
    name: "Pro",
    price: "$19",
    features: ["Advanced analytics", "All integrations", "Team collaboration", "Priority support", "Custom reports"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Everything in Pro", "Custom integrations", "Dedicated support", "SLA guarantee", "Advanced security"],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the plan that's right for you or your team
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{plan.name}</h3>
                <p className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
                  {plan.price}
                  {plan.price !== "Custom" && (
                    <span className="text-lg font-normal text-gray-500 dark:text-gray-400">/month</span>
                  )}
                </p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Get Started</Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

