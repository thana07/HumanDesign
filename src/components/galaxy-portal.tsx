'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  color: string;
  size: number;
}

interface PortalRing {
  radius: number;
  rotation: number;
  speed: number;
  color: string;
  opacity: number;
}

export function GalaxyPortal({ 
  onEnter,
  isActive = true 
}: { 
  onEnter?: () => void;
  isActive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [portalEnergy, setPortalEnergy] = useState(0);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  // Initialize particles
  useEffect(() => {
    const newParticles: Particle[] = [];
    const colors = [
      '#FF00FF', '#00FFFF', '#FFD700', '#FF69B4', 
      '#00FF00', '#FF4500', '#9370DB', '#00CED1'
    ];

    for (let i = 0; i < 500; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 300 + 50;
      const z = Math.random() * 1000 - 500;
      
      newParticles.push({
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: z,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: Math.random() * 2,
        life: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 1
      });
    }
    setParticles(newParticles);
  }, []);

  // Portal animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      timeRef.current += 0.01;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw portal rings
      const rings: PortalRing[] = [
        { radius: 150, rotation: timeRef.current, speed: 1, color: '#FF00FF', opacity: 0.3 },
        { radius: 180, rotation: -timeRef.current * 1.5, speed: 1.5, color: '#00FFFF', opacity: 0.3 },
        { radius: 210, rotation: timeRef.current * 2, speed: 2, color: '#FFD700', opacity: 0.3 },
        { radius: 240, rotation: -timeRef.current * 0.8, speed: 0.8, color: '#FF69B4', opacity: 0.3 },
      ];

      rings.forEach((ring, index) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(ring.rotation);
        
        // Create gradient for ring
        const gradient = ctx.createRadialGradient(0, 0, ring.radius - 20, 0, 0, ring.radius + 20);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, ring.color + '80');
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 40;
        ctx.globalAlpha = ring.opacity + (isHovered ? 0.3 : 0) + Math.sin(timeRef.current * 3 + index) * 0.1;
        
        // Draw segmented ring
        for (let i = 0; i < 12; i++) {
          const angle = (Math.PI * 2 / 12) * i;
          const nextAngle = (Math.PI * 2 / 12) * (i + 0.8);
          
          ctx.beginPath();
          ctx.arc(0, 0, ring.radius, angle, nextAngle);
          ctx.stroke();
        }
        
        ctx.restore();
      });

      // Draw central black hole with event horizon
      const blackHoleGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 100 + Math.sin(timeRef.current * 2) * 10
      );
      blackHoleGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      blackHoleGradient.addColorStop(0.5, 'rgba(0, 0, 50, 0.8)');
      blackHoleGradient.addColorStop(0.8, 'rgba(100, 0, 200, 0.4)');
      blackHoleGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = blackHoleGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach(particle => {
        // Calculate 3D to 2D projection
        const perspective = 800;
        const scale = perspective / (perspective + particle.z);
        const x2d = centerX + particle.x * scale;
        const y2d = centerY + particle.y * scale;
        
        // Update particle position
        const angleToCenter = Math.atan2(particle.y, particle.x);
        const distanceToCenter = Math.sqrt(particle.x * particle.x + particle.y * particle.y);
        
        // Spiral motion towards center
        particle.x -= Math.cos(angleToCenter) * 2;
        particle.y -= Math.sin(angleToCenter) * 2;
        particle.z += particle.vz;
        
        // Add rotation
        const rotationSpeed = 0.02 * (1 - distanceToCenter / 300);
        const newAngle = angleToCenter + rotationSpeed;
        particle.x = Math.cos(newAngle) * distanceToCenter;
        particle.y = Math.sin(newAngle) * distanceToCenter;
        
        // Reset particle if it reaches center or goes too far
        if (distanceToCenter < 20 || particle.z > 500) {
          const angle = Math.random() * Math.PI * 2;
          const radius = 250 + Math.random() * 100;
          particle.x = Math.cos(angle) * radius;
          particle.y = Math.sin(angle) * radius;
          particle.z = -500;
        }
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.life * scale * (isHovered ? 1.5 : 1);
        
        // Add glow effect
        const glowGradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, particle.size * scale * 3);
        glowGradient.addColorStop(0, particle.color);
        glowGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, particle.size * scale * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw particle core
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(x2d, y2d, particle.size * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw energy waves when hovered
      if (isHovered) {
        for (let i = 0; i < 3; i++) {
          const waveRadius = 50 + (timeRef.current * 100 + i * 50) % 300;
          const waveOpacity = Math.max(0, 1 - waveRadius / 300);
          
          ctx.strokeStyle = `rgba(147, 51, 234, ${waveOpacity * 0.5})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw lightning effects occasionally
      if (Math.random() < 0.02 && isHovered) {
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFFFFF';
        
        const startAngle = Math.random() * Math.PI * 2;
        const endAngle = startAngle + (Math.random() - 0.5) * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(startAngle) * 100,
          centerY + Math.sin(startAngle) * 100
        );
        
        for (let i = 0; i < 5; i++) {
          const radius = 100 + i * 30 + Math.random() * 20;
          const angle = startAngle + (endAngle - startAngle) * (i / 5) + (Math.random() - 0.5) * 0.3;
          ctx.lineTo(
            centerX + Math.cos(angle) * radius,
            centerY + Math.sin(angle) * radius
          );
        }
        
        ctx.stroke();
        ctx.restore();
      }

      // Update portal energy
      if (isHovered) {
        setPortalEnergy(prev => Math.min(prev + 0.02, 1));
      } else {
        setPortalEnergy(prev => Math.max(prev - 0.01, 0));
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, isHovered]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onEnter}
      />
      
      {/* Portal UI Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  ENTER THE COSMOS
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Your Human Design Journey Awaits
              </p>
              
              {/* Energy Bar */}
              <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${portalEnergy * 100}%` }}
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity
                  }}
                />
              </div>
              
              {portalEnergy > 0.5 && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-purple-400 mt-4"
                >
                  Portal Charging... Click to Enter
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}