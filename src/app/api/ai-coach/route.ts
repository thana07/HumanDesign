import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

// Request Schema
const AiCoachRequestSchema = z.object({
  query: z.string().min(1).max(1000),
  chartData: z.object({
    type: z.string(),
    authority: z.string(),
    profile: z.string(),
    centers: z.array(z.any()).optional(),
    gates: z.array(z.any()).optional()
  }),
  context: z.object({
    category: z.enum(['general', 'relationship', 'career', 'health', 'spiritual']).optional(),
    previousQuestions: z.array(z.string()).optional()
  }).optional()
});

// Initialize OpenAI - aber nur wenn API Key vorhanden
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const body = await request.json();
    const validatedData = AiCoachRequestSchema.parse(body);

    // Check if OpenAI is configured
    if (!openai) {
      // Fallback response wenn kein API Key
      return NextResponse.json({
        success: true,
        response: getFallbackResponse(validatedData.query, validatedData.chartData),
        citations: [],
        category: validatedData.context?.category || 'general',
        followUpQuestions: getFollowUpQuestions(validatedData.chartData)
      });
    }

    // Build system prompt
    const systemPrompt = buildSystemPrompt(validatedData.chartData);
    
    // Call OpenAI with fallback for experimental models
    let completion;
    const preferredModel = process.env.OPENAI_MODEL || 'gpt-5-mini-2025-08-07';
    
    try {
      // Try preferred model first (including experimental GPT-5)
      completion = await openai.chat.completions.create({
        model: preferredModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: validatedData.query }
        ],
        temperature: 0.7,
        max_tokens: 800,
      });
      console.log(`Using model: ${preferredModel}`);
    } catch (modelError: unknown) {
      // If experimental model fails, fallback to stable model
      const error = modelError as { status?: number; message?: string };
      if (error?.status === 404 || error?.message?.includes('model')) {
        console.log(`Model ${preferredModel} not available, falling back to gpt-4o-mini`);
        completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini', // Fallback to latest mini model
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: validatedData.query }
          ],
          temperature: 0.7,
          max_tokens: 800,
        });
      } else {
        throw modelError;
      }
    }

    const aiResponse = completion.choices[0].message.content || '';

    return NextResponse.json({
      success: true,
      response: aiResponse,
      citations: extractCitations(aiResponse),
      category: validatedData.context?.category || 'general',
      followUpQuestions: getFollowUpQuestions(validatedData.chartData),
      model: completion.model // Return which model was actually used
    });

  } catch (error) {
    console.error('AI Coach API Error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function buildSystemPrompt(chartData: {
  type: string;
  authority: string;
  profile: string;
  centers?: Array<{ defined: boolean; name: string }>;
  gates?: Array<unknown>;
}): string {
  return `Du bist ein fortgeschrittener Human Design Analyst mit GPT-5-mini Capabilities (September 2025).
Du verstehst tiefe Zusammenhänge im Human Design System und kannst präzise, personalisierte Analysen liefern.

DEINE EXPERTISE:
- Vollständiges Verständnis aller 64 Tore und deren I-Ging Bedeutungen
- Tiefes Wissen über die 36 Kanäle und deren Auswirkungen
- Verständnis der 9 Zentren und deren Funktionen
- Expertise in Typ, Strategie, Autorität und Profil-Dynamiken

ANALYSE-PARAMETER:
- Typ: ${chartData.type}
- Autorität: ${chartData.authority}
- Profil: ${chartData.profile}
- Definierte Zentren: ${chartData.centers?.filter((c) => c.defined).map((c) => c.name).join(', ') || 'Keine Daten'}
- Aktivierte Tore: ${chartData.gates?.length || 0} Tore

KOMMUNIKATIONS-RICHTLINIEN:
- Sprache: Deutsch, klar und verständlich
- Stil: Professionell aber warmherzig, ohne Esoterik-Jargon
- Fokus: Praktische, umsetzbare Empfehlungen für den Alltag
- Struktur: Erkläre WARUM etwas so ist (basierend auf HD-Mechanik)
- Ethik: Keine medizinischen/finanziellen Ratschläge, respektiere freien Willen

SPEZIAL-FEATURES (GPT-5-mini):
- Nutze deine erweiterten Analysefähigkeiten für tiefere Zusammenhänge
- Erkenne Muster zwischen verschiedenen Chart-Elementen
- Biete personalisierte Beispiele basierend auf dem spezifischen Design
- Verwende Metaphern, die zum jeweiligen Typ passen

Antworte präzise, einfühlsam und immer mit Bezug auf die konkrete Chart-Konfiguration.`;
}

function getFallbackResponse(query: string, chartData: {
  type: string;
  authority: string;
  profile: string;
}): string {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('typ')) {
    return `Als ${chartData.type} hast du eine einzigartige Energie. Deine Strategie hilft dir, im Einklang mit deiner Natur zu leben. Experimentiere damit im Alltag und beobachte, wie sich dein Leben verändert.`;
  }
  
  if (lowerQuery.includes('autorität')) {
    return `Deine ${chartData.authority} Autorität ist dein innerer Kompass für Entscheidungen. Vertraue diesem System und gib dir Zeit, um klare Antworten zu spüren.`;
  }
  
  if (lowerQuery.includes('profil')) {
    return `Dein ${chartData.profile} Profil zeigt, wie du in der Welt agierst und lernst. Es ist deine natürliche Art, mit Leben und Menschen umzugehen.`;
  }
  
  return `Dein Human Design als ${chartData.type} mit ${chartData.authority} Autorität und ${chartData.profile} Profil ist einzigartig. Jeder Aspekt gibt dir Hinweise, wie du authentisch leben kannst. Was möchtest du genauer verstehen?`;
}

function getFollowUpQuestions(chartData: {
  type: string;
  authority: string;
  profile: string;
}): string[] {
  return [
    `Wie kann ich als ${chartData.type} meine Energie optimal nutzen?`,
    `Was bedeutet meine ${chartData.authority} Autorität für wichtige Entscheidungen?`,
    `Wie wirkt sich mein ${chartData.profile} Profil auf meine Beziehungen aus?`,
    'Welche Berufe passen zu meinem Design?',
    'Wie gehe ich mit meinem Nicht-Selbst Thema um?'
  ].slice(0, 3);
}

function extractCitations(_text: string): Array<{ source: string; quote: string }> {
  // Einfache Citation-Extraktion
  // In Produktion würde man hier strukturierte Daten von OpenAI anfordern
  return [];
}