export const translations = {
  fr: {
    fahrkarte: "Billet",
    planer: "Planificateur",
    meineReise: "Mon Voyage",
    meinPass: "Mon Pass",
    mehr: "Plus",
    journeyLabel: "Uniquement avec le Pass Îles Grecques"
  },
  en: {
    fahrkarte: "Ticket",
    planer: "Planner",
    meineReise: "My Trip",
    meinPass: "My Pass",
    mehr: "More",
    journeyLabel: "Only with the Greek Islands Pass"
  },
  de: {
    fahrkarte: "Fahrkarte",
    planer: "Planer",
    meineReise: "Meine Reise",
    meinPass: "Mein Pass",
    mehr: "Mehr",
    journeyLabel: "Nur mit dem Griechische Inseln Pass"
  },
  pl: {
    fahrkarte: "Bilet",
    planer: "Planer",
    meineReise: "Moja podróż",
    meinPass: "Mój bilet",
    mehr: "Więcej",
    journeyLabel: "Tylko z karnetem na wyspy greckie"
  },
  nl: {
    fahrkarte: "Ticket",
    planer: "Planner",
    meineReise: "Mijn reis",
    meinPass: "Mijn pas",
    mehr: "Meer",
    journeyLabel: "Alleen met de Griekse Eilanden Pass"
  }
};

export function getSystemLanguage() {
  if (typeof navigator === 'undefined') return 'en';
  // Retrieve the user's preferred language, extract the primary language code, and lowercase it
  const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase().split('-')[0];
  if (translations[lang]) {
    return lang;
  }
  return 'en'; // default fallback if language is unsupported
}
