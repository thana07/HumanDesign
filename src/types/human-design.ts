import { z } from 'zod';

// Enums für Human Design Komponenten
export const CenterType = z.enum([
  'head',
  'ajna',
  'throat',
  'g_center',
  'heart',
  'spleen',
  'solar_plexus',
  'sacral',
  'root'
]);

export const AuthorityType = z.enum([
  'emotional',
  'sacral',
  'splenic',
  'ego_manifested',
  'ego_projected',
  'self_projected',
  'lunar',
  'mental',
  'none'
]);

export const TypeEnum = z.enum([
  'manifestor',
  'generator',
  'manifesting_generator',
  'projector',
  'reflector'
]);

export const ProfileType = z.enum([
  '1/3', '1/4', '2/4', '2/5', '3/5', '3/6',
  '4/1', '4/6', '5/1', '5/2', '6/2', '6/3'
]);

// Schemas für Geburtsangaben
export const BirthDataSchema = z.object({
  date: z.string(), // ISO date string
  time: z.string(),
  timeAccuracy: z.enum(['exact', 'approximate', 'unknown']),
  location: z.object({
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
    name: z.string(),
    timezone: z.string()
  })
});

// Gate Schema
export const GateSchema = z.object({
  number: z.number().min(1).max(64),
  line: z.number().min(1).max(6),
  color: z.number().min(1).max(6).optional(),
  tone: z.number().min(1).max(6).optional(),
  base: z.number().min(1).max(5).optional(),
  activated: z.boolean(),
  planet: z.string(),
  design: z.boolean() // true = Design (rot), false = Personality (schwarz)
});

// Channel Schema
export const ChannelSchema = z.object({
  gates: z.tuple([z.number(), z.number()]),
  defined: z.boolean(),
  type: z.enum(['conscious', 'unconscious', 'both']),
  name: z.string()
});

// Center Schema
export const CenterSchema = z.object({
  name: CenterType,
  defined: z.boolean(),
  gates: z.array(z.number()),
  connectedChannels: z.array(z.string())
});

// Vollständiges Chart Schema
export const ChartSchema = z.object({
  id: z.string(),
  userId: z.string(),
  birthData: BirthDataSchema,
  
  // Grundlegende HD Eigenschaften
  type: TypeEnum,
  authority: AuthorityType,
  profile: ProfileType,
  strategy: z.string(),
  notSelf: z.string(),
  incarnationCross: z.string(),
  
  // Detaillierte Komponenten
  centers: z.array(CenterSchema),
  gates: z.array(GateSchema),
  channels: z.array(ChannelSchema),
  
  // Planetare Positionen
  planets: z.object({
    personality: z.record(z.string(), z.object({
      gate: z.number(),
      line: z.number(),
      degree: z.number()
    })),
    design: z.record(z.string(), z.object({
      gate: z.number(),
      line: z.number(),
      degree: z.number()
    }))
  }),
  
  // Metadaten
  calculatedAt: z.string(),
  engineVersion: z.object({
    primary: z.string(),
    secondary: z.string(),
    differences: z.array(z.string()).optional()
  }),
  confidence: z.number().min(0).max(1)
});

// Relationship Analysis Schema
export const RelationshipAnalysisSchema = z.object({
  id: z.string(),
  chartA: z.string(),
  chartB: z.string(),
  
  compatibility: z.object({
    overall: z.number().min(0).max(100),
    factors: z.array(z.object({
      category: z.string(),
      score: z.number(),
      description: z.string(),
      impact: z.enum(['positive', 'neutral', 'challenging'])
    }))
  }),
  
  dynamics: z.object({
    electromagnetic: z.array(z.object({
      channel: z.string(),
      description: z.string()
    })),
    compromise: z.array(z.object({
      channel: z.string(),
      description: z.string()
    })),
    dominance: z.array(z.object({
      channel: z.string(),
      person: z.enum(['A', 'B']),
      description: z.string()
    })),
    companionship: z.array(z.object({
      channel: z.string(),
      description: z.string()
    }))
  }),
  
  strengths: z.array(z.string()),
  challenges: z.array(z.string()),
  recommendations: z.array(z.string()),
  
  analyzedAt: z.string()
});

// Transit Schema
export const TransitSchema = z.object({
  chartId: z.string(),
  date: z.string(),
  planets: z.record(z.string(), z.object({
    gate: z.number(),
    line: z.number(),
    degree: z.number()
  })),
  activatedGates: z.array(z.number()),
  activatedChannels: z.array(z.string()),
  theme: z.string(),
  advice: z.string()
});

// AI Coach Response Schema
export const AICoachResponseSchema = z.object({
  query: z.string(),
  response: z.string(),
  citations: z.array(z.object({
    source: z.string(),
    reference: z.string(),
    confidence: z.number()
  })),
  category: z.enum(['general', 'relationship', 'career', 'health', 'spiritual']),
  followUpQuestions: z.array(z.string())
});

// Types für TypeScript
export type BirthData = z.infer<typeof BirthDataSchema>;
export type Chart = z.infer<typeof ChartSchema>;
export type Gate = z.infer<typeof GateSchema>;
export type Channel = z.infer<typeof ChannelSchema>;
export type Center = z.infer<typeof CenterSchema>;
export type RelationshipAnalysis = z.infer<typeof RelationshipAnalysisSchema>;
export type Transit = z.infer<typeof TransitSchema>;
export type AICoachResponse = z.infer<typeof AICoachResponseSchema>;
export type Authority = z.infer<typeof AuthorityType>;
export type HDType = z.infer<typeof TypeEnum>;
export type Profile = z.infer<typeof ProfileType>;