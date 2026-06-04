<script>
  let { 
    name = 'L.Elbs', 
    dob = '08-12-2004', 
    passNumber = '34CZYN', 
    classType = '2nd class', 
    passType = 'Interrail Greek Islands Pass', 
    validOn = '07-05-2026' 
  } = $props();

  // Build the exact repeating string matching the real ticket
  let watermarkText = $derived(() => {
    let dobDayMonth = '';
    if (dob) {
      const parts = dob.split('-');
      if (parts.length >= 2) {
        dobDayMonth = `${parts[0]}-${parts[1]}`;
      } else {
        dobDayMonth = dob;
      }
    }
    
    let cleanClass = classType || '2nd class';
    if (cleanClass.toLowerCase().includes('2nd class')) {
      cleanClass = '2ND CLASS';
    } else if (cleanClass.toLowerCase().includes('1st class')) {
      cleanClass = '1ST CLASS';
    }

    const cleanPassType = (passType || 'INTERRAIL GREEK ISLANDS PASS').toUpperCase();
    const cleanName = (name || 'L.ELBS').toUpperCase();
    const cleanPassNo = (passNumber || '34CZYN').toUpperCase();

    // Matches the ticket: "07-05-2026 / L. ELBS / 08-12 / 34CZYN / 2ND CLASS / INTERRAIL GREEK ISLANDS PASS"
    return `${validOn} / ${cleanName} / ${dobDayMonth} / ${cleanPassNo} / ${cleanClass} / ${cleanPassType}`;
  });

  // Short segment for denser repetition
  let shortText = $derived(() => {
    const cleanName = (name || 'L.ELBS').toUpperCase();
    let dobDayMonth = '';
    if (dob) {
      const parts = dob.split('-');
      if (parts.length >= 2) {
        dobDayMonth = `${parts[0]}-${parts[1]}`;
      } else {
        dobDayMonth = dob;
      }
    }
    const cleanPassNo = (passNumber || '34CZYN').toUpperCase();
    return `${cleanName} / ${dobDayMonth} / ${cleanPassNo}`;
  });
</script>

<div class="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 rounded-b-2xl">
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <!-- Tight repeating text tile with offset rows -->
      <pattern id="wm-text" width="700" height="112" patternUnits="userSpaceOnUse" patternTransform="rotate(-16)">
        <text x="0" y="18" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="700" fill="#3b4963" opacity="0.20" letter-spacing="0.8">
          {watermarkText()} / {shortText()} / {watermarkText()}
        </text>
        <text x="-175" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="700" fill="#3b4963" opacity="0.20" letter-spacing="0.8">
          {watermarkText()} / {shortText()} / {watermarkText()}
        </text>
        <text x="-350" y="74" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="700" fill="#3b4963" opacity="0.20" letter-spacing="0.8">
          {watermarkText()} / {shortText()} / {watermarkText()}
        </text>
        <text x="-525" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="700" fill="#3b4963" opacity="0.20" letter-spacing="0.8">
          {watermarkText()} / {shortText()} / {watermarkText()}
        </text>
      </pattern>
    </defs>
    
    <!-- Dense repeating diagonal text background -->
    <rect width="200%" height="200%" x="-200" y="-100" fill="url(#wm-text)" />

    <!-- Guilloche wavy security lines - concentrated on right half like the real ticket -->
    <!-- Group 1: Wide sinusoidal waves -->
    <g fill="none" stroke="#3b4963" opacity="0.13">
      <path d="M 100 5 C 160 -25, 220 55, 280 5 C 340 -25, 400 55, 460 5" stroke-width="0.5" />
      <path d="M 100 10 C 160 -20, 220 60, 280 10 C 340 -20, 400 60, 460 10" stroke-width="0.5" />
      <path d="M 100 15 C 160 -15, 220 65, 280 15 C 340 -15, 400 65, 460 15" stroke-width="0.5" />
      
      <path d="M 80 35 C 140 65, 200 5, 260 35 C 320 65, 380 5, 440 35 C 500 65, 560 5, 620 35" stroke-width="0.5" />
      <path d="M 80 40 C 140 70, 200 10, 260 40 C 320 70, 380 10, 440 40 C 500 70, 560 10, 620 40" stroke-width="0.5" />
      <path d="M 80 45 C 140 75, 200 15, 260 45 C 320 75, 380 15, 440 45 C 500 75, 560 15, 620 45" stroke-width="0.5" />
      
      <path d="M 60 65 C 130 35, 200 95, 270 65 C 340 35, 410 95, 480 65 C 550 35, 620 95, 690 65" stroke-width="0.5" />
      <path d="M 60 70 C 130 40, 200 100, 270 70 C 340 40, 410 100, 480 70 C 550 40, 620 100, 690 70" stroke-width="0.5" />
      <path d="M 60 75 C 130 45, 200 105, 270 75 C 340 45, 410 105, 480 75 C 550 45, 620 105, 690 75" stroke-width="0.5" />
      
      <path d="M 50 95 C 120 125, 190 65, 260 95 C 330 125, 400 65, 470 95 C 540 125, 610 65, 680 95" stroke-width="0.5" />
      <path d="M 50 100 C 120 130, 190 70, 260 100 C 330 130, 400 70, 470 100 C 540 130, 610 70, 680 100" stroke-width="0.5" />
      <path d="M 50 105 C 120 135, 190 75, 260 105 C 330 135, 400 75, 470 105 C 540 135, 610 75, 680 105" stroke-width="0.5" />
      
      <path d="M 40 125 C 110 95, 180 155, 250 125 C 320 95, 390 155, 460 125 C 530 95, 600 155, 670 125" stroke-width="0.5" />
      <path d="M 40 130 C 110 100, 180 160, 250 130 C 320 100, 390 160, 460 130 C 530 100, 600 160, 670 130" stroke-width="0.5" />
      <path d="M 40 135 C 110 105, 180 165, 250 135 C 320 105, 390 165, 460 135 C 530 105, 600 165, 670 135" stroke-width="0.5" />
    </g>

    <!-- Group 2: Counter-crossing wavy lines creating mesh effect on right side -->
    <g fill="none" stroke="#3b4963" opacity="0.10">
      <path d="M 120 0 C 180 40, 240 -20, 300 20 C 360 60, 420 -10, 480 30" stroke-width="0.4" />
      <path d="M 120 25 C 180 65, 240 5, 300 45 C 360 85, 420 15, 480 55" stroke-width="0.4" />
      <path d="M 120 50 C 180 90, 240 30, 300 70 C 360 110, 420 40, 480 80" stroke-width="0.4" />
      <path d="M 120 75 C 180 115, 240 55, 300 95 C 360 135, 420 65, 480 105" stroke-width="0.4" />
      <path d="M 120 100 C 180 140, 240 80, 300 120 C 360 160, 420 90, 480 130" stroke-width="0.4" />
      <path d="M 120 125 C 180 165, 240 105, 300 145 C 360 185, 420 115, 480 155" stroke-width="0.4" />
    </g>

    <!-- Group 3: Finer elliptical crossing loops on far right - the "knot" pattern visible in the reference -->
    <g fill="none" stroke="#3b4963" opacity="0.11">
      <ellipse cx="320" cy="40" rx="60" ry="25" stroke-width="0.35" transform="rotate(-10 320 40)" />
      <ellipse cx="310" cy="45" rx="55" ry="22" stroke-width="0.35" transform="rotate(10 310 45)" />
      <ellipse cx="350" cy="80" rx="65" ry="28" stroke-width="0.35" transform="rotate(-8 350 80)" />
      <ellipse cx="340" cy="85" rx="60" ry="25" stroke-width="0.35" transform="rotate(12 340 85)" />
      <ellipse cx="330" cy="120" rx="58" ry="24" stroke-width="0.35" transform="rotate(-12 330 120)" />
      <ellipse cx="320" cy="125" rx="55" ry="22" stroke-width="0.35" transform="rotate(8 320 125)" />
    </g>
  </svg>
</div>
