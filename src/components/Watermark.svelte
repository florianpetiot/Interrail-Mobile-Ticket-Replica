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

  // Generate smooth horizontal security waves tilted at -16 degrees to match text rotation
  function getHorizontalWaveA(i) {
    const yBase = i * 18;
    const amp = 8;
    const phaseOffset = i * 0.8;
    const slantFactor = 0.287; // tan(16 deg) matches the -16 degree rotation of text
    
    const yVal = (x) => {
      return yBase - (x - 130) * slantFactor + Math.sin(x * 0.05 + phaseOffset) * amp;
    };

    const x0 = 130, x1 = 185, x2 = 240, x3 = 295, x4 = 350;
    const y0 = yVal(x0);
    const y1 = yVal(x1);
    const y2 = yVal(x2);
    const y3 = yVal(x3);
    const y4 = yVal(x4);

    const cp = 18; // cubic tension factor for wave roundness
    return `M ${x0} ${y0} ` +
           `C ${x0 + cp} ${y0}, ${x1 - cp} ${y1}, ${x1} ${y1} ` +
           `C ${x1 + cp} ${y1}, ${x2 - cp} ${y2}, ${x2} ${y2} ` +
           `C ${x2 + cp} ${y2}, ${x3 - cp} ${y3}, ${x3} ${y3} ` +
           `C ${x3 + cp} ${y3}, ${x4 - cp} ${y4}, ${x4} ${y4}`;
  }

  function getHorizontalWaveB(i) {
    const yBase = i * 18;
    const amp = 8;
    const phaseOffset = -i * 0.8 + Math.PI; // opposite phase to create intertwined intersections
    const slantFactor = 0.287;
    
    const yVal = (x) => {
      return yBase - (x - 130) * slantFactor + Math.sin(x * 0.05 + phaseOffset) * amp;
    };

    const x0 = 130, x1 = 185, x2 = 240, x3 = 295, x4 = 350;
    const y0 = yVal(x0);
    const y1 = yVal(x1);
    const y2 = yVal(x2);
    const y3 = yVal(x3);
    const y4 = yVal(x4);

    const cp = 18;
    return `M ${x0} ${y0} ` +
           `C ${x0 + cp} ${y0}, ${x1 - cp} ${y1}, ${x1} ${y1} ` +
           `C ${x1 + cp} ${y1}, ${x2 - cp} ${y2}, ${x2} ${y2} ` +
           `C ${x2 + cp} ${y2}, ${x3 - cp} ${y3}, ${x3} ${y3} ` +
           `C ${x3 + cp} ${y3}, ${x4 - cp} ${y4}, ${x4} ${y4}`;
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

      <!-- Linear gradient: solid grey for the right 70%, fades to transparent on the left 30% (starts fading 3/4 of the way to the left) -->
      <linearGradient id="wave-grad" x1="350" y1="0" x2="130" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#3b4963" stop-opacity="0.22" />
        <stop offset="70%" stop-color="#3b4963" stop-opacity="0.22" />
        <stop offset="100%" stop-color="#3b4963" stop-opacity="0.0" />
      </linearGradient>
    </defs>
    
    <!-- Dense repeating diagonal text background -->
    <rect width="200%" height="200%" x="-200" y="-100" fill="url(#wm-text)" />

    <!-- Guilloche wavy security lines - exactly 26 thick, -16-degree inclined horizontal waves on the right side fading out to the left -->
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
