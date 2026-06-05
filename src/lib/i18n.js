export const translations = {
  fr: {
    fahrkarte: "Billet",
    planer: "Planificateur",
    meineReise: "Mon Voyage",
    meinPass: "Mon Pass",
    mehr: "Plus",
    journeyLabel: "Uniquement avec le Pass Îles Grecques",
    rotateTitle: "Veuillez tourner votre appareil",
    rotateDesc: "Cette application est optimisée pour le mode portrait. Veuillez remettre votre téléphone en orientation portrait pour continuer."
  },
  en: {
    fahrkarte: "Ticket",
    planer: "Planner",
    meineReise: "My Trip",
    meinPass: "My Pass",
    mehr: "More",
    journeyLabel: "Only with the Greek Islands Pass",
    rotateTitle: "Please rotate your device",
    rotateDesc: "This application is optimized for portrait mode. Please rotate your phone back to portrait orientation to continue."
  },
  de: {
    fahrkarte: "Fahrkarte",
    planer: "Planer",
    meineReise: "Meine Reise",
    meinPass: "Mein Pass",
    mehr: "Mehr",
    journeyLabel: "Nur mit dem Griechische Inseln Pass",
    rotateTitle: "Bitte drehen Sie Ihr Gerät",
    rotateDesc: "Diese Anwendung ist für das Hochformat optimiert. Bitte drehen Sie Ihr Telefon ins Hochformat zurück, um fortzufahren."
  },
  pl: {
    fahrkarte: "Bilet",
    planer: "Planer",
    meineReise: "Moja podróż",
    meinPass: "Mój bilet",
    mehr: "Więcej",
    journeyLabel: "Tylko z karnetem na wyspy greckie",
    rotateTitle: "Proszę obrócić urządzenie",
    rotateDesc: "Ta aplikacja jest zoptymalizowana pod kątem trybu pionowego. Proszę obrócić telefon z powrotem do orientacji pionowej, aby kontynuować."
  },
  nl: {
    fahrkarte: "Ticket",
    planer: "Planner",
    meineReise: "Mijn reis",
    meinPass: "Mijn pas",
    mehr: "Meer",
    journeyLabel: "Alleen met de Griekse Eilanden Pass",
    rotateTitle: "Draai uw apparaat alstublieft",
    rotateDesc: "Deze applicatie is geoptimaliseerd voor portretmodus. Draai uw telefoon terug naar portretstand om door te gaan."
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
