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

  // Long continuous text to avoid cuts at pattern boundaries
  let watermarkRepeatedText = $derived(() => {
    const full = watermarkText();
    const short = shortText();
    return `${full} / ${short} / ${full} / ${short} / ${full} / ${short} / ${full}`;
  });

  // Generate smooth horizontal security waves tilted at -16 degrees to match text rotation
  function getHorizontalWaveA(i) {
    const yBase = i * 22 - 10; // Espacement de 22px pour bien répartir les 13 vagues sur les 180px de haut
    const amp = 12; // Amplitude ajustée pour qu'elles se touchent/chevauchent légèrement
    const freq = 0.055; // Longueur d'onde plus grande (fréquence plus basse)
    const phaseOffset = 0; // Constant phase for Group A to keep rows parallel
    const slantFactor = 0.325; // Inclinaison augmentée
    
    let path = '';
    for (let x = 160; x <= 360; x += 3) {
      const y = yBase - (x - 160) * slantFactor + Math.sin(x * freq + phaseOffset) * amp;
      path += (x === 160 ? 'M' : 'L') + ` ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    return path.trim();
  }

  function getHorizontalWaveB(i) {
    const yBase = i * 22 - 10;
    const amp = 12;
    const freq = 0.055;
    const phaseOffset = Math.PI; // Constant opposite phase for Group B to keep crossing rows parallel
    const slantFactor = 0.325;
    
    let path = '';
    for (let x = 160; x <= 360; x += 3) {
      const y = yBase - (x - 160) * slantFactor + Math.sin(x * freq + phaseOffset) * amp;
      path += (x === 160 ? 'M' : 'L') + ` ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    return path.trim();
  }
</script>

<div class="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 rounded-b-2xl">
  <svg viewBox="0 0 350 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <!-- Linear gradient: solid grey for the right 70%, fades to transparent on the left 30% (starts fading 3/4 of the way to the left) -->
      <linearGradient id="wave-grad" x1="350" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#3b4963" stop-opacity="0.22" />
        <stop offset="70%" stop-color="#3b4963" stop-opacity="0.22" />
        <stop offset="100%" stop-color="#3b4963" stop-opacity="0.0" />
      </linearGradient>
    </defs>
    
    <!-- Dense repeating diagonal text background - Rotated group with staggered continuous text lines to prevent any cuts/doubled letters -->
    <g transform="rotate(-16 175 90)">
      {#each Array(16) as _, i}
        <text
          x={-250 - (i % 4) * 120}
          y={i * 25 - 90}
          font-family="system-ui, -apple-system, sans-serif" 
          font-size="12" 
          font-weight="400" 
          fill="#3b4963" 
          opacity="0.22" 
          letter-spacing="0.8"
        >
          {watermarkRepeatedText()}
        </text>
      {/each}
    </g>

    <!-- Guilloche wavy security lines - exactly 13 thick, -16-degree inclined horizontal waves on the right side fading out to the left -->
    <g fill="none" stroke="url(#wave-grad)">
      {#each Array(13) as _, i}
        <!-- Group A horizontal waves -->
        <path d={getHorizontalWaveA(i)} stroke-width="1.3" />
        <!-- Group B horizontal waves (intertwined with Group A) -->
        <path d={getHorizontalWaveB(i)} stroke-width="1.3" />
      {/each}
    </g>
  </svg>
</div>
