import { Chart, BirthData, RelationshipAnalysis } from '@/types/human-design';
import { HDCalculator } from '@/lib/hd-engine/calculator';
import { HDCalculatorService } from './hd-calculator';

export class HDService {
  private static instance: HDService;
  private primaryEngine: HDCalculator | null = null;
  private fallbackEngine: HDCalculatorService;

  private constructor() {
    this.fallbackEngine = HDCalculatorService.getInstance();
  }

  static getInstance(): HDService {
    if (!HDService.instance) {
      HDService.instance = new HDService();
    }
    return HDService.instance;
  }

  async calculateChart(birthData: BirthData): Promise<{
    chart: Chart;
    crossCheck: {
      differences: string[];
      confidence: number;
    };
  }> {
    try {
      // Try primary engine first
      this.primaryEngine = new HDCalculator(birthData);
      const primaryChart = await this.primaryEngine.calculate();
      
      // Cross-check with fallback engine
      const fallbackChart = await this.fallbackEngine.calculateChart(birthData);
      
      // Compare results
      const differences = this.compareCharts(primaryChart, fallbackChart);
      
      // Calculate confidence based on differences
      const confidence = this.calculateConfidence(differences, birthData.timeAccuracy);
      
      // Use primary chart but note differences
      const finalChart = {
        ...primaryChart,
        engineVersion: {
          primary: 'hd-engine-v1',
          secondary: 'fallback-simulator',
          differences
        },
        confidence
      };
      
      return {
        chart: finalChart,
        crossCheck: {
          differences,
          confidence
        }
      };
    } catch (error) {
      console.error('Primary engine failed, using fallback:', error);
      
      // Fallback to simulator if primary fails
      const chart = await this.fallbackEngine.calculateChart(birthData);
      return {
        chart,
        crossCheck: {
          differences: ['Primary engine unavailable'],
          confidence: 0.7
        }
      };
    }
  }

  async analyzeRelationship(chartAId: string, chartBId: string): Promise<RelationshipAnalysis> {
    // For now, return a simulated analysis
    // In production, this would fetch charts from DB and analyze
    
    const analysis: RelationshipAnalysis = {
      id: this.generateId(),
      chartA: chartAId,
      chartB: chartBId,
      
      compatibility: {
        overall: 75,
        factors: [
          {
            category: 'Energetic Compatibility',
            score: 80,
            description: 'Strong electromagnetic connection through defined channels',
            impact: 'positive'
          },
          {
            category: 'Communication',
            score: 70,
            description: 'Different authorities require patience and understanding',
            impact: 'neutral'
          },
          {
            category: 'Decision Making',
            score: 65,
            description: 'Complementary strategies can create harmony',
            impact: 'positive'
          },
          {
            category: 'Emotional Dynamics',
            score: 85,
            description: 'Balanced emotional centers create stability',
            impact: 'positive'
          }
        ]
      },
      
      dynamics: {
        electromagnetic: [
          {
            channel: '34-20',
            description: 'Channel of Charisma - Creates magnetic attraction'
          }
        ],
        compromise: [
          {
            channel: '36-35',
            description: 'Channel of Transitoriness - Shared experiences'
          }
        ],
        dominance: [
          {
            channel: '21-45',
            person: 'A',
            description: 'Channel of Money - Person A has material control'
          }
        ],
        companionship: [
          {
            channel: '1-8',
            description: 'Channel of Inspiration - Mutual creative support'
          }
        ]
      },
      
      strengths: [
        'Complementary energy types create balance',
        'Strong sacral connection enhances intimacy',
        'Different perspectives enrich decision-making'
      ],
      
      challenges: [
        'Different rhythms may require adjustment',
        'Communication styles need conscious bridging',
        'Emotional waves require patience'
      ],
      
      recommendations: [
        'Honor each other\'s strategy and authority',
        'Create space for individual expression',
        'Practice active listening during decisions',
        'Celebrate your differences as strengths'
      ],
      
      analyzedAt: new Date().toISOString()
    };
    
    return analysis;
  }

  async calculateTransit(chartId: string, date: Date): Promise<{
    chartId: string;
    date: string;
    activatedGates: number[];
    theme: string;
    advice: string;
  }> {
    // Calculate current planetary transits
    // This would use ephemeris data for the given date
    
    const transitData = {
      chartId,
      date: date.toISOString(),
      activatedGates: [1, 2, 3, 4, 5], // Simulated
      theme: 'Time for new beginnings',
      advice: 'Follow your strategy during this transit period'
    };
    
    return transitData;
  }

  private compareCharts(chart1: Chart, chart2: Chart): string[] {
    const differences: string[] = [];
    
    if (chart1.type !== chart2.type) {
      differences.push(`Type: ${chart1.type} vs ${chart2.type}`);
    }
    
    if (chart1.authority !== chart2.authority) {
      differences.push(`Authority: ${chart1.authority} vs ${chart2.authority}`);
    }
    
    if (chart1.profile !== chart2.profile) {
      differences.push(`Profile: ${chart1.profile} vs ${chart2.profile}`);
    }
    
    // Compare defined centers
    const centers1 = chart1.centers.filter(c => c.defined).map(c => c.name).sort();
    const centers2 = chart2.centers.filter(c => c.defined).map(c => c.name).sort();
    
    if (JSON.stringify(centers1) !== JSON.stringify(centers2)) {
      differences.push(`Defined centers differ`);
    }
    
    // Compare gate counts
    const gateCount1 = chart1.gates.length;
    const gateCount2 = chart2.gates.length;
    
    if (Math.abs(gateCount1 - gateCount2) > 3) {
      differences.push(`Gate count: ${gateCount1} vs ${gateCount2}`);
    }
    
    return differences;
  }

  private calculateConfidence(differences: string[], timeAccuracy: string): number {
    let baseConfidence = 1.0;
    
    // Reduce confidence based on time accuracy
    if (timeAccuracy === 'approximate') {
      baseConfidence = 0.85;
    } else if (timeAccuracy === 'unknown') {
      baseConfidence = 0.60;
    }
    
    // Reduce confidence based on differences
    const reductionPerDifference = 0.05;
    const confidenceReduction = Math.min(differences.length * reductionPerDifference, 0.3);
    
    return Math.max(0.5, baseConfidence - confidenceReduction);
  }

  private generateId(): string {
    return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}