import { Chart, BirthData, Gate, Channel, Center } from '../types/human-design';

// Simulierter HD Calculator Service
export class HDCalculatorService {
  private static instance: HDCalculatorService;

  private constructor() {}

  static getInstance(): HDCalculatorService {
    if (!HDCalculatorService.instance) {
      HDCalculatorService.instance = new HDCalculatorService();
    }
    return HDCalculatorService.instance;
  }

  async calculateChart(birthData: BirthData): Promise<Chart> {
    // Simuliere Berechnungszeit
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generiere simulierte Daten basierend auf Geburtsdaten
    const seed = this.hashCode(JSON.stringify(birthData));
    const random = this.seededRandom(seed);

    // Bestimme HD Typ basierend auf "Zufall"
    const types = ['manifestor', 'generator', 'manifesting_generator', 'projector', 'reflector'] as const;
    const type = types[Math.floor(random() * types.length)];

    // Bestimme Autorität
    const authorities = ['emotional', 'sacral', 'splenic', 'ego_manifested', 'ego_projected', 'self_projected', 'lunar', 'mental', 'none'] as const;
    const authority = authorities[Math.floor(random() * authorities.length)];

    // Bestimme Profil
    const profiles = ['1/3', '1/4', '2/4', '2/5', '3/5', '3/6', '4/1', '4/6', '5/1', '5/2', '6/2', '6/3'] as const;
    const profile = profiles[Math.floor(random() * profiles.length)];

    // Generiere Gates
    const gates = this.generateGates(random);

    // Generiere Centers basierend auf Gates
    const centers = this.generateCenters(gates, random);

    // Generiere Channels basierend auf Gates
    const channels = this.generateChannels(gates);

    // Generiere Planetenpositionen
    const planets = this.generatePlanetaryPositions(random);

    const chart: Chart = {
      id: this.generateId(),
      userId: 'temp-user',
      birthData,
      type,
      authority,
      profile,
      strategy: this.getStrategy(type),
      notSelf: this.getNotSelf(type),
      incarnationCross: this.generateIncarnationCross(random),
      centers,
      gates,
      channels,
      planets,
      calculatedAt: new Date().toISOString(),
      engineVersion: {
        primary: 'simulator-v1',
        secondary: 'simulator-v1',
        differences: []
      },
      confidence: birthData.timeAccuracy === 'exact' ? 0.99 : 
                  birthData.timeAccuracy === 'approximate' ? 0.75 : 0.5
    };

    return chart;
  }

  private generateGates(random: () => number): Gate[] {
    const gates: Gate[] = [];
    const totalGates = 26 + Math.floor(random() * 10); // 26-36 aktivierte Gates

    const usedGates = new Set<number>();
    
    while (gates.length < totalGates) {
      const gateNumber = Math.floor(random() * 64) + 1;
      if (!usedGates.has(gateNumber)) {
        usedGates.add(gateNumber);
        
        const isDesign = random() > 0.5;
        gates.push({
          number: gateNumber,
          line: Math.floor(random() * 6) + 1,
          color: Math.floor(random() * 6) + 1,
          tone: Math.floor(random() * 6) + 1,
          base: Math.floor(random() * 5) + 1,
          activated: true,
          planet: this.getRandomPlanet(random),
          design: isDesign
        });
      }
    }

    return gates;
  }

  private generateCenters(gates: Gate[], random: () => number): Center[] {
    const centerDefinitions = {
      head: { gates: [64, 61, 63], name: 'head' as const },
      ajna: { gates: [47, 24, 4, 17, 43, 11], name: 'ajna' as const },
      throat: { gates: [62, 23, 56, 35, 12, 45, 33, 8, 31, 20, 16], name: 'throat' as const },
      g_center: { gates: [7, 1, 13, 25, 46, 2, 15, 10], name: 'g_center' as const },
      heart: { gates: [21, 40, 26, 51], name: 'heart' as const },
      spleen: { gates: [48, 57, 44, 50, 32, 28, 18], name: 'spleen' as const },
      solar_plexus: { gates: [36, 22, 37, 6, 49, 55, 30], name: 'solar_plexus' as const },
      sacral: { gates: [5, 14, 29, 59, 9, 3, 42, 27, 34], name: 'sacral' as const },
      root: { gates: [53, 60, 52, 19, 39, 41, 58, 38, 54], name: 'root' as const }
    };

    const centers: Center[] = [];
    const activatedGateNumbers = gates.map(g => g.number);

    for (const centerDef of Object.values(centerDefinitions)) {
      const centerGates = centerDef.gates.filter(g => activatedGateNumbers.includes(g));
      const isDefined = centerGates.length >= 2 || (centerGates.length === 1 && random() > 0.4);
      
      centers.push({
        name: centerDef.name,
        defined: isDefined,
        gates: centerGates,
        connectedChannels: []
      });
    }

    return centers;
  }

  private generateChannels(gates: Gate[]): Channel[] {
    const channelDefinitions = [
      [1, 8], [2, 14], [3, 60], [4, 63], [5, 15], [6, 59], [7, 31], [9, 52],
      [10, 20], [10, 34], [10, 57], [11, 56], [12, 22], [13, 33], [16, 48],
      [17, 62], [18, 58], [19, 49], [20, 34], [20, 57], [21, 45], [23, 43],
      [24, 61], [25, 51], [26, 44], [27, 50], [28, 38], [29, 46], [30, 41],
      [32, 54], [34, 57], [35, 36], [37, 40], [39, 55], [42, 53], [47, 64]
    ];

    const channels: Channel[] = [];
    const activatedGateNumbers = gates.map(g => g.number);

    for (const [gate1, gate2] of channelDefinitions) {
      const hasGate1 = activatedGateNumbers.includes(gate1);
      const hasGate2 = activatedGateNumbers.includes(gate2);

      if (hasGate1 && hasGate2) {
        const gate1Design = gates.find(g => g.number === gate1)?.design || false;
        const gate2Design = gates.find(g => g.number === gate2)?.design || false;
        
        let type: 'conscious' | 'unconscious' | 'both';
        if (gate1Design && gate2Design) {
          type = 'unconscious';
        } else if (!gate1Design && !gate2Design) {
          type = 'conscious';
        } else {
          type = 'both';
        }

        channels.push({
          gates: [gate1, gate2],
          defined: true,
          type,
          name: `${gate1}-${gate2}`
        });
      }
    }

    return channels;
  }

  private generatePlanetaryPositions(random: () => number) {
    const planetNames = ['Sun', 'Earth', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'North Node', 'South Node'];
    
    const personality: Record<string, { gate: number; line: number; degree: number }> = {};
    const design: Record<string, { gate: number; line: number; degree: number }> = {};

    for (const planet of planetNames) {
      personality[planet] = {
        gate: Math.floor(random() * 64) + 1,
        line: Math.floor(random() * 6) + 1,
        degree: random() * 360
      };
      design[planet] = {
        gate: Math.floor(random() * 64) + 1,
        line: Math.floor(random() * 6) + 1,
        degree: random() * 360
      };
    }

    return { personality, design };
  }

  private generateIncarnationCross(random: () => number): string {
    const crosses = [
      'Right Angle Cross of Planning',
      'Left Angle Cross of Separation',
      'Juxtaposition Cross of Listening',
      'Right Angle Cross of the Four Ways',
      'Left Angle Cross of Revolution'
    ];
    return crosses[Math.floor(random() * crosses.length)];
  }

  private getRandomPlanet(random: () => number): string {
    const planets = ['Sun', 'Earth', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
    return planets[Math.floor(random() * planets.length)];
  }

  private getStrategy(type: string): string {
    const strategies: Record<string, string> = {
      manifestor: 'Informiere bevor du handelst',
      generator: 'Warte darauf zu reagieren',
      manifesting_generator: 'Warte darauf zu reagieren, dann informiere',
      projector: 'Warte auf die Einladung',
      reflector: 'Warte einen Mondzyklus'
    };
    return strategies[type] || 'Unbekannt';
  }

  private getNotSelf(type: string): string {
    const notSelf: Record<string, string> = {
      manifestor: 'Wut',
      generator: 'Frustration',
      manifesting_generator: 'Frustration und Wut',
      projector: 'Verbitterung',
      reflector: 'Enttäuschung'
    };
    return notSelf[type] || 'Unbekannt';
  }

  private generateId(): string {
    return `chart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private seededRandom(seed: number): () => number {
    return function() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }
}