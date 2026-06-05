<script>
  import { onMount } from 'svelte';
  import AztecCode from './components/AztecCode.svelte';
  import Watermark from './components/Watermark.svelte';
  import { translations, getSystemLanguage } from './lib/i18n.js';

  const currentLang = getSystemLanguage();
  const t = translations[currentLang];

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
    journeySeatText: 'Seat reservations required',
    
    // Bottom details
    issuer: '9901',
    civ: '',
    issuedOn: '25-03-2026',
    lastValidityDay: '06-06-2026',
    
    // UI elements
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
  let journeySeatText = $state(DEFAULTS.journeySeatText);

  let issuer = $state(DEFAULTS.issuer);
  let civ = $state(DEFAULTS.civ);
  let issuedOn = $state(DEFAULTS.issuedOn);
  let lastValidityDay = $state(DEFAULTS.lastValidityDay);

  let conditionsText = $state(DEFAULTS.conditionsText);

  // Time and clock logic
  let systemTime = $state('22:38:07');
  let isClockLive = $state(true);

  // Lock editable fields state
  let isLocked = $state(false);

  // Active Navigation Tab
  let activeTab = $state('meinPass');

  // Multi-tap detection times
  let lastClickTimeMehr = 0;
  let lastClickTimeMeinPass = 0;

  // Toggle fullscreen mode
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => {
          if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('portrait').catch(err => {
              console.warn("Screen orientation lock is not supported on this device/browser:", err);
            });
          }
        })
        .catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => {
            if (screen.orientation && screen.orientation.unlock) {
              screen.orientation.unlock();
            }
          })
          .catch(err => {
            console.warn("Error exiting fullscreen or unlocking orientation:", err);
          });
      }
    }
  }

  // Multi-tap handlers for navigation buttons
  function handleMehrClick() {
    activeTab = 'mehr';
    const now = Date.now();
    if (now - lastClickTimeMehr < 300) {
      toggleFullScreen();
    }
    lastClickTimeMehr = now;
  }

  function handleMeinPassClick() {
    activeTab = 'meinPass';
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
    journeySeatText = DEFAULTS.journeySeatText;
    
    issuer = DEFAULTS.issuer;
    civ = DEFAULTS.civ;
    issuedOn = DEFAULTS.issuedOn;
    lastValidityDay = DEFAULTS.lastValidityDay;
    
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
        if (data.journeySeatText !== undefined) journeySeatText = data.journeySeatText;
        if (data.issuer !== undefined) issuer = data.issuer;
        if (data.civ !== undefined) civ = data.civ;
        if (data.issuedOn !== undefined) issuedOn = data.issuedOn;
        if (data.lastValidityDay !== undefined) lastValidityDay = data.lastValidityDay;
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
      journeySeatText, issuer, civ, issuedOn,
      lastValidityDay, conditionsText, isClockLive, isLocked
    };
    localStorage.setItem('interrail_pass_data', JSON.stringify(data));
  });
</script>

<div class="min-h-[100dvh] bg-[#0d0916] flex flex-col md:flex-row items-center justify-center p-0 sm:p-6 md:p-12 gap-8 selection:bg-blue-200">
  
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
      <p>❄️ <strong>Bloquer l'édition</strong> : Double-cliquez sur l'onglet <strong>"Mein Pass"</strong> pour geler/dégeler tous les champs de saisie.</p>
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
  <div class="relative w-full h-[100dvh] sm:w-[385px] sm:h-[820px] bg-ticket-bg sm:rounded-[48px] sm:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] sm:border-[10px] sm:border-[#1f172f] overflow-hidden flex flex-col class:locked-mode={isLocked}">
    
    <!-- Phone Top Camera/Ear Speaker notch overlay (Simulated for visual wow factor on desktop) -->
    <div class="absolute top-0 inset-x-0 h-5 bg-[#130926] z-50 flex justify-center items-center pointer-events-none rounded-t-[38px] hidden sm:flex">
      <div class="w-24 h-4 bg-black rounded-b-xl"></div>
    </div>

    <!-- 1. Header (Navbar) -->
    <header class="bg-brand-purple text-white pb-3 px-4 flex items-center relative z-40" style="padding-top: calc(1rem + env(safe-area-inset-top, 0px));">
      <!-- Back arrow -->
      <button aria-label="Retour" class="text-white hover:text-gray-300 transition focus:outline-none flex items-center justify-center -ml-1">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <!-- Centered Navbar title -->
      <div class="flex-grow text-center mr-5">
        <span class="font-semibold text-[17px] text-white tracking-wide select-none">
          {t.fahrkarte}
        </span>
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
                    <span class="font-medium text-ticket-orange-dark select-none">
                      {t.journeyLabel}
                    </span>
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

        <!-- D. Footer Card Section (Dense Watermark + Issuer/CIV Grid) -->
        <div class="relative mt-2 px-5 pt-8 pb-10 border-t border-gray-100 bg-[#f5f6fa] rounded-b-2xl min-h-[180px] flex flex-col justify-center">
          
          <!-- Responsive watermarked background overlay -->
          <Watermark 
            name={name}
            dob={dob}
            passNumber={passNumber}
            classType={classType}
            passType={passType}
            validOn={validOn}
          />

          <!-- Issuer info text on top of watermark -->
          <div class="relative z-10 grid grid-cols-2 gap-y-5 gap-x-2 text-[12px] text-left">
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

        </div>

      </div>

      <!-- E. Conditions link OUTSIDE the card, below it, on clean background -->
      <div class="text-center mt-5 mb-2">
        <input 
          type="text" 
          readonly={isLocked}
          bind:value={conditionsText} 
          class="editable-input text-ticket-navy text-[13px] underline text-center cursor-pointer font-semibold decoration-ticket-navy {isLocked ? 'pointer-events-none select-none' : ''}" 
          style="width: 100%;" 
        />
      </div>

    </main>

    <!-- 3. Bottom Fixed App Tabbar (4 tabs with click/double-tap logic) -->
    <footer class="bg-white border-t border-gray-150 h-16 w-full absolute bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2 text-[10px]">
      
      <!-- Tab 1: Planer -->
      <button 
        onclick={() => activeTab = 'planer'}
        class="flex flex-col items-center justify-center h-[52px] px-3.5 rounded-[14px] transition duration-150 {activeTab === 'planer' ? 'bg-[#e2e5eb] text-[#0e113b] font-bold' : 'text-[#787c94] hover:text-[#0e113b]'}"
      >
        {#if activeTab === 'planer'}
          <svg class="w-6 h-6" viewBox="0 0 28 28" fill="currentColor">
            <circle cx="14" cy="14" r="10" />
            <path d="M14 6.5 a 1.5 1.5 0 0 1 1.5 1.5 v5.25 h4.25 a 1.5 1.5 0 0 1 0 3 h -5.75 a 1.5 1.5 0 0 1 -1.5 -1.5 v -6.75 a 1.5 1.5 0 0 1 1.5 -1.5 z" fill="#ffffff" />
          </svg>
        {:else}
          <svg class="w-6 h-6" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="14" cy="14" r="10" />
            <path d="M14 8v6h5" />
          </svg>
        {/if}
        <span class="mt-0.5 leading-none">{t.planer}</span>
      </button>

      <!-- Tab 2: Meine Reise -->
      <button 
        onclick={() => activeTab = 'meineReise'}
        class="flex flex-col items-center justify-center h-[52px] px-3.5 rounded-[14px] transition duration-150 {activeTab === 'meineReise' ? 'bg-[#e2e5eb] text-[#0e113b] font-bold' : 'text-[#787c94] hover:text-[#0e113b]'}"
      >
        {#if activeTab === 'meineReise'}
          <svg class="w-6 h-6" viewBox="0 0 28 28" fill="currentColor">
            <path d="M10 7V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2h-8z" />
            <rect x="6" y="7" width="16" height="16" rx="3" />
            <rect x="10.2" y="11" width="1.6" height="8" rx="0.5" fill="#ffffff" />
            <rect x="16.2" y="11" width="1.6" height="8" rx="0.5" fill="#ffffff" />
            <rect x="8" y="23" width="2" height="2" rx="0.5" />
            <rect x="18" y="23" width="2" height="2" rx="0.5" />
          </svg>
        {:else}
          <svg class="w-6 h-6" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 7V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" />
            <rect x="6" y="7" width="16" height="16" rx="3" />
            <line x1="11" y1="11" x2="11" y2="19" />
            <line x1="17" y1="11" x2="17" y2="19" />
            <line x1="9" y1="23" x2="9" y2="25" />
            <line x1="19" y1="23" x2="19" y2="25" />
          </svg>
        {/if}
        <span class="mt-0.5 leading-none">{t.meineReise}</span>
      </button>

      <!-- Tab 3: Mein Pass -->
      <button 
        onclick={handleMeinPassClick}
        class="flex flex-col items-center justify-center h-[52px] px-3.5 rounded-[14px] transition duration-150 {activeTab === 'meinPass' ? 'bg-[#e2e5eb] text-[#0e113b] font-bold' : 'text-[#787c94] hover:text-[#0e113b]'}"
      >
        {#if activeTab === 'meinPass'}
          <svg class="w-6 h-6" viewBox="0 0 28 28" fill="currentColor">
            <rect x="6" y="4" width="16" height="20" rx="3" />
            <circle cx="14" cy="14" r="5" fill="none" stroke="#ffffff" stroke-width="1.2" />
            <line x1="14" y1="9" x2="14" y2="19" stroke="#ffffff" stroke-width="1.2" />
            <line x1="9" y1="14" x2="19" y2="14" stroke="#ffffff" stroke-width="1.2" />
            <path d="M14 9c1.5 1.5 2.5 3 2.5 5s-1 3.5-2.5 5" fill="none" stroke="#ffffff" stroke-width="1.2" />
            <path d="M14 9c-1.5 1.5-2.5 3-2.5 5s1 3.5 2.5 5" fill="none" stroke="#ffffff" stroke-width="1.2" />
          </svg>
        {:else}
          <svg class="w-6 h-6" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="4" width="16" height="20" rx="3" />
            <circle cx="14" cy="14" r="4.5" stroke-width="1.8" />
            <line x1="14" y1="9.5" x2="14" y2="18.5" stroke-width="1.5" />
            <line x1="9.5" y1="14" x2="18.5" y2="14" stroke-width="1.5" />
            <path d="M14 9.5c1.2 1.2 2 2.5 2 4.5s-0.8 3.3-2 4.5" stroke-width="1.5" />
            <path d="M14 9.5c-1.2 1.2-2 2.5-2 4.5s0.8 3.3 2 4.5" stroke-width="1.5" />
          </svg>
        {/if}
        <span class="mt-0.5 leading-none">{t.meinPass}</span>
      </button>

      <!-- Tab 4: Mehr -->
      <button 
        onclick={handleMehrClick}
        class="flex flex-col items-center justify-center h-[52px] px-3.5 rounded-[14px] transition duration-150 {activeTab === 'mehr' ? 'bg-[#e2e5eb] text-[#0e113b] font-bold' : 'text-[#787c94] hover:text-[#0e113b]'}"
      >
        {#if activeTab === 'mehr'}
          <svg class="w-6 h-6" viewBox="0 0 28 28" fill="currentColor">
            <rect x="4" y="6.5" width="20" height="3" rx="1.5" />
            <rect x="4" y="12.5" width="20" height="3" rx="1.5" />
            <rect x="4" y="18.5" width="20" height="3" rx="1.5" />
          </svg>
        {:else}
          <svg class="w-6 h-6" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="8" x2="23" y2="8" />
            <line x1="5" y1="14" x2="23" y2="14" />
            <line x1="5" y1="20" x2="23" y2="20" />
          </svg>
        {/if}
        <span class="mt-0.5 leading-none">{t.mehr}</span>
      </button>

    </footer>

  </div>

  <!-- Mobile landscape orientation lock overlay -->
  <div class="hidden max-lg:landscape:flex fixed inset-0 bg-[#0d0916] z-[9999] flex-col items-center justify-center text-white p-6 text-center select-none">
    <div class="text-4xl mb-4 animate-bounce">📱🔄</div>
    <h3 class="font-bold text-lg mb-2">{t.rotateTitle}</h3>
    <p class="text-xs text-gray-400 max-w-xs leading-relaxed">
      {t.rotateDesc}
    </p>
  </div>

</div>
