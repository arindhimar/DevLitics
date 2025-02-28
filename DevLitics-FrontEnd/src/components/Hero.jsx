import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import * as THREE from "three"
import { Link } from "react-router-dom"

export default function Hero({ isSignedIn }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth / 2, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.querySelector(".animation-container").appendChild(renderer.domElement)

    // Create analytics dashboard elements
    const dashboardGroup = new THREE.Group()

    // Create multiple bar charts
    const createBar = (height, x, z) => {
      const geometry = new THREE.BoxGeometry(1, height, 1)
      const material = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.8,
      })
      const bar = new THREE.Mesh(geometry, material)
      bar.position.set(x, height / 2, z)
      return bar
    }

    // Create grid of bars
    for (let x = -10; x <= 10; x += 2) {
      for (let z = -10; z <= 10; z += 2) {
        const height = Math.random() * 10 + 2
        const bar = createBar(height, x, z)
        dashboardGroup.add(bar)
      }
    }

    // Add line graph
    const linePoints = []
    for (let x = -12; x <= 12; x++) {
      const y = Math.sin(x * 0.5) * 3 + Math.random() * 2
      linePoints.push(new THREE.Vector3(x, y + 8, -12))
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x4ade80 })
    const lineGraph = new THREE.Line(lineGeometry, lineMaterial)
    dashboardGroup.add(lineGraph)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    scene.add(dashboardGroup)
    dashboardGroup.rotation.x = -0.5
    camera.position.set(0, 20, 30)
    camera.lookAt(0, 0, 0)

    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCnt = 1000
    const posArray = new Float32Array(particlesCnt * 3)

    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x4ade80,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate dashboard slightly
      dashboardGroup.rotation.y += 0.002

      // Animate bars
      dashboardGroup.children.forEach((child, i) => {
        if (child.type === "Mesh") {
          child.scale.y = 1 + Math.sin(Date.now() * 0.001 + i) * 0.1
        }
      })

      // Animate particles
      particlesMesh.rotation.y += 0.0005

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth / 2, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      const container = containerRef.current?.querySelector(".animation-container")
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#020817] -z-10" />

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <motion.div style={{ y, opacity }} className="w-full lg:w-1/2 text-left space-y-8 pb-12 lg:pb-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-7xl font-bold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 leading-tight">
              Elevate Your Coding Journey
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-400 max-w-xl"
          >
            DevLitics provides real-time analytics and insights to transform your development workflow and boost
            productivity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {isSignedIn ? (
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/sign-up">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white">
                    Get Started
                  </Button>
                </Link>
              )}
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto group">
                Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="w-full lg:w-1/2 animation-container relative h-[600px]" />
      </div>
    </section>
  )
}

