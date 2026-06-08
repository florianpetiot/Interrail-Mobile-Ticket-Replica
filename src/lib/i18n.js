export const translations = {
  fr: {
    fahrkarte: "Billet",
    planer: "Planificateur",
    meineReise: "Mon Voyage",
    meinPass: "Mon Pass",
    mehr: "Plus",
    journeyLabel: "Uniquement avec le Pass Îles Grecques",
    rotateTitle: "Veuillez tourner votre appareil",
    rotateDesc: "Cette application est optimisée pour le mode portrait. Veuillez remettre votre téléphone en orientation portrait pour continuer.",
    pwaToastTitle: "Plein écran sur iPhone",
    pwaToastDesc: "Touchez l'icône de partage 📤 dans Safari, puis sélectionnez « Sur l'écran d'accueil » ➕ pour l'installer et l'ouvrir en plein écran."
  },
  en: {
    fahrkarte: "Ticket",
    planer: "Planner",
    meineReise: "My Trip",
    meinPass: "My Pass",
    mehr: "More",
    journeyLabel: "Only with the Greek Islands Pass",
    rotateTitle: "Please rotate your device",
    rotateDesc: "This application is optimized for portrait mode. Please rotate your phone back to portrait orientation to continue.",
    pwaToastTitle: "Fullscreen on iPhone",
    pwaToastDesc: "Tap the share icon 📤 in Safari, then select 'Add to Home Screen' ➕ to install and open it in fullscreen standalone mode."
  },
  de: {
    fahrkarte: "Fahrkarte",
    planer: "Planer",
    meineReise: "Meine Reise",
    meinPass: "Mein Pass",
    mehr: "Mehr",
    journeyLabel: "Nur mit dem Griechische Inseln Pass",
    rotateTitle: "Bitte drehen Sie Ihr Gerät",
    rotateDesc: "Diese Anwendung ist für das Hochformat optimiert. Bitte drehen Sie Ihr Telefon ins Hochformat zurück, um fortzufahren.",
    pwaToastTitle: "Vollbild auf dem iPhone",
    pwaToastDesc: "Tippen Sie auf das Teilen-Symbol 📤 in Safari und wählen Sie 'Zum Home-Bildschirm' ➕, um es als Vollbild-App zu öffnen."
  },
  pl: {
    fahrkarte: "Bilet",
    planer: "Planer",
    meineReise: "Moja podróż",
    meinPass: "Mój bilet",
    mehr: "Więcej",
    journeyLabel: "Tylko z karnetem na wyspy greckie",
    rotateTitle: "Proszę obrócić urządzenie",
    rotateDesc: "Ta aplikacja jest zoptymalizowana pod kątem trybu pionowego. Proszę obrócić telefon z powrotem do orientacji pionowej, aby kontynuować.",
    pwaToastTitle: "Pełny ekran na iPhone",
    pwaToastDesc: "Dotknij ikony udostępniania 📤 w Safari i wybierz „Dodaj do ekranu głównego” ➕, aby otworzyć na pełnym ekranie."
  },
  nl: {
    fahrkarte: "Ticket",
    planer: "Planner",
    meineReise: "Mijn reis",
    meinPass: "Mijn pas",
    mehr: "Meer",
    journeyLabel: "Alleen met de Griekse Eilanden Pass",
    rotateTitle: "Draai uw apparaat alstublieft",
    rotateDesc: "Deze applicatie is geoptimaliseerd voor portretmodus. Draai uw telefoon terug naar portretstand om door te gaan.",
    pwaToastTitle: "Volledig scherm op iPhone",
    pwaToastDesc: "Tik op het deelicoon 📤 in Safari en kies 'Zet op beginscherm' ➕ om het op te starten in volledig scherm."
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
