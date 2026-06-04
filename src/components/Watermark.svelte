<script>
  let { 
    name = 'L.Elbs', 
    dob = '08-12-2004', 
    passNumber = '34CZYN', 
    classType = '2nd class', 
    passType = 'Interrail Greek Islands Pass', 
    validOn = '07-05-2026' 
  } = $props();

  // Reactive text construction matching the user's layout
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
    
    // Clean up class name (e.g. '2nd class Youth' -> '2nd class')
    let cleanClass = classType || '2nd class';
    if (cleanClass.toLowerCase().includes('2nd class')) {
      cleanClass = '2ND CLASS';
    } else if (cleanClass.toLowerCase().includes('1st class')) {
      cleanClass = '1ST CLASS';
    }

    const cleanPassType = (passType || 'INTERRAIL GREEK ISLANDS PASS').toUpperCase();
    const cleanName = (name || 'L.ELBS').toUpperCase();
    const cleanPassNo = (passNumber || '34CZYN').toUpperCase();

    return `${cleanName} / ${dobDayMonth} / ${cleanPassNo} / ${cleanClass} / ${cleanPassType} / ${validOn}`;
  });
</script>

<div class="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 rounded-b-2xl opacity-[0.24]">
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Denser pattern dimensions (280x90) for tight vertical text wrapping -->
      <pattern id="watermark-pattern" width="280" height="90" patternUnits="userSpaceOnUse">
        <!-- Rotated text group at -13 degrees -->
        <g transform="rotate(-13 140 45)">
          <text x="-150" y="-30" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#475569" opacity="0.45" letter-spacing="0.2">
            {watermarkText()} &nbsp;&nbsp;&nbsp;&nbsp; {watermarkText()}
          </text>
          <text x="-80" y="0" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#475569" opacity="0.45" letter-spacing="0.2">
            {watermarkText()} &nbsp;&nbsp;&nbsp;&nbsp; {watermarkText()}
          </text>
          <text x="-120" y="30" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#475569" opacity="0.45" letter-spacing="0.2">
            {watermarkText()} &nbsp;&nbsp;&nbsp;&nbsp; {watermarkText()}
          </text>
          <text x="-50" y="60" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#475569" opacity="0.45" letter-spacing="0.2">
            {watermarkText()} &nbsp;&nbsp;&nbsp;&nbsp; {watermarkText()}
          </text>
          <text x="-90" y="90" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#475569" opacity="0.45" letter-spacing="0.2">
            {watermarkText()} &nbsp;&nbsp;&nbsp;&nbsp; {watermarkText()}
          </text>
          <text x="-130" y="120" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#475569" opacity="0.45" letter-spacing="0.2">
            {watermarkText()} &nbsp;&nbsp;&nbsp;&nbsp; {watermarkText()}
          </text>
        </g>
      </pattern>
    </defs>
    
    <!-- Background filled with pattern -->
    <rect width="100%" height="100%" fill="url(#watermark-pattern)" />

    <!-- Highly dense, overlapping security waves (Guilloche lines) running across the entire width -->
    <g fill="none" stroke="#475569" stroke-width="0.32" opacity="0.45">
      <!-- Wave Group A: Higher frequency waves -->
      <path d="M -50 20 C 50 -10, 150 70, 250 20 C 350 -10, 450 70, 550 20 C 650 -10, 750 70, 850 20" />
      <path d="M -50 24 C 50 -6,  150 74, 250 24 C 350 -6,  450 74, 550 24 C 650 -6,  750 74, 850 24" />
      <path d="M -50 28 C 50 -2,  150 78, 250 28 C 350 -2,  450 78, 550 28 C 650 -2,  750 78, 850 28" />

      <!-- Wave Group B: Phase-shifted waves -->
      <path d="M -50 60 C 60 100, 160 20, 260 60 C 360 100, 460 20, 560 60 C 660 100, 760 20, 860 60" />
      <path d="M -50 64 C 60 104, 160 24, 260 64 C 360 104, 460 24, 560 64 C 660 104, 760 24, 860 64" />
      <path d="M -50 68 C 60 108, 160 28, 260 68 C 360 108, 460 28, 560 68 C 660 108, 760 28, 860 68" />

      <!-- Wave Group C: Deep sweeping curves intersecting -->
      <path d="M -50 100 C 40 70, 120 130, 210 100 C 300 70, 380 130, 470 100 C 560 70, 640 130, 730 100 C 820 70, 900 130, 990 100" />
      <path d="M -50 104 C 40 74, 120 134, 210 104 C 300 74, 380 134, 470 104 C 560 74, 640 134, 730 104 C 820 74, 900 134, 990 104" />
      
      <!-- Wave Group D: Counter-intersecting waves for mesh pattern -->
      <path d="M -50 120 C 80 160, 180 80, 280 120 C 380 160, 480 80, 580 120 C 680 160, 780 80, 880 120" />
      <path d="M -50 124 C 80 164, 180 84, 280 124 C 380 164, 480 84, 580 124 C 680 164, 780 84, 880 124" />

      <!-- Very fine background guilloche patterns -->
      <path d="M -50 40 C 90 90, 185 -10, 280 40 C 375 90, 470 -10, 565 40 C 660 90, 755 -10, 850 40" stroke-width="0.2" opacity="0.7" />
      <path d="M -50 44 C 90 94, 185 -6,  280 44 C 375 94, 470 -6,  565 44 C 660 94, 755 -6,  850 44" stroke-width="0.2" opacity="0.7" />
    </g>
  </svg>
</div>
