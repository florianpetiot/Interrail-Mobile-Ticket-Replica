<script>
  import { onMount } from 'svelte';
  import AztecCode from './components/AztecCode.svelte';
  import Watermark from './components/Watermark.svelte';

  // Default values for restoration
  const DEFAULTS = {
    name: 'L.Elbs',
    dob: '08-12-2004',
    residence: 'Germany',
    idNumberSuffix: 'KMG',
    passNumber: '34CZYN',
    passType: 'Interrail Greek Islands Pass',
    classType: '2nd class Youth',
    validOn: '07-05-2026',
    activatedOn: '07-05-2026, 20:07',
    lastOnline: '07-05-2026, 20:07',
    
    // Journey Details
    journeyOrigin: 'Piraeus Ferry Terminal',
    journeyOriginTime: '21:00',
    journeyDest: 'Heraklion',
    journeyDestTime: '06:50',
    journeyCode: 'SSF18075',
    journeyLabel: 'Nur mit dem Griechische Inseln Pass',
    journeySeatText: 'Seat reservations required',
    
    // Bottom details
    issuer: '9901',
    civ: '',
    issuedOn: '25-03-2026',
    lastValidityDay: '06-06-2026',
    
    // UI elements
    navbarTitle: 'Fahrkarte',
    conditionsText: 'View the Conditions of Use of the Pass'
  };

  // State variables (Svelte 5 syntax)
  let name = $state(DEFAULTS.name);
  let dob = $state(DEFAULTS.dob);
  let residence = $state(DEFAULTS.residence);
  let idNumberSuffix = $state(DEFAULTS.idNumberSuffix);
  let passNumber = $state(DEFAULTS.passNumber);
  let passType = $state(DEFAULTS.passType);
  let classType = $state(DEFAULTS.classType);
  let validOn = $state(DEFAULTS.validOn);
  let activatedOn = $state(DEFAULTS.activatedOn);
  let lastOnline = $state(DEFAULTS.lastOnline);

  let journeyOrigin = $state(DEFAULTS.journeyOrigin);
  let journeyOriginTime = $state(DEFAULTS.journeyOriginTime);
  let journeyDest = $state(DEFAULTS.journeyDest);
  let journeyDestTime = $state(DEFAULTS.journeyDestTime);
  let journeyCode = $state(DEFAULTS.journeyCode);
  let journeyLabel = $state(DEFAULTS.journeyLabel);
  let journeySeatText = $state(DEFAULTS.journeySeatText);

  let issuer = $state(DEFAULTS.issuer);
  let civ = $state(DEFAULTS.civ);
  let issuedOn = $state(DEFAULTS.issuedOn);
  let lastValidityDay = $state(DEFAULTS.lastValidityDay);

  let navbarTitle = $state(DEFAULTS.navbarTitle);
  let conditionsText = $state(DEFAULTS.conditionsText);

  // Time and clock logic
  let systemTime = $state('22:38:07');
  let isClockLive = $state(true);

  // Lock editable fields state
  let isLocked = $state(false);

  // Active Navigation Tab
  let activeTab = $state('Mein Pass');

  // Multi-tap detection times
  let lastClickTimeMehr = 0;
  let lastClickTimeMeinPass = 0;

  // Toggle fullscreen mode
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // Multi-tap handlers for navigation buttons
  function handleMehrClick() {
    activeTab = 'Mehr';
    const now = Date.now();
    if (now - lastClickTimeMehr < 300) {
      toggleFullScreen();
    }
    lastClickTimeMehr = now;
  }

  function handleMeinPassClick() {
    activeTab = 'Mein Pass';
    const now = Date.now();
    if (now - lastClickTimeMeinPass < 300) {
      isLocked = !isLocked;
    }
    lastClickTimeMeinPass = now;
  }

  // Prevent line breaks in contenteditable fields
  function preventEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  }

  // Handle clock focus
  function handleClockFocus() {
    isClockLive = false;
  }

  // Restore defaults function
  function restoreDefaults() {
    name = DEFAULTS.name;
    dob = DEFAULTS.dob;
    residence = DEFAULTS.residence;
    idNumberSuffix = DEFAULTS.idNumberSuffix;
    passNumber = DEFAULTS.passNumber;
    passType = DEFAULTS.passType;
    classType = DEFAULTS.classType;
    validOn = DEFAULTS.validOn;
    activatedOn = DEFAULTS.activatedOn;
    lastOnline = DEFAULTS.lastOnline;
    
    journeyOrigin = DEFAULTS.journeyOrigin;
    journeyOriginTime = DEFAULTS.journeyOriginTime;
    journeyDest = DEFAULTS.journeyDest;
    journeyDestTime = DEFAULTS.journeyDestTime;
    journeyCode = DEFAULTS.journeyCode;
    journeyLabel = DEFAULTS.journeyLabel;
    journeySeatText = DEFAULTS.journeySeatText;
    
    issuer = DEFAULTS.issuer;
    civ = DEFAULTS.civ;
    issuedOn = DEFAULTS.issuedOn;
    lastValidityDay = DEFAULTS.lastValidityDay;
    
    navbarTitle = DEFAULTS.navbarTitle;
    conditionsText = DEFAULTS.conditionsText;

    // Reset clock and unlock fields
    isClockLive = true;
    isLocked = false;
  }

  // Load from localStorage on mount
  onMount(() => {
    const saved = localStorage.getItem('interrail_pass_data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.name !== undefined) name = data.name;
        if (data.dob !== undefined) dob = data.dob;
        if (data.residence !== undefined) residence = data.residence;
        if (data.idNumberSuffix !== undefined) idNumberSuffix = data.idNumberSuffix;
        if (data.passNumber !== undefined) passNumber = data.passNumber;
        if (data.passType !== undefined) passType = data.passType;
        if (data.classType !== undefined) classType = data.classType;
        if (data.validOn !== undefined) validOn = data.validOn;
        if (data.activatedOn !== undefined) activatedOn = data.activatedOn;
        if (data.lastOnline !== undefined) lastOnline = data.lastOnline;
        if (data.journeyOrigin !== undefined) journeyOrigin = data.journeyOrigin;
        if (data.journeyOriginTime !== undefined) journeyOriginTime = data.journeyOriginTime;
        if (data.journeyDest !== undefined) journeyDest = data.journeyDest;
        if (data.journeyDestTime !== undefined) journeyDestTime = data.journeyDestTime;
        if (data.journeyCode !== undefined) journeyCode = data.journeyCode;
        if (data.journeyLabel !== undefined) journeyLabel = data.journeyLabel;
        if (data.journeySeatText !== undefined) journeySeatText = data.journeySeatText;
        if (data.issuer !== undefined) issuer = data.issuer;
        if (data.civ !== undefined) civ = data.civ;
        if (data.issuedOn !== undefined) issuedOn = data.issuedOn;
        if (data.lastValidityDay !== undefined) lastValidityDay = data.lastValidityDay;
        if (data.navbarTitle !== undefined) navbarTitle = data.navbarTitle;
        if (data.conditionsText !== undefined) conditionsText = data.conditionsText;
        if (data.isClockLive !== undefined) isClockLive = data.isClockLive;
        if (data.isLocked !== undefined) isLocked = data.isLocked;
      } catch (e) {
        console.error('Error loading saved data', e);
      }
    }

    const interval = setInterval(() => {
      if (isClockLive) {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        systemTime = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      }
    }, 1000);

    // Initial setup to match current time
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    if (isClockLive) {
      systemTime = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }

    return () => clearInterval(interval);
  });

  // Auto-save reactive state variables to localStorage
  $effect(() => {
    const data = {
      name, dob, residence, idNumberSuffix, passNumber, passType,
      classType, validOn, activatedOn, lastOnline, journeyOrigin,
      journeyOriginTime, journeyDest, journeyDestTime, journeyCode,
      journeyLabel, journeySeatText, issuer, civ, issuedOn,
      lastValidityDay, navbarTitle, conditionsText, isClockLive, isLocked
    };
    localStorage.setItem('interrail_pass_data', JSON.stringify(data));
  });
</script>

<div class="min-h-screen bg-[#0d0916] flex flex-col md:flex-row items-center justify-center p-0 sm:p-6 md:p-12 gap-8 selection:bg-blue-200">
  
  <!-- LEFT PANEL: Instructions & Quick Actions (visible only on desktop / tablet screen sizes) -->
  <div class="hidden md:flex flex-col max-w-sm text-gray-300 gap-4 self-start mt-6 bg-[#1a1426] p-6 rounded-2xl border border-purple-900/30 shadow-xl">
    <h2 class="text-xl font-bold text-white flex items-center gap-2">
      <span>🎫</span> Interrail Ticket Editor
    </h2>
    <p class="text-xs leading-relaxed text-gray-400">
      Ceci est une maquette interactive de votre billet Interrail. Tous les textes visibles sur le téléphone sont des <strong>champs modifiables en ligne</strong>. 
    </p>
    <div class="text-xs text-gray-400 mt-2 space-y-2">
      <p>👉 Cliquez sur n'importe quel texte pour le modifier.</p>
      <p>🔒 <strong>Bloquer l'édition</strong> : Double-cliquez sur l'onglet <strong>"Mein Pass"</strong> pour geler/dégeler tous les champs de saisie.</p>
      <p>🖥️ <strong>Mode plein écran</strong> : Double-cliquez sur l'onglet <strong>"Mehr"</strong> pour basculer en plein écran.</p>
      <p>💾 Vos modifications sont <strong>sauvegardées automatiquement</strong> dans le navigateur.</p>
    </div>
    
    <hr class="border-purple-950 my-2" />

    <div class="flex flex-col gap-2">
      <!-- Lock Fields Toggle -->
      <label class="flex items-center justify-between text-xs cursor-pointer bg-[#241c33] hover:bg-[#2c223e] p-3 rounded-lg transition">
        <span>Geler l'édition (Lecture seule)</span>
        <input 
          type="checkbox" 
          bind:checked={isLocked} 
          class="accent-blue-500 w-4 h-4 cursor-pointer" 
        />
      </label>

      <!-- Live Clock Toggle -->
      <label class="flex items-center justify-between text-xs cursor-pointer bg-[#241c33] hover:bg-[#2c223e] p-3 rounded-lg transition">
        <span>Horloge en temps réel</span>
        <input 
          type="checkbox" 
          bind:checked={isClockLive} 
          class="accent-blue-500 w-4 h-4 cursor-pointer" 
        />
      </label>

      <!-- Restore Defaults Button -->
      <button 
        onclick={restoreDefaults}
        class="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold py-2.5 px-4 rounded-lg shadow transition duration-150 flex items-center justify-center gap-1.5"
      >
        <span>🔄</span> Réinitialiser les données
      </button>
    </div>

    <div class="text-[10px] text-gray-500 text-center mt-2">
      Les modifications seront conservées au rechargement.
    </div>
  </div>

  <!-- CENTER: Simulated Phone Container (Borderless & full-screen on mobile, mockup on desktop) -->
  <div class="relative w-full h-screen sm:w-[385px] sm:h-[820px] bg-ticket-bg sm:rounded-[48px] sm:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] sm:border-[10px] sm:border-[#1f172f] overflow-hidden flex flex-col class:locked-mode={isLocked}">
    
    <!-- Phone Top Camera/Ear Speaker notch overlay (Simulated for visual wow factor on desktop) -->
    <div class="absolute top-0 inset-x-0 h-5 bg-[#130926] z-50 flex justify-center items-center pointer-events-none rounded-t-[38px] hidden sm:flex">
      <div class="w-24 h-4 bg-black rounded-b-xl"></div>
    </div>

    <!-- 1. Header (Navbar) -->
    <header class="bg-brand-purple text-white pt-4 pb-3 px-4 flex items-center relative z-40">
      <!-- Back arrow -->
      <button aria-label="Retour" class="text-white hover:text-gray-300 transition focus:outline-none flex items-center justify-center -ml-1">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <!-- Centered Navbar title -->
      <div class="flex-grow text-center mr-5">
        <input 
          type="text" 
          readonly={isLocked}
          bind:value={navbarTitle} 
          class="editable-input text-center font-semibold text-[17px] text-white tracking-wide {isLocked ? 'pointer-events-none select-none' : ''}" 
          style="width: {navbarTitle.length + 1}ch;"
        />
      </div>
    </header>

    <!-- 2. Scrollable Body containing ticket -->
    <main class="flex-grow overflow-y-auto no-scrollbar px-4 pt-4 pb-20 select-text relative z-30">
      
      <!-- Ticket Container Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200/80 relative overflow-hidden flex flex-col">
        
        <!-- A. Top Card Section (System time + Aztec barcode + Pass number) -->
        <div class="px-5 pt-3 flex flex-col items-center">
          
          <!-- System Time showing right-aligned -->
          <div class="w-full flex justify-end items-center pr-1 h-7">
            <input 
              type="text" 
              readonly={isLocked}
              bind:value={systemTime} 
              onfocus={handleClockFocus}
              class="editable-input text-right font-bold text-ticket-navy text-sm w-20 font-mono tracking-tight {isLocked ? 'pointer-events-none select-none' : ''}" 
            />
            {#if !isClockLive && !isLocked}
              <button 
                onclick={() => isClockLive = true} 
                title="Activer l'horloge en direct"
                class="ml-1 text-[10px] text-blue-500 hover:text-blue-600 font-bold"
              >
                ●
              </button>
            {/if}
          </div>

          <!-- Aztec QR Code (Seeded from pass number - matches text width margins exactly) -->
          <div class="w-full my-2">
            <AztecCode passNumber={passNumber} />
          </div>

          <!-- Pass Number text (Single-line guaranteed & Centered auto-adapting) -->
          <div class="text-[11px] text-center text-ticket-gray tracking-wide uppercase mt-1.5 mb-2 flex items-center justify-center gap-1.5 whitespace-nowrap">
            <span>PASS NUMBER</span>
            <input 
              type="text" 
              readonly={isLocked}
              bind:value={passNumber} 
              class="editable-input font-bold text-ticket-navy uppercase tracking-wide text-center {isLocked ? 'pointer-events-none select-none' : ''}" 
              style="width: {passNumber.length + 0.5}ch;"
            />
          </div>

        </div>

        <!-- B. Card fold/notch separator line -->
        <div class="relative flex items-center justify-center h-4 my-1">
          <!-- Left notched semi-circle -->
          <div class="ticket-notch-left"></div>
          <!-- Dashed separator -->
          <div class="w-full border-t border-dashed border-gray-200"></div>
          <!-- Right notched semi-circle -->
          <div class="ticket-notch-right"></div>
        </div>

        <!-- C. Middle Details Section (Pass Title + Validity + Table) -->
        <div class="px-5 pt-2 pb-4">
          
          <!-- Pass Type -->
          <div class="w-full">
            <input 
              type="text" 
              readonly={isLocked}
              bind:value={passType} 
              class="editable-input font-bold text-ticket-navy text-[19px] leading-tight tracking-tight text-left {isLocked ? 'pointer-events-none select-none' : ''}" 
            />
          </div>

          <!-- Class Type -->
          <div class="w-full mt-0.5">
            <input 
              type="text" 
              readonly={isLocked}
              bind:value={classType} 
              class="editable-input font-bold text-ticket-blue text-[15px] leading-none text-left {isLocked ? 'pointer-events-none select-none' : ''}" 
            />
          </div>

          <!-- Valid on Label & Date -->
          <div class="mt-4 text-left">
            <div class="text-[11px] text-ticket-gray font-normal tracking-wide">Valid on</div>
            <input 
              type="text" 
              readonly={isLocked}
              bind:value={validOn} 
              class="editable-input font-bold text-ticket-navy text-[21px] mt-0.5 leading-none {isLocked ? 'pointer-events-none select-none' : ''}" 
            />
          </div>

          <hr class="border-t border-gray-100 my-4" />

          <!-- Personal details grid -->
          <div class="grid grid-cols-[1.1fr_1.9fr] gap-x-2 gap-y-3.5 text-[13.5px] text-left">
            
            <div class="text-ticket-gray font-normal">Name</div>
            <div>
              <input type="text" readonly={isLocked} bind:value={name} class="editable-input font-medium text-ticket-navy text-left {isLocked ? 'pointer-events-none select-none' : ''}" />
            </div>

            <div class="text-ticket-gray font-normal">Date of birth</div>
            <div>
              <input type="text" readonly={isLocked} bind:value={dob} class="editable-input font-medium text-ticket-navy text-left {isLocked ? 'pointer-events-none select-none' : ''}" />
            </div>

            <div class="text-ticket-gray font-normal">Residence</div>
            <div>
              <input type="text" readonly={isLocked} bind:value={residence} class="editable-input font-medium text-ticket-navy text-left {isLocked ? 'pointer-events-none select-none' : ''}" />
            </div>

            <!-- ID number with 6 stars hardcoded, only last 3 characters editable -->
            <div class="text-ticket-gray font-normal">ID number</div>
            <div class="flex items-center text-ticket-navy font-medium font-mono text-[13.5px]">
              <span class="tracking-wide">******</span>
              <input 
                type="text" 
                readonly={isLocked}
                bind:value={idNumberSuffix} 
                maxlength="3"
                class="editable-input font-medium text-ticket-navy text-left p-0 pl-0.5 w-[3.5ch] tracking-wide uppercase {isLocked ? 'pointer-events-none select-none' : ''}" 
              />
            </div>

            <div class="text-ticket-gray font-normal">Activated on</div>
            <div>
              <input type="text" readonly={isLocked} bind:value={activatedOn} class="editable-input font-medium text-ticket-navy text-left {isLocked ? 'pointer-events-none select-none' : ''}" />
            </div>

            <div class="text-ticket-gray font-normal">Last online</div>
            <div>
              <input type="text" readonly={isLocked} bind:value={lastOnline} class="editable-input font-medium text-ticket-navy text-left {isLocked ? 'pointer-events-none select-none' : ''}" />
            </div>

          </div>

          <hr class="border-t border-gray-100 my-4.5" />

          <!-- Journeys Section -->
          <div class="text-left">
            
            <!-- Section Header -->
            <div class="flex justify-between items-baseline mb-3">
              <span class="font-bold text-ticket-navy text-base tracking-tight">Journeys</span>
              <button class="text-ticket-blue text-xs font-semibold hover:underline {isLocked ? 'pointer-events-none opacity-50' : ''}">
                Edit journeys
              </button>
            </div>

            <!-- Route Stop Block -->
            <div class="flex items-start gap-2.5">
              
              <!-- Yellow bullseye marker icon -->
              <div class="mt-1.5 flex-shrink-0 flex items-center justify-center w-[15px] h-[15px] rounded-full border-[3px] border-amber-400 bg-white">
                <div class="w-1.5 h-1.5 rounded-full bg-ticket-navy"></div>
              </div>

              <!-- Journey contents (using wrapping contenteditable spans with bind:textContent) -->
              <div class="flex-grow text-[13.5px] leading-relaxed text-ticket-navy">
                <div class="inline-block">
                  <span 
                    role="textbox"
                    tabindex={isLocked ? -1 : 0}
                    contenteditable="true"
                    bind:textContent={journeyOrigin} 
                    onkeydown={preventEnter}
                    class="editable-input font-medium cursor-text hover:bg-gray-100/50 focus:bg-blue-50/50 px-0.5 rounded outline-none border border-transparent hover:border-gray-200/50 focus:border-blue-300 inline {isLocked ? 'pointer-events-none select-none' : ''}" 
                  ></span>
                  
                  <span 
                    role="textbox"
                    tabindex={isLocked ? -1 : 0}
                    contenteditable="true"
                    bind:textContent={journeyOriginTime} 
                    onkeydown={preventEnter}
                    class="editable-input font-bold cursor-text hover:bg-gray-100/50 focus:bg-blue-50/50 px-0.5 rounded outline-none border border-transparent hover:border-gray-200/50 focus:border-blue-300 inline ml-1 font-mono {isLocked ? 'pointer-events-none select-none' : ''}" 
                  ></span>
                  
                  <span class="text-ticket-gray mx-1 font-normal inline select-none">–</span>
                  
                  <span 
                    role="textbox"
                    tabindex={isLocked ? -1 : 0}
                    contenteditable="true"
                    bind:textContent={journeyDest} 
                    onkeydown={preventEnter}
                    class="editable-input font-medium cursor-text hover:bg-gray-100/50 focus:bg-blue-50/50 px-0.5 rounded outline-none border border-transparent hover:border-gray-200/50 focus:border-blue-300 inline {isLocked ? 'pointer-events-none select-none' : ''}" 
                  ></span>
                  
                  <span 
                    role="textbox"
                    tabindex={isLocked ? -1 : 0}
                    contenteditable="true"
                    bind:textContent={journeyDestTime} 
                    onkeydown={preventEnter}
                    class="editable-input font-bold cursor-text hover:bg-gray-100/50 focus:bg-blue-50/50 px-0.5 rounded outline-none border border-transparent hover:border-gray-200/50 focus:border-blue-300 inline ml-1 font-mono {isLocked ? 'pointer-events-none select-none' : ''}" 
                  ></span>
                  
                  <span 
                    role="textbox"
                    tabindex={isLocked ? -1 : 0}
                    contenteditable="true"
                    bind:textContent={journeyCode} 
                    onkeydown={preventEnter}
                    class="editable-input text-ticket-gray cursor-text hover:bg-gray-100/50 focus:bg-blue-50/50 px-0.5 rounded outline-none border border-transparent hover:border-gray-200/50 focus:border-blue-300 inline ml-1 font-mono {isLocked ? 'pointer-events-none select-none' : ''}" 
                  ></span>
                </div>

                <!-- Warnings and custom badges -->
                <div class="mt-2.5 flex flex-col gap-1 items-start">
                  
                  <!-- Warning badge -->
                  <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#f3f5f8] border border-gray-200/50 text-[10.5px]">
                    <div class="w-3.5 h-3.5 rounded-full bg-ticket-orange flex items-center justify-center text-white text-[9.5px] font-black select-none">
                      !
                    </div>
                    <span 
                      role="textbox"
                      tabindex={isLocked ? -1 : 0}
                      contenteditable="true"
                      bind:textContent={journeyLabel} 
                      onkeydown={preventEnter}
                      class="editable-input font-medium text-ticket-orange-dark cursor-text hover:bg-gray-200/50 focus:bg-blue-50/50 px-0.5 rounded outline-none {isLocked ? 'pointer-events-none select-none' : ''}" 
                    ></span>
                  </div>

                  <!-- Italics Seat warning -->
                  <div class="text-[11px] italic text-ticket-orange pl-1 mt-0.5">
                    <span 
                      role="textbox"
                      tabindex={isLocked ? -1 : 0}
                      contenteditable="true"
                      bind:textContent={journeySeatText} 
                      onkeydown={preventEnter}
                      class="editable-input text-ticket-orange italic cursor-text hover:bg-gray-200/50 focus:bg-blue-50/50 px-0.5 rounded outline-none {isLocked ? 'pointer-events-none select-none' : ''}" 
                    ></span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        <!-- D. Footer Card Section (Dense Watermark + Issuer/CIV Grid + Conditions text) -->
        <div class="relative mt-2 px-5 pt-5 pb-4 border-t border-gray-100 bg-[#fafbfe] rounded-b-2xl min-h-[150px] flex flex-col justify-between">
          
          <!-- Responsive watermarked background overlay (Includes first 6 stars for ID number) -->
          <Watermark 
            name={name}
            dob={dob}
            passNumber={passNumber}
            classType={classType}
            passType={passType}
            validOn={validOn}
          />

          <!-- Issuer info text on top of watermark -->
          <div class="relative z-10 grid grid-cols-2 gap-y-3.5 gap-x-2 text-[12px] text-left">
            <div>
              <div class="text-[9px] text-ticket-gray uppercase tracking-wider font-semibold">Issuer</div>
              <input 
                type="text" 
                readonly={isLocked}
                bind:value={issuer} 
                class="editable-input font-bold text-ticket-navy mt-0.5 text-left {isLocked ? 'pointer-events-none select-none' : ''}" 
              />
            </div>
            <div>
              <div class="text-[9px] text-ticket-gray uppercase tracking-wider font-semibold">CIV</div>
              <input 
                type="text" 
                readonly={isLocked}
                bind:value={civ} 
                placeholder="-" 
                class="editable-input font-bold text-ticket-navy mt-0.5 text-left {isLocked ? 'pointer-events-none select-none' : ''}" 
              />
            </div>
            <div>
              <div class="text-[9px] text-ticket-gray uppercase tracking-wider font-semibold">Issued on</div>
              <input 
                type="text" 
                readonly={isLocked}
                bind:value={issuedOn} 
                class="editable-input font-bold text-ticket-navy mt-0.5 text-left {isLocked ? 'pointer-events-none select-none' : ''}" 
              />
            </div>
            <div>
              <div class="text-[9px] text-ticket-gray uppercase tracking-wider font-semibold">Last day of validity</div>
              <input 
                type="text" 
                readonly={isLocked}
                bind:value={lastValidityDay} 
                class="editable-input font-bold text-ticket-navy mt-0.5 text-left {isLocked ? 'pointer-events-none select-none' : ''}" 
              />
            </div>
          </div>

          <!-- Bottom Conditions link text -->
          <div class="relative z-10 text-center mt-6">
            <input 
              type="text" 
              readonly={isLocked}
              bind:value={conditionsText} 
              class="editable-input text-ticket-blue text-[11px] underline text-center cursor-pointer font-semibold {isLocked ? 'pointer-events-none select-none' : ''}" 
              style="width: 100%;" 
            />
          </div>

        </div>

      </div>

    </main>

    <!-- 3. Bottom Fixed App Tabbar (4 tabs with click/double-tap logic) -->
    <footer class="bg-white border-t border-gray-150 h-16 w-full fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2 text-[10px] text-ticket-gray">
      
      <!-- Tab 1: Planer -->
      <button 
        onclick={() => activeTab = 'Planer'}
        class="flex flex-col items-center gap-1 flex-1 py-1 transition {activeTab === 'Planer' ? 'text-ticket-blue font-bold' : 'text-gray-400'}"
      >
        <svg class="w-5.5 h-5.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
        </svg>
        <span>Planer</span>
      </button>

      <!-- Tab 2: Meine Reise -->
      <button 
        onclick={() => activeTab = 'Meine Reise'}
        class="flex flex-col items-center gap-1 flex-1 py-1 transition {activeTab === 'Meine Reise' ? 'text-ticket-blue font-bold' : 'text-gray-400'}"
      >
        <svg class="w-5.5 h-5.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
        <span>Meine Reise</span>
      </button>

      <!-- Tab 3: Mein Pass (ACTIVE state has capsule highlight; Double-click locks/unlocks fields) -->
      <button 
        onclick={handleMeinPassClick}
        class="flex flex-col items-center gap-1 flex-1 py-1 text-ticket-blue relative"
      >
        <div class="px-5 py-1.5 rounded-full flex items-center justify-center transition {activeTab === 'Mein Pass' ? 'bg-[#e8ecf4]' : 'bg-transparent'}" style="color: #073893;">
          <svg class="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <rect x="7" y="6" width="4" height="4.5" rx="0.5" fill="#ffffff" />
            <rect x="13" y="6.5" width="4" height="0.8" fill="#ffffff" />
            <rect x="13" y="8" width="4" height="0.8" fill="#ffffff" />
            <!-- Lock icon inside active symbol if locked -->
            {#if isLocked}
              <circle cx="12" cy="14.5" r="2.5" fill="#ef4444" />
            {:else}
              <circle cx="12" cy="14.5" r="2.5" fill="#f59e0b" />
            {/if}
          </svg>
        </div>
        <span class="font-bold flex items-center gap-0.5">
          Mein Pass 
          {#if isLocked}
            <span class="text-[9px] text-red-500 font-extrabold select-none">🔒</span>
          {/if}
        </span>
      </button>

      <!-- Tab 4: Mehr (Double-click triggers full screen mode) -->
      <button 
        onclick={handleMehrClick}
        class="flex flex-col items-center gap-1 flex-1 py-1 transition {activeTab === 'Mehr' ? 'text-ticket-blue font-bold' : 'text-gray-400'}"
      >
        <svg class="w-5.5 h-5.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span>Mehr</span>
      </button>

    </footer>

  </div>

</div>
