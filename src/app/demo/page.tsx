'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bodygraph } from '@/components/charts/bodygraph';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, 
  Info, 
  Sparkles, 
  User, 
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import { Chart } from '@/types/human-design';

// Demo chart data - Einstein's Human Design
const DEMO_CHART: Chart & { name: string, birthPlace: string, birthTime: string } = {
  id: 'demo-einstein',
  userId: 'demo',
  name: 'Albert Einstein',
  birthPlace: 'Ulm, Germany',
  birthTime: '11:30',
  birthData: {
    date: '1879-03-14',
    time: '11:30',
    timeAccuracy: 'exact' as const,
    location: {
      name: 'Ulm, Germany',
      lat: 48.4011,
      lon: 9.9876,
      timezone: 'Europe/Berlin'
    }
  },
  
  type: 'manifestor',
  authority: 'emotional',
  strategy: 'To Inform',
  profile: '5/1',
  notSelf: 'Anger',
  incarnationCross: 'Right Angle Cross of Consciousness',
  
  centers: [
    { name: 'head', defined: true, gates: [64, 61, 63], connectedChannels: ['64-47', '61-24', '63-4'] },
    { name: 'ajna', defined: true, gates: [47, 24, 4, 17, 11], connectedChannels: ['47-64', '24-61', '4-63', '17-62', '11-56'] },
    { name: 'throat', defined: true, gates: [62, 23, 56, 16, 20], connectedChannels: ['62-17', '23-43', '56-11', '16-48', '20-57'] },
    { name: 'g_center', defined: false, gates: [], connectedChannels: [] },
    { name: 'heart', defined: false, gates: [], connectedChannels: [] },
    { name: 'spleen', defined: false, gates: [], connectedChannels: [] },
    { name: 'solar_plexus', defined: true, gates: [36, 22, 37, 6], connectedChannels: ['36-35', '22-12', '37-40', '6-59'] },
    { name: 'sacral', defined: false, gates: [], connectedChannels: [] },
    { name: 'root', defined: true, gates: [53, 60, 52, 19, 39, 41], connectedChannels: ['53-42', '60-3', '52-9', '19-49', '39-55', '41-30'] }
  ],
  
  gates: [
    { number: 64, line: 3, color: 1, activated: true, design: false, planet: 'Sun' },
    { number: 61, line: 2, color: 2, activated: true, design: true, planet: 'Earth' },
    { number: 63, line: 4, color: 1, activated: true, design: false, planet: 'Moon' },
    { number: 47, line: 1, color: 2, activated: true, design: true, planet: 'North Node' },
    { number: 24, line: 5, color: 1, activated: true, design: false, planet: 'South Node' },
    { number: 4, line: 6, color: 2, activated: true, design: true, planet: 'Mercury' },
    { number: 17, line: 2, color: 1, activated: true, design: false, planet: 'Venus' },
    { number: 43, line: 3, color: 2, activated: true, design: true, planet: 'Mars' },
    { number: 11, line: 4, color: 1, activated: true, design: false, planet: 'Jupiter' },
    { number: 56, line: 1, color: 2, activated: true, design: true, planet: 'Saturn' },
    { number: 36, line: 5, color: 1, activated: true, design: false, planet: 'Uranus' },
    { number: 35, line: 6, color: 2, activated: true, design: true, planet: 'Neptune' }
  ],
  
  channels: [
    { gates: [64, 47], defined: true, type: 'conscious', name: 'The Channel of Abstraction' },
    { gates: [61, 24], defined: true, type: 'unconscious', name: 'The Channel of Awareness' },
    { gates: [63, 4], defined: true, type: 'conscious', name: 'The Channel of Logic' },
    { gates: [17, 43], defined: true, type: 'both', name: 'The Channel of Acceptance' },
    { gates: [11, 56], defined: true, type: 'conscious', name: 'The Channel of Curiosity' },
    { gates: [36, 35], defined: true, type: 'unconscious', name: 'The Channel of Transitoriness' }
  ],
  
  planets: {
    personality: {
      Sun: { gate: 64, line: 3, degree: 354.5 },
      Earth: { gate: 63, line: 3, degree: 174.5 },
      Moon: { gate: 17, line: 2, degree: 45.3 },
      NorthNode: { gate: 47, line: 1, degree: 123.4 },
      SouthNode: { gate: 22, line: 1, degree: 303.4 },
      Mercury: { gate: 4, line: 6, degree: 342.1 },
      Venus: { gate: 43, line: 3, degree: 23.7 },
      Mars: { gate: 11, line: 4, degree: 67.2 },
      Jupiter: { gate: 56, line: 1, degree: 234.5 },
      Saturn: { gate: 36, line: 5, degree: 189.3 },
      Uranus: { gate: 59, line: 2, degree: 156.7 },
      Neptune: { gate: 35, line: 6, degree: 45.2 },
      Pluto: { gate: 61, line: 2, degree: 12.3 }
    },
    design: {
      Sun: { gate: 61, line: 2, degree: 264.5 },
      Earth: { gate: 62, line: 2, degree: 84.5 },
      Moon: { gate: 24, line: 5, degree: 312.3 },
      NorthNode: { gate: 4, line: 6, degree: 33.4 },
      SouthNode: { gate: 49, line: 6, degree: 213.4 },
      Mercury: { gate: 17, line: 2, degree: 252.1 },
      Venus: { gate: 11, line: 4, degree: 293.7 },
      Mars: { gate: 43, line: 3, degree: 337.2 },
      Jupiter: { gate: 35, line: 6, degree: 144.5 },
      Saturn: { gate: 56, line: 1, degree: 99.3 },
      Uranus: { gate: 60, line: 3, degree: 66.7 },
      Neptune: { gate: 36, line: 5, degree: 315.2 },
      Pluto: { gate: 58, line: 3, degree: 282.3 }
    }
  },
  
  calculatedAt: new Date().toISOString(),
  engineVersion: {
    primary: 'v2.0.0',
    secondary: 'v1.9.5',
    differences: []
  },
  confidence: 0.98
};

// Sample celebrity charts
const CELEBRITY_CHARTS = [
  { name: 'Albert Einstein', type: 'manifestor' as Chart['type'], profile: '5/1' as Chart['profile'] },
  { name: 'Marie Curie', type: 'projector' as Chart['type'], profile: '3/5' as Chart['profile'] },
  { name: 'Steve Jobs', type: 'manifestor' as Chart['type'], profile: '5/1' as Chart['profile'] },
  { name: 'Oprah Winfrey', type: 'manifesting_generator' as Chart['type'], profile: '6/2' as Chart['profile'] },
  { name: 'Leonardo da Vinci', type: 'generator' as Chart['type'], profile: '1/3' as Chart['profile'] }
];

export default function DemoPage() {
  const [currentChart, setCurrentChart] = useState<typeof DEMO_CHART>(DEMO_CHART);
  const [selectedCelebrity, setSelectedCelebrity] = useState(0);

  const randomizeChart = () => {
    const types: Chart['type'][] = ['generator', 'manifestor', 'projector', 'reflector', 'manifesting_generator'];
    const authorities: Chart['authority'][] = ['sacral', 'emotional', 'splenic', 'ego_manifested', 'self_projected'];
    const profiles: Chart['profile'][] = ['1/3', '1/4', '2/4', '2/5', '3/5', '3/6', '4/6', '5/1', '5/2', '6/2', '6/3'];
    
    const newChart: typeof DEMO_CHART = {
      ...currentChart,
      type: types[Math.floor(Math.random() * types.length)],
      authority: authorities[Math.floor(Math.random() * authorities.length)],
      profile: profiles[Math.floor(Math.random() * profiles.length)],
      centers: currentChart.centers.map(center => ({
        ...center,
        defined: Math.random() > 0.5
      })),
      gates: currentChart.gates.map(gate => ({
        ...gate,
        activated: Math.random() > 0.5
      }))
    };
    
    setCurrentChart(newChart);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Human Design Demo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore Human Design with famous historical figures. This is a demo to show the capabilities of our chart system.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart Display */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">{currentChart.name}</h2>
                <Button
                  onClick={randomizeChart}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Randomize
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{currentChart.birthData.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{currentChart.birthTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{currentChart.birthPlace}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{currentChart.type}</span>
                </div>
              </div>
              
              <Bodygraph chart={currentChart} />
            </Card>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Chart Details */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Chart Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{currentChart.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Authority</p>
                  <p className="font-medium">{currentChart.authority}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Strategy</p>
                  <p className="font-medium">{currentChart.strategy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Profile</p>
                  <p className="font-medium">{currentChart.profile}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Not-Self Theme</p>
                  <p className="font-medium">{currentChart.notSelf}</p>
                </div>
              </div>
            </Card>

            {/* Celebrity Charts */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Celebrity Charts
              </h3>
              <div className="space-y-2">
                {CELEBRITY_CHARTS.map((celebrity, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedCelebrity(index);
                      setCurrentChart({
                        ...DEMO_CHART,
                        name: celebrity.name,
                        type: celebrity.type,
                        profile: celebrity.profile
                      });
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCelebrity === index
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary/50'
                    }`}
                  >
                    <p className="font-medium">{celebrity.name}</p>
                    <p className="text-sm opacity-80">
                      {celebrity.type} • {celebrity.profile}
                    </p>
                  </button>
                ))}
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <h3 className="text-lg font-semibold mb-2">
                Ready for Your Chart?
              </h3>
              <p className="text-sm mb-4 opacity-90">
                Create your personalized Human Design chart and discover your unique blueprint.
              </p>
              <Button 
                className="w-full bg-white text-primary hover:bg-gray-100"
                onClick={() => window.location.href = '/chart/new'}
              >
                Create My Chart
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}