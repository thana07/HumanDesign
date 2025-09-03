'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  color: string;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
}

interface Constellation {
  id: string;
  name: string;
  stars: { x: number; y: number }[];
  zodiac?: string;
}

const ZODIAC_CONSTELLATIONS: Constellation[] = [
  {
    id: 'aries',
    name: 'Aries',
    zodiac: '♈',
    stars: [
      { x: 0.1, y: 0.2 },
      { x: 0.12, y: 0.18 },
      { x: 0.14, y: 0.22 },
      { x: 0.16, y: 0.19 },
    ]
  },
  {
    id: 'taurus',
    name: 'Taurus',
    zodiac: '♉',
    stars: [
      { x: 0.3, y: 0.15 },
      { x: 0.32, y: 0.17 },
      { x: 0.34, y: 0.14 },
      { x: 0.35, y: 0.18 },
      { x: 0.37, y: 0.16 },
    ]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    zodiac: '♊',
    stars: [
      { x: 0.5, y: 0.1 },
      { x: 0.52, y: 0.12 },
      { x: 0.51, y: 0.14 },
      { x: 0.53, y: 0.13 },
    ]
  },
  {
    id: 'leo',
    name: 'Leo',
    zodiac: '♌',
    stars: [
      { x: 0.7, y: 0.25 },
      { x: 0.72, y: 0.23 },
      { x: 0.74, y: 0.26 },
      { x: 0.75, y: 0.24 },
      { x: 0.73, y: 0.27 },
    ]
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    zodiac: '♏',
    stars: [
      { x: 0.85, y: 0.4 },
      { x: 0.87, y: 0.38 },
      { x: 0.89, y: 0.41 },
      { x: 0.88, y: 0.43 },
      { x: 0.9, y: 0.42 },
    ]
  }
];

export function UniverseBackground({ interactive = true }: { interactive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [hoveredConstellation, setHoveredConstellation] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const starArray: Star[] = [];
      const colors = ['#FFFFFF', '#FFE4B5', '#FFDAB9', '#FFD700', '#FFA500', '#FF6347'];
      
      for (let i = 0; i < 200; i++) {
        starArray.push({
          id: i,
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 3 + 0.5,
          brightness: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      return starArray;
    };

    setStars(generateStars());
  }, []);

  // Generate shooting stars periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const newShootingStar: ShootingStar = {
          id: Date.now(),
          startX: Math.random(),
          startY: Math.random() * 0.5,
          endX: Math.random(),
          endY: Math.random() * 0.5 + 0.5,
          duration: Math.random() * 2 + 1
        };
        
        setShootingStars(prev => [...prev, newShootingStar]);
        
        setTimeout(() => {
          setShootingStars(prev => prev.filter(s => s.id !== newShootingStar.id));
        }, newShootingStar.duration * 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Canvas animation
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#000428');
      gradient.addColorStop(0.5, '#004e92');
      gradient.addColorStop(1, '#000428');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula effect
      const time = Date.now() * 0.0001;
      ctx.save();
      ctx.globalAlpha = 0.1;
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time) * 0.1),
        canvas.height * (0.5 + Math.cos(time) * 0.1),
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.5
      );
      nebulaGradient.addColorStop(0, '#FF00FF');
      nebulaGradient.addColorStop(0.5, '#00FFFF');
      nebulaGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Draw stars with twinkling effect
      stars.forEach(star => {
        const twinkle = Math.sin(Date.now() * 0.001 * star.twinkleSpeed) * 0.5 + 0.5;
        ctx.save();
        ctx.globalAlpha = star.brightness * twinkle;
        
        // Add glow effect
        const glowGradient = ctx.createRadialGradient(
          star.x * canvas.width,
          star.y * canvas.height,
          0,
          star.x * canvas.width,
          star.y * canvas.height,
          star.size * 3
        );
        glowGradient.addColorStop(0, star.color);
        glowGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(
          star.x * canvas.width,
          star.y * canvas.height,
          star.size * 3,
          0,
          Math.PI * 2
        );
        ctx.fill();
        
        // Draw star core
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(
          star.x * canvas.width,
          star.y * canvas.height,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      });

      // Draw constellations
      ZODIAC_CONSTELLATIONS.forEach(constellation => {
        const isHovered = hoveredConstellation === constellation.id;
        ctx.save();
        ctx.globalAlpha = isHovered ? 0.8 : 0.3;
        ctx.strokeStyle = isHovered ? '#FFD700' : '#FFFFFF';
        ctx.lineWidth = isHovered ? 2 : 1;
        
        // Draw constellation lines
        ctx.beginPath();
        constellation.stars.forEach((star, index) => {
          const x = star.x * canvas.width;
          const y = star.y * canvas.height;
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
        
        // Draw constellation stars
        constellation.stars.forEach(star => {
          ctx.fillStyle = isHovered ? '#FFD700' : '#FFFFFF';
          ctx.beginPath();
          ctx.arc(
            star.x * canvas.width,
            star.y * canvas.height,
            isHovered ? 4 : 3,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });
        
        // Draw zodiac symbol if hovered
        if (isHovered && constellation.zodiac) {
          ctx.font = 'bold 24px serif';
          ctx.fillStyle = '#FFD700';
          ctx.textAlign = 'center';
          ctx.fillText(
            constellation.zodiac,
            constellation.stars[0].x * canvas.width,
            constellation.stars[0].y * canvas.height - 20
          );
        }
        
        ctx.restore();
      });

      // Interactive mouse effect
      if (interactive && mousePos.x && mousePos.y) {
        ctx.save();
        const gradient = ctx.createRadialGradient(
          mousePos.x,
          mousePos.y,
          0,
          mousePos.x,
          mousePos.y,
          100
        );
        gradient.addColorStop(0, 'rgba(147, 51, 234, 0.3)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
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
  }, [stars, hoveredConstellation, mousePos, interactive]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Check constellation hover
    const canvas = canvasRef.current;
    if (!canvas) return;

    const relX = x / canvas.width;
    const relY = y / canvas.height;

    const hovered = ZODIAC_CONSTELLATIONS.find(constellation => {
      return constellation.stars.some(star => {
        const distance = Math.sqrt(
          Math.pow(star.x - relX, 2) + Math.pow(star.y - relY, 2)
        );
        return distance < 0.05;
      });
    });

    setHoveredConstellation(hovered?.id || null);
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
      />
      
      {/* Shooting stars */}
      {shootingStars.map(star => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            left: `${star.startX * 100}%`,
            top: `${star.startY * 100}%`,
            opacity: 1
          }}
          animate={{
            left: `${star.endX * 100}%`,
            top: `${star.endY * 100}%`,
            opacity: 0
          }}
          transition={{
            duration: star.duration,
            ease: "linear"
          }}
        >
          <div className="absolute inset-0 bg-white blur-sm scale-150" />
          <motion.div
            className="absolute h-px bg-gradient-to-r from-white to-transparent"
            style={{ width: '100px', right: '0' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: star.duration * 0.3 }}
          />
        </motion.div>
      ))}
      
      {/* Constellation tooltip */}
      {hoveredConstellation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-yellow-500/50"
        >
          <p className="text-yellow-400 font-semibold">
            {ZODIAC_CONSTELLATIONS.find(c => c.id === hoveredConstellation)?.name}
          </p>
        </motion.div>
      )}
    </div>
  );
}