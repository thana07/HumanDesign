"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../components/ui/button"
import { 
  Sparkles, 
  Star,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  ChevronDown,
  Compass,
  Activity,
  Infinity
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { UniverseBackground } from "@/components/universe-background"
import { OrbitalAnimation } from "@/components/orbital-animation"
import { GalaxyPortal } from "@/components/galaxy-portal"
import { HolographicCard } from "@/components/holographic-card"

export default function Home() {
  const [_isHovered, _setIsHovered] = useState<string | null>(null)
  const [showPortal, setShowPortal] = useState(true)
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const [_cosmicEnergy, setCosmicEnergy] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPortal(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCosmicEnergy(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Compass,
      title: "Quantum Navigation",
      description: "Navigate your cosmic blueprint with quantum precision",
      color: "from-violet-500 to-purple-500",
      glow: "#8B5CF6"
    },
    {
      icon: Activity,
      title: "Energy Dynamics",
      description: "Real-time energy field analysis and optimization",
      color: "from-cyan-500 to-blue-500",
      glow: "#06B6D4"
    },
    {
      icon: Infinity,
      title: "Infinite Potential",
      description: "Unlock limitless possibilities in your design",
      color: "from-pink-500 to-rose-500",
      glow: "#EC4899"
    },
    {
      icon: Star,
      title: "Stellar Alignment",
      description: "Align with cosmic frequencies for optimal living",
      color: "from-amber-500 to-orange-500",
      glow: "#F59E0B"
    }
  ]

  return (
    <>
      <AnimatePresence>
        {showPortal && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50"
          >
            <GalaxyPortal onEnter={() => setShowPortal(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="min-h-screen relative">
        {/* Universe Background */}
        <UniverseBackground interactive={true} />
        
        {/* Aurora Borealis Effect */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-cyan-500/5 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-blue-500/5 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Floating Zodiac Symbols */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((symbol, i) => (
            <motion.div
              key={symbol}
              className="absolute text-4xl text-white/20"
              style={{
                left: `${(i * 8) + 5}%`,
                top: `${Math.sin(i) * 30 + 50}%`
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>

        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-8 text-white"
            >
              <Star className="w-4 h-4 text-yellow-500" />
              <span>The Revolutionary AI-Powered Human Design Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="block text-white">Discover Your</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400">Cosmic Blueprint</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
            >
              AI-powered Human Design analysis with scientific precision. 
              Verifiable, explainable, and powered by advanced artificial intelligence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/auth/signup">
                <Button size="xl" variant="gradient" className="group">
                  Kostenlos starten
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="xl" variant="glass">
                  Live Demo ansehen
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Real-time AI Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Secure Hosting</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Orbital Planets Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Your Cosmic Journey Awaits
            </h2>
            <p className="text-xl text-gray-300">
              Explore the planets and their influence on your Human Design
            </p>
          </motion.div>
          
          <div className="h-[600px] relative">
            <OrbitalAnimation showPlanets={true} interactive={true} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              AI-Powered Features
            </h2>
            <p className="text-xl text-gray-300">
              Built with cutting-edge AI technology for precision and user experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, rotateY: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100 
                }}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <HolographicCard glowColor={feature.glow} intensity={activeFeature === index ? 1.5 : 1}>
                  <div className="p-6">
                    {/* Animated Icon */}
                    <motion.div 
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-4 mx-auto`}
                      animate={activeFeature === index ? {
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      } : {}}
                      transition={{ duration: 2, repeat: activeFeature === index ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      <feature.icon className="w-full h-full text-white" />
                    </motion.div>
                    
                    <motion.h3 
                      className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300"
                      animate={activeFeature === index ? {
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      } : {}}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      style={{ backgroundSize: '200% 200%' }}
                    >
                      {feature.title}
                    </motion.h3>
                    
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                    
                    {/* Energy Orbs */}
                    {activeFeature === index && (
                      <motion.div className="absolute -inset-4 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                              background: feature.glow,
                              boxShadow: `0 0 10px ${feature.glow}`,
                            }}
                            animate={{
                              x: [0, 50, -50, 0],
                              y: [0, -50, 50, 0],
                              scale: [0, 1, 0],
                            }}
                            transition={{
                              duration: 3,
                              delay: i * 0.5,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 relative">
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4 text-white">
              Ready for Your Cosmic Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands who have discovered their Human Design through AI and are living more authentically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="xl" variant="gradient" className="group">
                  Start Free with AI
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-gray-400 mt-6">
              No credit card required • 14 days free AI-powered trial
            </p>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
    </>
  )
}