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

  // Math functions to generate the 20 intertwined security waves on the right side
  function getWavePathA(i) {
    const startX = 195 + i * 11;
    const slant = (y) => (y * 0.22); // Diagonal slant to the right
    
    // Smooth sinusoidal wave points with progressive phase offsets
    const x0 = startX + Math.sin(i * 0.8) * 9;
    const x1 = startX + Math.sin(i * 0.8 + 1.5) * 12;
    const x2 = startX + Math.sin(i * 0.8 + 3.0) * 9;
    const x3 = startX + Math.sin(i * 0.8 + 4.5) * 12;
    
    return `M ${x0 + slant(0)} 0 ` +
           `C ${x0 + slant(15)} 30, ${x1 + slant(45)} 30, ${x1 + slant(60)} 60 ` +
           `C ${x1 + slant(75)} 90, ${x2 + slant(105)} 90, ${x2 + slant(120)} 120 ` +
           `C ${x2 + slant(135)} 150, ${x3 + slant(165)} 150, ${x3 + slant(180)} 180`;
  }

  function getWavePathB(i) {
    const startX = 195 + i * 11;
    const slant = (y) => (y * 0.22);
    
    // Wave points with inverse phase to create an intertwined mesh structure
    const x0 = startX - Math.sin(i * 0.8) * 9;
    const x1 = startX - Math.sin(i * 0.8 + 1.5) * 12;
    const x2 = startX - Math.sin(i * 0.8 + 3.0) * 9;
    const x3 = startX - Math.sin(i * 0.8 + 4.5) * 12;
    
    return `M ${x0 + slant(0)} 0 ` +
           `C ${x0 + slant(15)} 30, ${x1 + slant(45)} 30, ${x1 + slant(60)} 60 ` +
           `C ${x1 + slant(75)} 90, ${x2 + slant(105)} 90, ${x2 + slant(120)} 120 ` +
           `C ${x2 + slant(135)} 150, ${x3 + slant(165)} 150, ${x3 + slant(180)} 180`;
  }
</script>

<div class="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 rounded-b-2xl">
  <svg viewBox="0 0 350 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <!-- Tight repeating text tile with offset rows. Height 136 ensures exactly 9 rows are visible. -->
      <pattern id="wm-text" width="700" height="136" patternUnits="userSpaceOnUse" patternTransform="rotate(-16)">
        <text x="0" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="700" fill="#3b4963" opacity="0.20" letter-spacing="0.8">
          {watermarkText()} / {shortText()} / {watermarkText()}
        </text>
        <text x="-175" y="56" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="700" fill="#3b4963" opacity="0.20" letter-spacing="0.8">
          {watermarkText()} / {shortText()} / {watermarkText()}
        </text>
        <text x="-350" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="700" fill="#3b4963" opacity="0.20" letter-spacing="0.8">
          {watermarkText()} / {shortText()} / {watermarkText()}
        </text>
        <text x="-525" y="124" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="700" fill="#3b4963" opacity="0.20" letter-spacing="0.8">
          {watermarkText()} / {shortText()} / {watermarkText()}
        </text>
      </pattern>
    </defs>
    
    <!-- Dense repeating diagonal text background -->
    <rect width="200%" height="200%" x="-200" y="-100" fill="url(#wm-text)" />

    <!-- Guilloche wavy security lines - exactly 20 thick, intertwined waves on the right half -->
    <g fill="none" stroke="#3b4963" opacity="0.14">
      {#each Array(10) as _, i}
        <!-- Group A waves -->
        <path d={getWavePathA(i)} stroke-width="1.2" />
        <!-- Group B waves (intertwined with Group A) -->
        <path d={getWavePathB(i)} stroke-width="1.2" />
      {/each}
    </g>
  </svg>
</div>
