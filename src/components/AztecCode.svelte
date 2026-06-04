<script>
  import { onMount } from 'svelte';

  // Seedable random generator (Mulberry32)
  function createSeededRandom(seed) {
    let h = 0;
    for (let i = 0; i < seed.length; i++) {
      h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
    }
    return function() {
      let t = h += 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  let { passNumber = '34CZYN' } = $props();

  let canvas;

  // Re-draw Aztec code when passNumber changes
  $effect(() => {
    if (!canvas) return;
    drawAztec(passNumber);
  });

  function drawAztec(seed) {
    const ctx = canvas.getContext('2d');
    const size = 79; // Width/height in modules
    const scale = 4; // Scale factor for canvas rendering
    canvas.width = size * scale;
    canvas.height = size * scale;

    const rng = createSeededRandom(seed);
    const center = Math.floor(size / 2);

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000000';

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - center;
        const dy = y - center;
        const dist = Math.max(Math.abs(dx), Math.abs(dy));

        let isBlack = false;

        // Aztec Central Finder Pattern (Bullseye)
        if (dist <= 6) {
          if (dist <= 1) {
            isBlack = true; // 3x3 center
          } else if (dist === 2) {
            isBlack = false; // 5x5 white ring
          } else if (dist === 3) {
            isBlack = true; // 7x7 black ring
          } else if (dist === 4) {
            isBlack = false; // 9x9 white ring
          } else if (dist === 5) {
            isBlack = true; // 11x11 black ring
          } else if (dist === 6) {
            isBlack = false; // 13x13 white ring
          }
        } else {
          // Data layers (pseudo-random based on the pass number seed)
          isBlack = rng() > 0.5;

          // Add some structural anchor blocks/orientation marks typical of Aztec
          // e.g. grids lines of reference pixels in outer bounds
          if (x % 16 === 0 || y % 16 === 0) {
            isBlack = (x + y) % 2 === 0;
          }
        }

        if (isBlack) {
          ctx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  }

  onMount(() => {
    drawAztec(passNumber);
  });
</script>

<div class="flex flex-col items-center justify-center p-0 bg-white rounded-lg select-none">
  <canvas 
    bind:this={canvas} 
    class="w-full aspect-square object-contain"
    style="image-rendering: pixelated; image-rendering: crisp-edges;"
  ></canvas>
</div>
