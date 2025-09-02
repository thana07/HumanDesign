"use client"

import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { 
  Sparkles, 
  Brain, 
  Users, 
  Calendar,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  ChevronDown
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced AI algorithms for precise Human Design calculations",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Sparkles,
      title: "AI Coach",
      description: "Personalized insights powered by artificial intelligence",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Relationship Analysis",
      description: "AI-driven insights into partnership and team dynamics",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Calendar,
      title: "Transit & Cycles",
      description: "Real-time transits and AI-enhanced cycle predictions",
      color: "from-green-500 to-teal-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[40%] -left-[20%] w-[140%] h-[140%] bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-3xl" />
          <div className="absolute -bottom-[40%] -right-[20%] w-[140%] h-[140%] bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-3xl" />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-8"
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
              <span className="block text-foreground">Discover Your</span>
              <span className="block gradient-text">True Self with AI</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
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
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              AI-Powered Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Built with cutting-edge AI technology for precision and user experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setIsHovered(feature.title)}
                onMouseLeave={() => setIsHovered(null)}
                className="relative group"
              >
                <div className="glass rounded-2xl p-6 h-full hover:shadow-smooth-lg transition-all duration-300 hover:scale-[1.02]">
                  {/* Icon with gradient background */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color.split(' ')[1]} 0%, ${feature.color.split(' ')[3]} 100%)`
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20" />
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-12 max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4">
              Ready for Your AI Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
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
            
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • 14 days free AI-powered trial
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}