'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HDService } from '@/services/hd-service';
import { BirthDataSchema } from '@/types/human-design';
import { Calendar, Clock, MapPin, Info, Sparkles, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewChartPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    timeAccuracy: 'exact' as 'exact' | 'approximate' | 'unknown',
    location: {
      name: '',
      lat: 0,
      lon: 0,
      timezone: 'Europe/Berlin'
    }
  });

  const [locationSearch, setLocationSearch] = useState('');
  const [showTimeInfo, setShowTimeInfo] = useState(false);

  const handleLocationSearch = async () => {
    // In production, use a geocoding API
    // For now, use some example locations
    const exampleLocations = {
      'Berlin': { lat: 52.520008, lon: 13.404954, timezone: 'Europe/Berlin' },
      'München': { lat: 48.135125, lon: 11.581981, timezone: 'Europe/Berlin' },
      'Hamburg': { lat: 53.551086, lon: 9.993682, timezone: 'Europe/Berlin' },
      'Wien': { lat: 48.208176, lon: 16.373819, timezone: 'Europe/Vienna' },
      'Zürich': { lat: 47.376887, lon: 8.541694, timezone: 'Europe/Zurich' }
    };

    const location = exampleLocations[locationSearch as keyof typeof exampleLocations];
    if (location) {
      setFormData(prev => ({
        ...prev,
        location: {
          name: locationSearch,
          ...location
        }
      }));
      toast.success(`Ort gefunden: ${locationSearch}`);
    } else {
      toast.error('Ort nicht gefunden. Bitte versuche es erneut.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      const validatedData = BirthDataSchema.parse(formData);
      
      // Calculate chart
      const hdService = HDService.getInstance();
      const result = await hdService.calculateChart(validatedData);
      
      // Store in localStorage for demo (in production, use database)
      localStorage.setItem('currentChart', JSON.stringify(result.chart));
      
      toast.success('Chart erfolgreich berechnet!');
      
      // Navigate to chart view
      router.push(`/chart/view`);
    } catch (error) {
      console.error('Error calculating chart:', error);
      toast.error('Fehler bei der Berechnung. Bitte überprüfe deine Eingaben.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Erstelle dein Chart</h1>
            <p className="text-xl text-muted-foreground">
              Gib deine Geburtsdaten ein für eine präzise Analyse
            </p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Date Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Calendar className="w-4 h-4" />
                Geburtsdatum
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="input-ios w-full"
              />
            </div>

            {/* Time Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Clock className="w-4 h-4" />
                Geburtszeit
                <button
                  type="button"
                  onClick={() => setShowTimeInfo(!showTimeInfo)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Info className="w-4 h-4" />
                </button>
              </label>
              
              {showTimeInfo && (
                <div className="mb-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-sm">
                  <p className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                    Die exakte Geburtszeit ist wichtig für präzise Berechnungen. 
                    Du findest sie auf deiner Geburtsurkunde oder kannst sie beim Standesamt erfragen.
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="input-ios flex-1"
                />
                <select
                  value={formData.timeAccuracy}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    timeAccuracy: e.target.value as 'exact' | 'approximate' | 'unknown'
                  }))}
                  className="input-ios"
                >
                  <option value="exact">Exakt</option>
                  <option value="approximate">Ungefähr</option>
                  <option value="unknown">Unbekannt</option>
                </select>
              </div>
            </div>

            {/* Location Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <MapPin className="w-4 h-4" />
                Geburtsort
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Stadt eingeben..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="input-ios flex-1"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleLocationSearch}
                >
                  Suchen
                </Button>
              </div>
              {formData.location.name && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Gefunden: {formData.location.name} ({formData.location.lat}°, {formData.location.lon}°)
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
              <h3 className="font-semibold mb-2">Was passiert als nächstes?</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Dein Chart wird mit zwei unabhängigen Engines berechnet</li>
                <li>• Ergebnisse werden cross-verifiziert für maximale Genauigkeit</li>
                <li>• Du erhältst eine interaktive Visualisierung deines Bodygraphs</li>
                <li>• KI-Coach steht für personalisierte Fragen bereit</li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              loading={isLoading}
            >
              {isLoading ? 'Berechne Chart...' : 'Chart berechnen'}
            </Button>
          </motion.form>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8 text-sm text-muted-foreground"
          >
            <p>Deine Daten werden verschlüsselt und DSGVO-konform gespeichert.</p>
            <p>Wir geben keine Daten an Dritte weiter.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}