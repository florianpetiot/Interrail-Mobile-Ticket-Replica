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

  // Math functions to generate the 20 intertwined horizontal security waves on the right side
  function getHorizontalWaveA(i) {
    const yBase = i * 19;
    
    // Wave points with progressive phase offsets
    const y0 = yBase + Math.sin(i * 0.8) * 8;
    const y1 = yBase + Math.sin(i * 0.8 + 1.5) * 10;
    const y2 = yBase + Math.sin(i * 0.8 + 3.0) * 8;
    const y3 = yBase + Math.sin(i * 0.8 + 4.5) * 10;

    return `M 130 ${y0} ` +
           `C 185 ${y0 + 6}, 240 ${y1 - 6}, 250 ${y1} ` +
           `C 280 ${y1 + 6}, 310 ${y2 - 6}, 320 ${y2} ` +
           `C 330 ${y2 + 6}, 340 ${y3 - 6}, 350 ${y3}`;
  }

  function getHorizontalWaveB(i) {
    const yBase = i * 19;
    
    // Wave points with inverse phase to create an intertwined mesh structure
    const y0 = yBase - Math.sin(i * 0.8) * 8;
    const y1 = yBase - Math.sin(i * 0.8 + 1.5) * 10;
    const y2 = yBase - Math.sin(i * 0.8 + 3.0) * 8;
    const y3 = yBase - Math.sin(i * 0.8 + 4.5) * 10;

    return `M 130 ${y0} ` +
           `C 185 ${y0 - 6}, 240 ${y1 + 6}, 250 ${y1} ` +
           `C 280 ${y1 - 6}, 310 ${y2 + 6}, 320 ${y2} ` +
           `C 330 ${y2 - 6}, 340 ${y3 + 6}, 350 ${y3}`;
  }
</script>

<div class="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 rounded-b-2xl">
  <svg viewBox="0 0 350 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <!-- Tight repeating text tile with offset rows. Spacing of 25px fits exactly 11-12 lines of text. font-weight is 400 (not bold). -->
      <pattern id="wm-text" width="700" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(-16)">
        <text x="0" y="16" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#3b4963" opacity="0.22" letter-spacing="0.8">
          {watermarkText()} / {shortText()} / {watermarkText()}
        </text>
        <text x="-175" y="41" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#3b4963" opacity="0.22" letter-spacing="0.8">
          {watermarkText()} / {shortText()} / {watermarkText()}
        </text>
        <text x="-350" y="66" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#3b4963" opacity="0.22" letter-spacing="0.8">
          {watermarkText()} / {shortText()} / {watermarkText()}
        </text>
        <text x="-525" y="91" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#3b4963" opacity="0.22" letter-spacing="0.8">
          {watermarkText()} / {shortText()} / {watermarkText()}
        </text>
      </pattern>

      <!-- Linear gradient that fades the horizontal waves out towards the left (around x=130) -->
      <linearGradient id="wave-grad" x1="350" y1="0" x2="130" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#3b4963" stop-opacity="0.22" />
        <stop offset="60%" stop-color="#3b4963" stop-opacity="0.10" />
        <stop offset="100%" stop-color="#3b4963" stop-opacity="0.0" />
      </linearGradient>
    </defs>
    
    <!-- Dense repeating diagonal text background -->
    <rect width="200%" height="200%" x="-200" y="-100" fill="url(#wm-text)" />

    <!-- Guilloche wavy security lines - exactly 20 thick, intertwined horizontal waves on the right side fading out to the left -->
    <g fill="none" stroke="url(#wave-grad)">
      {#each Array(10) as _, i}
        <!-- Group A horizontal waves -->
        <path d={getHorizontalWaveA(i)} stroke-width="1.3" />
        <!-- Group B horizontal waves (intertwined with Group A) -->
        <path d={getHorizontalWaveB(i)} stroke-width="1.3" />
      {/each}
    </g>
  </svg>
</div>
