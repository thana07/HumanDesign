'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export function HolographicCard({ 
  children, 
  className = '',
  glowColor = '#9333EA',
  intensity = 1
}: HolographicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY
      }}
      className={`relative group ${className}`}
    >
      {/* Holographic effect layers */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {/* Rainbow gradient overlay */}
        <div 
          className="absolute inset-0 rounded-2xl animate-pulse"
          style={{
            background: `
              linear-gradient(
                45deg,
                transparent 30%,
                ${glowColor}40 50%,
                transparent 70%
              )
            `,
            backgroundSize: '200% 200%',
            animation: 'shimmer 3s infinite'
          }}
        />
        
        {/* Prismatic effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  ${glowColor}20 2px,
                  ${glowColor}20 4px
                ),
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  ${glowColor}20 2px,
                  ${glowColor}20 4px
                )
              `
            }}
          />
        </div>
        
        {/* Holographic foil effect */}
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `
              conic-gradient(
                from 180deg at 50% 50%,
                #FF00FF20,
                #00FFFF20,
                #FFD70020,
                #FF00FF20
              )
            `,
            filter: 'blur(20px)',
            transform: 'translateZ(0)',
            opacity: intensity * 0.5
          }}
        />
      </div>
      
      {/* Main card content */}
      <div 
        className="relative rounded-2xl bg-gradient-to-br from-gray-900/90 via-purple-900/90 to-gray-900/90 backdrop-blur-xl border border-white/10 overflow-hidden"
        style={{
          transform: 'translateZ(50px)',
          transformStyle: 'preserve-3d',
          boxShadow: `
            0 10px 40px -10px ${glowColor}80,
            0 0 60px -20px ${glowColor}40,
            inset 0 0 30px -10px ${glowColor}20
          `
        }}
      >
        {/* Animated border gradient */}
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `
              linear-gradient(
                45deg,
                transparent,
                ${glowColor}40,
                transparent
              )
            `,
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 3s ease infinite',
            opacity: 0.5
          }}
        />
        
        {/* Glass reflection */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(
                105deg,
                transparent 40%,
                white 50%,
                transparent 60%
              )
            `,
            transform: 'translateZ(1px)',
            pointerEvents: 'none'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10" style={{ transform: 'translateZ(75px)' }}>
          {children}
        </div>
        
        {/* Particle effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 -z-10"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}40, transparent 70%)`,
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  );
}