<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

useHead({
  title: "Snatch Studio",
});

useSeoMeta({
  title: "Snatch Studio",
  description: "Snatch Studio - Fisioterapia e Riabilitazione",
});

// Reactive light positions
const light1Position = ref<[number, number, number]>([2, 4, 5]);
const light2Position = ref<[number, number, number]>([-5, 2, -3]);

// Scroll state
const scrollY = ref(0);
const targetScrollY = ref(0);
const animationFrameId = ref<number | null>(null);

function useLightScroll() {
  const LERP_FACTOR = 0.05; // Smoothing factor (0 = no movement, 1 = instant)

  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  function updateLights() {
    // Smooth scroll interpolation
    scrollY.value = lerp(scrollY.value, targetScrollY.value, LERP_FACTOR);

    const t = scrollY.value * 0.001; // Normalize scroll value

    // Light 1: orbits in a circular arc on scroll
    light1Position.value = [
      5 + Math.sin(t) * 5,
      4 + Math.cos(t * 0.7) * 2,
      5 + Math.cos(t) * 3,
    ];

    // Light 2: counter-orbits for dynamic contrast
    light2Position.value = [
      -5 + Math.cos(t * 1.2) * 4,
      2 + Math.sin(t * 0.5) * 3,
      -3 + Math.sin(t * 0.8) * 4,
    ];

    animationFrameId.value = requestAnimationFrame(updateLights);
  }

  function onWheel(event: WheelEvent) {
    targetScrollY.value += event.deltaY;
  }

  onMounted(() => {
    window.addEventListener("wheel", onWheel, { passive: true });
    animationFrameId.value = requestAnimationFrame(updateLights);
  });

  onUnmounted(() => {
    window.removeEventListener("wheel", onWheel);
    if (animationFrameId.value !== null) {
      cancelAnimationFrame(animationFrameId.value);
    }
  });
}

useLightScroll();
</script>

<template>
  <div class="h-screen w-screen overflow-hidden overscroll-none">
    <TresCanvas
      :clear-color="0xf0f0f0"
      :antialias="true"
      window-prefetch
      shadows
    >
      <TresPerspectiveCamera
        :position="[0, 0, 4.5]"
        :fov="75"
        :near="0.1"
        :far="1000"
      />

      <TresAmbientLight :intensity="0.8" />

      <!-- shadows prop enables shadow casting on directional lights -->
      <TresDirectionalLight
        :position="light1Position"
        :intensity="2"
        cast-shadow
      />
      <!-- <TresDirectionalLight
        :position="light2Position"
        :intensity="1.5"
        cast-shadow
      /> -->

      <Logo3D />
    </TresCanvas>
  </div>
</template>
