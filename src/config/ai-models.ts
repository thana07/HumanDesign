// AI Model Configuration
export const AI_MODELS = {
  // Experimental GPT-5 models (if available)
  'gpt-5-mini-2025-08-07': {
    name: 'GPT-5 Mini',
    description: 'Experimentelles kompaktes GPT-5 Modell',
    maxTokens: 1000,
    costPer1kTokens: 0.002, // Geschätzt
    speed: 'sehr schnell',
    quality: 'gut',
    fallback: 'gpt-4o-mini'
  },
  'gpt-5-nano-2025-08-07': {
    name: 'GPT-5 Nano',
    description: 'Ultra-kompaktes GPT-5 Modell',
    maxTokens: 800,
    costPer1kTokens: 0.001, // Geschätzt
    speed: 'extrem schnell',
    quality: 'basis',
    fallback: 'gpt-3.5-turbo'
  },
  
  // Standard OpenAI models (verified to exist)
  'gpt-4o-mini': {
    name: 'GPT-4o Mini',
    description: 'Optimiertes kleines GPT-4 Modell',
    maxTokens: 1000,
    costPer1kTokens: 0.00015,
    speed: 'schnell',
    quality: 'sehr gut',
    fallback: 'gpt-3.5-turbo'
  },
  'gpt-4': {
    name: 'GPT-4',
    description: 'Fortschrittlichstes Modell für komplexe Aufgaben',
    maxTokens: 2000,
    costPer1kTokens: 0.03,
    speed: 'langsam',
    quality: 'exzellent',
    fallback: 'gpt-4o-mini'
  },
  'gpt-3.5-turbo': {
    name: 'GPT-3.5 Turbo',
    description: 'Schnelles und günstiges Modell',
    maxTokens: 800,
    costPer1kTokens: 0.0005,
    speed: 'sehr schnell',
    quality: 'gut',
    fallback: null
  }
} as const;

export type ModelId = keyof typeof AI_MODELS;

// Empfohlene Modelle für verschiedene Use Cases
export const RECOMMENDED_MODELS = {
  // Für Human Design Analyse
  quickQuestion: 'gpt-5-nano-2025-08-07', // Schnelle, einfache Fragen
  deepAnalysis: 'gpt-4',                  // Tiefe Analysen
  standard: 'gpt-5-mini-2025-08-07',      // Standard Anfragen
  budget: 'gpt-3.5-turbo'                 // Budget-Option
};

// Helper function to get model config with fallback
export function getModelConfig(modelId: string) {
  const config = AI_MODELS[modelId as ModelId];
  
  if (!config && modelId.includes('gpt-5')) {
    // If GPT-5 model not in list, assume it's experimental
    console.log(`Experimental model ${modelId} detected, using default config`);
    return {
      name: modelId,
      description: 'Experimentelles Modell',
      maxTokens: 1000,
      costPer1kTokens: 0.002,
      speed: 'unbekannt',
      quality: 'experimentell',
      fallback: 'gpt-4o-mini'
    };
  }
  
  return config || AI_MODELS['gpt-3.5-turbo'];
}

// System prompts optimized for different models
export const SYSTEM_PROMPTS = {
  'gpt-5': `Du bist ein präziser Human Design Experte. Nutze deine erweiterten Fähigkeiten für tiefe Analysen.`,
  'gpt-4': `Du bist ein erfahrener Human Design Coach mit tiefem Verständnis für komplexe Zusammenhänge.`,
  'gpt-3.5': `Du bist ein hilfsbereiter Human Design Berater. Gib klare und praktische Ratschläge.`,
  'default': `Du bist ein Human Design Coach. Hilf Menschen, ihr wahres Selbst zu verstehen.`
};

export function getSystemPromptForModel(modelId: string): string {
  if (modelId.includes('gpt-5')) return SYSTEM_PROMPTS['gpt-5'];
  if (modelId.includes('gpt-4')) return SYSTEM_PROMPTS['gpt-4'];
  if (modelId.includes('gpt-3.5')) return SYSTEM_PROMPTS['gpt-3.5'];
  return SYSTEM_PROMPTS['default'];
}