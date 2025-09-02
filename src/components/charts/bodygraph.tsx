"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Chart, Center, Gate } from '../../types/human-design'
import { cn } from '../../lib/utils'

interface BodygraphProps {
  chart: Chart
  interactive?: boolean
  showLabels?: boolean
  className?: string
  onGateClick?: (gate: Gate) => void
  onCenterClick?: (center: Center) => void
}

export function Bodygraph({
  chart,
  interactive = true,
  showLabels = true,
  className,
  onGateClick: _onGateClick,
  onCenterClick: _onCenterClick
}: BodygraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredElement, _setHoveredElement] = useState<string | null>(null)
  const [selectedGate, _setSelectedGate] = useState<number | null>(null)

  // Center Positionen im Bodygraph (normalisiert 0-1)
  const centerPositions = {
    head: { x: 0.5, y: 0.05, shape: 'triangle' },
    ajna: { x: 0.5, y: 0.15, shape: 'triangle' },
    throat: { x: 0.5, y: 0.25, shape: 'square' },
    g_center: { x: 0.5, y: 0.4, shape: 'diamond' },
    heart: { x: 0.35, y: 0.4, shape: 'triangle' },
    spleen: { x: 0.2, y: 0.55, shape: 'triangle' },
    solar_plexus: { x: 0.65, y: 0.55, shape: 'triangle' },
    sacral: { x: 0.5, y: 0.6, shape: 'square' },
    root: { x: 0.5, y: 0.85, shape: 'square' }
  }

  // Farben für definierte/undefinierte Zentren
  const centerColors = {
    defined: {
      head: '#FFEB3B',
      ajna: '#4CAF50',
      throat: '#795548',
      g_center: '#FFC107',
      heart: '#F44336',
      spleen: '#795548',
      solar_plexus: '#FF9800',
      sacral: '#F44336',
      root: '#795548'
    },
    undefined: '#FFFFFF'
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Canvas Setup für Retina Display
    const scale = window.devicePixelRatio || 1
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    
    canvas.width = width * scale
    canvas.height = height * scale
    ctx.scale(scale, scale)

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw Channels
    drawChannels(ctx, width, height)

    // Draw Centers
    drawCenters(ctx, width, height)

    // Draw Gates
    drawGates(ctx, width, height)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, hoveredElement, selectedGate])

  const drawChannels = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    chart.channels.forEach(channel => {
      const [gate1, gate2] = channel.gates
      const center1 = getCenterForGate(gate1)
      const center2 = getCenterForGate(gate2)
      
      if (center1 && center2) {
        const pos1 = centerPositions[center1 as keyof typeof centerPositions]
        const pos2 = centerPositions[center2 as keyof typeof centerPositions]
        
        ctx.beginPath()
        ctx.moveTo(pos1.x * width, pos1.y * height)
        ctx.lineTo(pos2.x * width, pos2.y * height)
        
        // Style basierend auf Definition
        if (channel.defined) {
          ctx.strokeStyle = channel.type === 'conscious' ? '#000000' : '#FF0000'
          ctx.lineWidth = 3
        } else {
          ctx.strokeStyle = '#E0E0E0'
          ctx.lineWidth = 1
        }
        
        ctx.stroke()
      }
    })
  }

  const drawCenters = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    chart.centers.forEach(center => {
      const pos = centerPositions[center.name as keyof typeof centerPositions]
      if (!pos) return

      const x = pos.x * width
      const y = pos.y * height
      const size = 40

      // Draw shape based on center type
      ctx.beginPath()
      
      switch (pos.shape) {
        case 'triangle':
          ctx.moveTo(x, y - size/2)
          ctx.lineTo(x - size/2, y + size/2)
          ctx.lineTo(x + size/2, y + size/2)
          ctx.closePath()
          break
        case 'square':
          ctx.rect(x - size/2, y - size/2, size, size)
          break
        case 'diamond':
          ctx.moveTo(x, y - size/2)
          ctx.lineTo(x + size/2, y)
          ctx.lineTo(x, y + size/2)
          ctx.lineTo(x - size/2, y)
          ctx.closePath()
          break
      }

      // Fill color based on definition
      if (center.defined) {
        ctx.fillStyle = centerColors.defined[center.name as keyof typeof centerColors.defined]
      } else {
        ctx.fillStyle = centerColors.undefined
      }
      
      ctx.fill()
      ctx.strokeStyle = '#333333'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw center name if labels enabled
      if (showLabels) {
        ctx.fillStyle = center.defined ? '#FFFFFF' : '#666666'
        ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(center.name.replace('_', ' ').toUpperCase(), x, y)
      }
    })
  }

  const drawGates = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    chart.gates.forEach(gate => {
      if (!gate.activated) return

      const center = getCenterForGate(gate.number)
      if (!center) return

      const centerPos = centerPositions[center as keyof typeof centerPositions]
      const gatePosition = getGatePosition(gate.number, centerPos, width, height)
      
      // Draw gate circle
      ctx.beginPath()
      ctx.arc(gatePosition.x, gatePosition.y, 12, 0, Math.PI * 2)
      
      // Color based on design/personality
      ctx.fillStyle = gate.design ? '#FF0000' : '#000000'
      ctx.fill()
      
      // Gate number
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 10px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(gate.number.toString(), gatePosition.x, gatePosition.y)
      
      // Highlight if selected
      if (selectedGate === gate.number) {
        ctx.strokeStyle = '#007AFF'
        ctx.lineWidth = 3
        ctx.stroke()
      }
    })
  }

  const getCenterForGate = (gateNumber: number): string | null => {
    // Mapping von Gates zu Zentren
    const gateToCenter: { [key: number]: string } = {
      // Head Center
      64: 'head', 61: 'head', 63: 'head',
      // Ajna Center
      47: 'ajna', 24: 'ajna', 4: 'ajna', 17: 'ajna', 43: 'ajna', 11: 'ajna',
      // Throat Center
      62: 'throat', 23: 'throat', 56: 'throat', 35: 'throat', 12: 'throat', 
      45: 'throat', 33: 'throat', 8: 'throat', 31: 'throat', 20: 'throat', 16: 'throat',
      // G Center
      7: 'g_center', 1: 'g_center', 13: 'g_center', 25: 'g_center', 
      46: 'g_center', 2: 'g_center', 15: 'g_center', 10: 'g_center',
      // Heart Center
      21: 'heart', 40: 'heart', 26: 'heart', 51: 'heart',
      // Spleen Center
      48: 'spleen', 57: 'spleen', 44: 'spleen', 50: 'spleen', 
      32: 'spleen', 28: 'spleen', 18: 'spleen',
      // Solar Plexus
      36: 'solar_plexus', 22: 'solar_plexus', 37: 'solar_plexus', 
      6: 'solar_plexus', 49: 'solar_plexus', 55: 'solar_plexus', 30: 'solar_plexus',
      // Sacral Center
      5: 'sacral', 14: 'sacral', 29: 'sacral', 59: 'sacral', 
      9: 'sacral', 3: 'sacral', 42: 'sacral', 27: 'sacral', 34: 'sacral',
      // Root Center
      53: 'root', 60: 'root', 52: 'root', 19: 'root', 39: 'root', 
      41: 'root', 58: 'root', 38: 'root', 54: 'root'
    }
    
    return gateToCenter[gateNumber] || null
  }

  const getGatePosition = (
    gateNumber: number, 
    centerPos: { x: number, y: number }, 
    width: number, 
    height: number
  ) => {
    // Positioniere Gates um das Zentrum herum
    const angle = (gateNumber * 137.5) % 360 // Goldener Winkel für gleichmäßige Verteilung
    const radius = 50
    const x = centerPos.x * width + Math.cos(angle * Math.PI / 180) * radius
    const y = centerPos.y * height + Math.sin(angle * Math.PI / 180) * radius
    
    return { x, y }
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const _x = event.clientX - rect.left
    const _y = event.clientY - rect.top
    
    // Check if click is on a gate or center
    // Implementation would check distances to gates/centers
    // and trigger appropriate callbacks
  }

  return (
    <div className={cn("relative", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-[600px] cursor-pointer"
          onClick={handleCanvasClick}
          onMouseMove={(_e) => {
            // Handle hover effects
          }}
        />
        
        {/* Info Panel */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="glass rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-2">Typ</h3>
            <p className="text-lg gradient-text">{chart.type}</p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-2">Autorität</h3>
            <p className="text-lg gradient-text">{chart.authority}</p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-2">Profil</h3>
            <p className="text-lg gradient-text">{chart.profile}</p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-2">Strategie</h3>
            <p className="text-lg gradient-text">{chart.strategy}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}