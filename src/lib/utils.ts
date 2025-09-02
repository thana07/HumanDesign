import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function formatTime(time: string): string {
  return time.split(':').slice(0, 2).join(':');
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function calculateAge(birthDate: Date | string): number {
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getTypeColor(type: string): string {
  const colors = {
    manifestor: 'bg-red-500',
    generator: 'bg-amber-500',
    manifesting_generator: 'bg-lime-500',
    projector: 'bg-cyan-500',
    reflector: 'bg-purple-500'
  };
  return colors[type as keyof typeof colors] || 'bg-gray-500';
}

export function getTypeGradient(type: string): string {
  const gradients = {
    manifestor: 'from-red-500 to-red-600',
    generator: 'from-amber-500 to-amber-600',
    manifesting_generator: 'from-lime-500 to-lime-600',
    projector: 'from-cyan-500 to-cyan-600',
    reflector: 'from-purple-500 to-purple-600'
  };
  return gradients[type as keyof typeof gradients] || 'from-gray-500 to-gray-600';
}

export function getAuthorityDescription(authority: string): string {
  const descriptions = {
    emotional: 'Emotionale Autorität - Warte auf emotionale Klarheit',
    sacral: 'Sakrale Autorität - Höre auf dein Bauchgefühl',
    splenic: 'Milz-Autorität - Vertraue deiner Intuition',
    ego_manifested: 'Ego-manifestierte Autorität - Handle aus deiner Willenskraft',
    ego_projected: 'Ego-projizierte Autorität - Sprich mit anderen über deine Entscheidungen',
    self_projected: 'Selbst-projizierte Autorität - Höre auf deine innere Stimme',
    lunar: 'Lunare Autorität - Warte einen Mondzyklus',
    mental: 'Mentale Autorität - Diskutiere mit deiner Umgebung',
    none: 'Keine innere Autorität - Reflektiere deine Umgebung'
  };
  return descriptions[authority as keyof typeof descriptions] || 'Unbekannte Autorität';
}

export function getStrategyDescription(type: string): string {
  const strategies = {
    manifestor: 'Informiere bevor du handelst',
    generator: 'Warte darauf zu reagieren',
    manifesting_generator: 'Warte darauf zu reagieren, dann informiere',
    projector: 'Warte auf die Einladung',
    reflector: 'Warte einen Mondzyklus'
  };
  return strategies[type as keyof typeof strategies] || 'Unbekannte Strategie';
}

export function getNotSelfDescription(type: string): string {
  const notSelf = {
    manifestor: 'Wut',
    generator: 'Frustration',
    manifesting_generator: 'Frustration und Wut',
    projector: 'Verbitterung',
    reflector: 'Enttäuschung'
  };
  return notSelf[type as keyof typeof notSelf] || 'Unbekannt';
}

export function parseTimeAccuracy(accuracy: string): string {
  const accuracyMap = {
    exact: 'Exakt',
    approximate: 'Ungefähr',
    unknown: 'Unbekannt'
  };
  return accuracyMap[accuracy as keyof typeof accuracyMap] || accuracy;
}

export function generateShareUrl(chartId: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/chart/share/${chartId}`;
  }
  return `/chart/share/${chartId}`;
}

export function calculateCompatibilityScore(
  factorScores: { score: number; weight: number }[]
): number {
  const totalWeight = factorScores.reduce((sum, f) => sum + f.weight, 0);
  const weightedSum = factorScores.reduce((sum, f) => sum + f.score * f.weight, 0);
  return Math.round((weightedSum / totalWeight) * 100) / 100;
}

export function getGateHexagram(gateNumber: number): string {
  // I-Ging Hexagramm Namen (vereinfacht)
  const hexagrams = [
    '', 'Das Schöpferische', 'Das Empfangende', 'Die Anfangsschwierigkeit', 'Die Jugendtorheit',
    'Das Warten', 'Der Streit', 'Das Heer', 'Das Zusammenhalten', 'Die Zähmungskraft des Kleinen',
    'Das Auftreten', 'Der Friede', 'Die Stockung', 'Die Gemeinschaft', 'Der Besitz von Großem',
    'Die Bescheidenheit', 'Die Begeisterung', 'Die Nachfolge', 'Die Arbeit am Verdorbenen', 'Die Annäherung',
    'Die Betrachtung', 'Das Durchbeißen', 'Die Anmut', 'Die Zersplitterung', 'Die Wiederkehr',
    'Die Unschuld', 'Die Zähmungskraft des Großen', 'Die Ernährung', 'Das Übergewicht des Großen', 'Das Abgründige',
    'Das Haftende', 'Die Einwirkung', 'Die Dauer', 'Der Rückzug', 'Die Macht des Großen',
    'Der Fortschritt', 'Die Verfinsterung des Lichts', 'Die Sippe', 'Der Gegensatz', 'Das Hemmnis',
    'Die Befreiung', 'Die Minderung', 'Die Mehrung', 'Der Durchbruch', 'Das Entgegenkommen',
    'Die Sammlung', 'Das Empordringen', 'Die Bedrängnis', 'Der Brunnen', 'Die Umwälzung',
    'Der Tiegel', 'Das Erregende', 'Das Stillehalten', 'Die Entwicklung', 'Das heiratende Mädchen',
    'Die Fülle', 'Der Wanderer', 'Das Sanfte', 'Das Heitere', 'Die Auflösung',
    'Die Beschränkung', 'Innere Wahrheit', 'Das Übergewicht des Kleinen', 'Nach der Vollendung', 'Vor der Vollendung'
  ];
  return hexagrams[gateNumber] || `Tor ${gateNumber}`;
}