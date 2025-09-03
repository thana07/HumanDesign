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
const DEMO_CHART: Chart = {
  id: 'demo-einstein',
  userId: 'demo',
  name: 'Albert Einstein',
  birthDate: new Date('1879-03-14T11:30:00'),
  birthPlace: 'Ulm, Germany',
  birthTime: '11:30',
  
  type: 'manifestor',
  authority: 'Emotional Authority',
  strategy: 'To Inform',
  profile: '5/1',
  definition: 'Single Definition',
  notSelf: 'Anger',
  
  centers: [
    { name: 'head', defined: true },
    { name: 'ajna', defined: true },
    { name: 'throat', defined: true },
    { name: 'g_center', defined: false },
    { name: 'heart', defined: false },
    { name: 'spleen', defined: false },
    { name: 'solar_plexus', defined: true },
    { name: 'sacral', defined: false },
    { name: 'root', defined: true }
  ],
  
  gates: [
    { number: 64, line: 3, color: 'red', activated: true, design: false },
    { number: 61, line: 2, color: 'black', activated: true, design: true },
    { number: 63, line: 4, color: 'red', activated: true, design: false },
    { number: 47, line: 1, color: 'black', activated: true, design: true },
    { number: 24, line: 5, color: 'red', activated: true, design: false },
    { number: 4, line: 6, color: 'black', activated: true, design: true },
    { number: 17, line: 2, color: 'red', activated: true, design: false },
    { number: 43, line: 3, color: 'black', activated: true, design: true },
    { number: 11, line: 4, color: 'red', activated: true, design: false },
    { number: 56, line: 1, color: 'black', activated: true, design: true },
    { number: 36, line: 5, color: 'red', activated: true, design: false },
    { number: 35, line: 6, color: 'black', activated: true, design: true }
  ],
  
  channels: [
    { gates: [64, 47], defined: true, type: 'conscious' },
    { gates: [61, 24], defined: true, type: 'unconscious' },
    { gates: [63, 4], defined: true, type: 'conscious' },
    { gates: [17, 43], defined: true, type: 'generated' },
    { gates: [11, 56], defined: true, type: 'conscious' },
    { gates: [36, 35], defined: true, type: 'unconscious' }
  ],
  
  variables: {
    digestion: 'Consecutive',
    environment: 'Mountains',
    perspective: 'Personal',
    motivation: 'Innocence'
  },
  
  incarnationCross: 'Right Angle Cross of Consciousness',
  
  createdAt: new Date(),
  updatedAt: new Date()
};

// Sample celebrity charts
const CELEBRITY_CHARTS = [
  { name: 'Albert Einstein', type: 'Manifestor', profile: '5/1' },
  { name: 'Marie Curie', type: 'Projector', profile: '3/5' },
  { name: 'Steve Jobs', type: 'Manifestor', profile: '5/1' },
  { name: 'Oprah Winfrey', type: 'Manifesting Generator', profile: '6/2' },
  { name: 'Leonardo da Vinci', type: 'Generator', profile: '1/3' }
];

export default function DemoPage() {
  const [currentChart, setCurrentChart] = useState(DEMO_CHART);
  const [selectedCelebrity, setSelectedCelebrity] = useState(0);

  const randomizeChart = () => {
    const types = ['Generator', 'Manifestor', 'Projector', 'Reflector', 'Manifesting Generator'];
    const authorities = ['Sacral Authority', 'Emotional Authority', 'Splenic Authority', 'Ego Authority', 'Self-Projected Authority'];
    const profiles = ['1/3', '1/4', '2/4', '2/5', '3/5', '3/6', '4/6', '5/1', '5/2', '6/2', '6/3'];
    
    const newChart: Chart = {
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
                  <span>March 14, 1879</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>11:30 AM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>Ulm, Germany</span>
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
                  <p className="text-sm text-muted-foreground">Definition</p>
                  <p className="font-medium">{currentChart.definition}</p>
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