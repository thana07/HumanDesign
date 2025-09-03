'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Planet {
  id: string;
  name: string;
  symbol: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitDuration: number;
  description?: string;
}

const PLANETS: Planet[] = [
  {
    id: 'sun',
    name: 'Sun',
    symbol: '☉',
    color: '#FFD700',
    size: 60,
    orbitRadius: 0,
    orbitDuration: 0,
    description: 'Your core identity and ego'
  },
  {
    id: 'mercury',
    name: 'Mercury',
    symbol: '☿',
    color: '#A0A0A0',
    size: 20,
    orbitRadius: 80,
    orbitDuration: 10,
    description: 'Communication and intellect'
  },
  {
    id: 'venus',
    name: 'Venus',
    symbol: '♀',
    color: '#FF69B4',
    size: 28,
    orbitRadius: 120,
    orbitDuration: 15,
    description: 'Love and relationships'
  },
  {
    id: 'earth',
    name: 'Earth',
    symbol: '⊕',
    color: '#4169E1',
    size: 30,
    orbitRadius: 160,
    orbitDuration: 20,
    description: 'Material world and grounding'
  },
  {
    id: 'mars',
    name: 'Mars',
    symbol: '♂',
    color: '#DC143C',
    size: 24,
    orbitRadius: 200,
    orbitDuration: 25,
    description: 'Action and desire'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    symbol: '♃',
    color: '#DAA520',
    size: 45,
    orbitRadius: 260,
    orbitDuration: 35,
    description: 'Expansion and wisdom'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    symbol: '♄',
    color: '#8B7355',
    size: 40,
    orbitRadius: 320,
    orbitDuration: 45,
    description: 'Structure and discipline'
  }
];

interface OrbitalAnimationProps {
  children?: ReactNode;
  showPlanets?: boolean;
  interactive?: boolean;
}

export function OrbitalAnimation({ 
  children, 
  showPlanets = true,
  interactive = true 
}: OrbitalAnimationProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Orbital rings */}
      {PLANETS.filter(p => p.orbitRadius > 0).map(planet => (
        <motion.div
          key={`orbit-${planet.id}`}
          className="absolute rounded-full border border-white/10"
          style={{
            width: planet.orbitRadius * 2,
            height: planet.orbitRadius * 2,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: planet.orbitDuration / 100,
            duration: 1,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Central content or Sun */}
      <div className="relative z-10">
        {children || (
          showPlanets && (
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div
                className="flex items-center justify-center rounded-full shadow-2xl"
                style={{
                  width: PLANETS[0].size,
                  height: PLANETS[0].size,
                  background: `radial-gradient(circle at 30% 30%, ${PLANETS[0].color}, #FF8C00)`,
                  boxShadow: `0 0 40px ${PLANETS[0].color}`,
                }}
              >
                <span className="text-3xl">{PLANETS[0].symbol}</span>
              </div>
              {interactive && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                  {PLANETS[0].name}: {PLANETS[0].description}
                </div>
              )}
            </motion.div>
          )
        )}
      </div>

      {/* Orbiting planets */}
      {showPlanets && PLANETS.filter(p => p.orbitRadius > 0).map(planet => (
        <motion.div
          key={`planet-${planet.id}`}
          className="absolute"
          style={{
            width: planet.orbitRadius * 2,
            height: planet.orbitRadius * 2,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: planet.orbitDuration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="absolute group cursor-pointer"
            style={{
              top: -planet.size / 2,
              left: planet.orbitRadius - planet.size / 2,
              width: planet.size,
              height: planet.size,
            }}
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: planet.orbitDuration,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={interactive ? { scale: 1.2 } : {}}
          >
            <div
              className="w-full h-full rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${planet.color}CC, ${planet.color})`,
                boxShadow: `0 0 20px ${planet.color}80`,
              }}
            >
              <span 
                className="text-white font-bold"
                style={{ fontSize: planet.size * 0.4 }}
              >
                {planet.symbol}
              </span>
            </div>
            {interactive && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-3 py-1 rounded-full text-xs whitespace-nowrap z-50">
                <div className="font-semibold text-white">{planet.name}</div>
                <div className="text-gray-300">{planet.description}</div>
              </div>
            )}
          </motion.div>
        </motion.div>
      ))}

      {/* Cosmic dust particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}