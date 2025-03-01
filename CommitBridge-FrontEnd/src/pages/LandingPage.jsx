"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import {
  Clock,
  Bot,
  Shield,
  Moon,
  Sun,
  Code,
  GitBranch,
  ChevronDown,
  ArrowRight,
  FileCheck,
  Award,
  BarChart,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"
import { Link } from "react-router-dom"
import LoginModal from "@/components/LoginModal"
import LeaderboardModal from "@/components/LeaderboardModal"
import { Header } from "@/components/Header"

import { Footer } from "@/components/Footer"
import { useNavigate } from "react-router-dom"


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const controls = useAnimation()
  const navigate = useNavigate()

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
    })
  }, [controls])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const faqData = [
    {
      question: "What is Dev Litics?",
      answer:
        "Dev Litics is a revolutionary platform that tracks and verifies developers' coding activities. It provides real-time analytics on coding time, languages used, and projects worked on, while also automating the process of sharing your work progress on social media platforms.",
    },
    {
      question: "How does Dev Litics verify my coding activity?",
      answer:
        "Our IDE extension securely tracks your coding sessions, including time spent, languages used, and projects worked on. This data is encrypted and stored in your personal dashboard, creating an immutable record of your development activities that can be verified by potential employers.",
    },
    {
      question: "Is my coding data secure?",
      answer:
        "Yes, your data security is our top priority. Dev Litics uses end-to-end encryption and only tracks the metadata of your coding sessions (time, language, project names), not your actual code. You have full control over what information is shared and with whom.",
    },
    {
      question: "How does the social media automation work?",
      answer:
        "Dev Litics connects to your GitHub account to fetch your commits within a timeframe you specify. Our AI then generates concise, engaging summaries of your work and automatically posts them to your linked social media accounts based on your preferences and schedule.",
    },
    {
      question: "How can employers verify my resume using Dev Litics?",
      answer:
        "Employers can use our resume verification service to validate the skills and experience listed on your resume against your actual coding activity tracked by Dev Litics. This creates trust and transparency in the hiring process, benefiting both developers and employers.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white overflow-hidden">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
        >
          Dev Litics
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </nav>

      <motion.header
        className="container mx-auto px-4 py-16 text-center relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          Dev Litics: Verify Your Coding Journey
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 dark:text-gray-300 mb-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          Track, Verify, and Showcase Your Real Development Skills
        </motion.p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl rounded-full px-8 py-3 text-lg font-semibold"
          onClick={() => setIsLoginModalOpen(true)}
        >
          Get Started Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="ml-4 border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transform hover:scale-105 transition-all duration-300 rounded-full px-8 py-3 text-lg font-semibold"
          onClick={() => navigate("/leaderboard")}
        >
          View Leaderboard
          <BarChart className="ml-2 h-5 w-5" />
        </Button>
        <motion.div className="absolute bottom-0 left-1/2 transform -translate-x-1/2" animate={controls}>
          <ChevronDown className="h-8 w-8 text-purple-500" />
        </motion.div>
      </motion.header>

      <main className="container mx-auto px-4 py-12">
        <motion.section className="mb-20" variants={staggerChildren} initial="initial" animate="animate">
          <motion.h2
            className="text-4xl font-semibold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
            variants={fadeInUp}
          >
            Key Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Clock className="w-12 h-12" />}
              title="Real-Time Coding Analytics"
              description="Track your coding time, languages used, and projects worked on with our IDE extension."
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12" />}
              title="Verified Development History"
              description="Build a verifiable record of your coding activities that employers can trust."
            />
            <FeatureCard
              icon={<Bot className="w-12 h-12" />}
              title="AI-Powered Social Sharing"
              description="Automatically share your coding achievements on social media with AI-generated summaries."
            />
            <FeatureCard
              icon={<FileCheck className="w-12 h-12" />}
              title="Resume Verification"
              description="Get your resume skills and experience verified based on your actual coding activity."
            />
            <FeatureCard
              icon={<BarChart className="w-12 h-12" />}
              title="Advanced Analytics"
              description="Gain insights into your coding patterns, productivity, and skill development over time."
            />
            <FeatureCard
              icon={<Briefcase className="w-12 h-12" />}
              title="Employer Dashboard"
              description="Give employers verified insights into your capabilities and development progress."
            />
          </div>
        </motion.section>

        <motion.section className="mb-20" variants={staggerChildren} initial="initial" animate="animate">
          <motion.h2
            className="text-4xl font-semibold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
            variants={fadeInUp}
          >
            How It Works
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            <WorkflowCard
              icon={<Code className="w-8 h-8" />}
              title="Code"
              description="Our IDE extension tracks your coding activity in real-time."
            />
            <GitBranch className="w-8 h-8 text-purple-500 transform rotate-90 md:rotate-0" />
            <WorkflowCard
              icon={<BarChart className="w-8 h-8" />}
              title="Analyze"
              description="View detailed analytics about your coding habits and skills."
            />
            <GitBranch className="w-8 h-8 text-purple-500 transform rotate-90 md:rotate-0" />
            <WorkflowCard
              icon={<Award className="w-8 h-8" />}
              title="Verify"
              description="Get your skills verified and share your achievements automatically."
            />
          </div>
        </motion.section>

        <motion.section className="mb-20" variants={staggerChildren} initial="initial" animate="animate">
          <motion.h2
            className="text-4xl font-semibold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
            variants={fadeInUp}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="w-full max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="mb-4"
                initial={false}
                animate={{ backgroundColor: expandedFaq === index ? "rgba(168, 85, 247, 0.1)" : "transparent" }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className="flex justify-between items-center w-full px-6 py-4 text-lg font-medium text-left text-gray-800 dark:text-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-purple-500 transition-transform duration-300 ${
                      expandedFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </motion.button>
                <AnimatePresence initial={false}>
                  {expandedFaq === index && (
                    <motion.div
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={{
                        expanded: { opacity: 1, height: "auto", marginTop: 8 },
                        collapsed: { opacity: 0, height: 0, marginTop: 0 },
                      }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <motion.div
                        variants={{ collapsed: { scale: 0.8 }, expanded: { scale: 1 } }}
                        transition={{ duration: 0.4 }}
                        className="text-gray-600 dark:text-gray-300 px-6 pb-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-b-lg"
                      >
                        {faq.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <LeaderboardModal isOpen={isLeaderboardModalOpen} onClose={() => setIsLeaderboardModalOpen(false)} />
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div initial="initial" animate="animate" variants={fadeInUp}>
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="flex flex-col items-center gap-4 text-purple-600 dark:text-purple-400">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              {icon}
            </motion.div>
            <span className="text-xl">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 dark:text-gray-300 text-center">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function WorkflowCard({ icon, title, description }) {
  return (
    <motion.div initial="initial" animate="animate" variants={fadeInUp}>
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden w-full md:w-64">
        <CardHeader>
          <CardTitle className="flex flex-col items-center gap-4 text-purple-600 dark:text-purple-400">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              {icon}
            </motion.div>
            <span className="text-xl">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 dark:text-gray-300 text-center">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

