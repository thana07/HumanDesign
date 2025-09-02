'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bodygraph } from '@/components/charts/bodygraph';
import { AiCoachChat } from '@/components/ai-coach/chat';
import { Chart, Gate, Center } from '@/types/human-design';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Share2, 
  MessageCircle, 
  Info,
  Calendar,
  User,
  Zap,
  Target,
  AlertTriangle
} from 'lucide-react';
import { 
  getTypeColor, 
  getAuthorityDescription, 
  getStrategyDescription,
  getNotSelfDescription,
  formatDate,
  formatTime
} from '@/lib/utils';
import toast from 'react-hot-toast';

export default function ChartViewPage() {
  const [chart, setChart] = useState<Chart | null>(null);
  const [selectedGate, setSelectedGate] = useState<Gate | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'gates' | 'centers' | 'coach'>('overview');

  useEffect(() => {
    // Load chart from localStorage (in production, fetch from database)
    const storedChart = localStorage.getItem('currentChart');
    if (storedChart) {
      setChart(JSON.parse(storedChart));
    }
  }, []);

  const handleShare = () => {
    if (chart) {
      const shareUrl = `${window.location.origin}/chart/share/${chart.id}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success('Share-Link wurde kopiert!');
    }
  };

  const handleExport = () => {
    toast.success('PDF-Export wird vorbereitet...');
    // Implement PDF export
  };

  if (!chart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Lade Chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dein Human Design Chart</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(chart.birthData.date)}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {formatTime(chart.birthData.time)}
                </span>
                <span className="flex items-center gap-1">
                  <Info className="w-4 h-4" />
                  Konfidenz: {Math.round(chart.confidence * 100)}%
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Teilen
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                PDF Export
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Bodygraph */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <Bodygraph
                  chart={chart}
                  onGateClick={setSelectedGate}
                  onCenterClick={setSelectedCenter}
                />
              </motion.div>
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              {/* Type Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${getTypeColor(chart.type)} flex items-center justify-center`}>
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Typ</h3>
                    <p className="text-2xl font-bold gradient-text">
                      {chart.type.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {getStrategyDescription(chart.type)}
                </p>
              </motion.div>

              {/* Authority Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Autorität</h3>
                    <p className="text-xl font-bold">{chart.authority}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {getAuthorityDescription(chart.authority)}
                </p>
              </motion.div>

              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="font-semibold mb-2">Profil</h3>
                <p className="text-2xl font-bold mb-2">{chart.profile}</p>
                <p className="text-sm text-muted-foreground">
                  Dein Profil zeigt, wie du in der Welt agierst und lernst.
                </p>
              </motion.div>

              {/* Not-Self Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Nicht-Selbst Thema</h3>
                    <p className="text-xl font-bold">{chart.notSelf}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {getNotSelfDescription(chart.type)}
                </p>
              </motion.div>

              {/* AI Coach Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  onClick={() => setActiveTab('coach')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Mit KI-Coach sprechen
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Tabs for detailed information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12"
          >
            <div className="flex gap-2 mb-6">
              {(['overview', 'gates', 'centers', 'coach'] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'overview' && 'Übersicht'}
                  {tab === 'gates' && `Tore (${chart.gates.filter(g => g.activated).length})`}
                  {tab === 'centers' && `Zentren (${chart.centers.filter(c => c.defined).length}/9)`}
                  {tab === 'coach' && 'KI Coach'}
                </Button>
              ))}
            </div>

            <div className="glass rounded-2xl p-6">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Dein Design im Überblick</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Strategie</h3>
                      <p className="text-muted-foreground">{chart.strategy}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Inkarnationskreuz</h3>
                      <p className="text-muted-foreground">{chart.incarnationCross}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'gates' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Aktivierte Tore</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {chart.gates.filter(g => g.activated).map((gate) => (
                      <div
                        key={`${gate.number}-${gate.line}`}
                        className="p-3 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors"
                        onClick={() => setSelectedGate(gate)}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${gate.design ? 'bg-red-500' : 'bg-black'}`} />
                          <span className="font-semibold">Tor {gate.number}.{gate.line}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{gate.planet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'centers' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Zentren</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {chart.centers.map((center) => (
                      <div
                        key={center.name}
                        className={`p-4 rounded-lg ${center.defined ? 'bg-blue-50 dark:bg-blue-950/20' : 'bg-gray-50 dark:bg-gray-950/20'}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-4 h-4 rounded ${center.defined ? 'bg-blue-500' : 'bg-gray-400'}`} />
                          <h3 className="font-semibold">
                            {center.name.replace('_', ' ').toUpperCase()}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {center.defined ? 'Definiert' : 'Offen'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Tore: {center.gates.join(', ') || 'Keine'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'coach' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">KI Coach</h2>
                  <AiCoachChat chart={chart} />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}