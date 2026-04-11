<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

useHead({
  title: "Snatch Studio",
});

useSeoMeta({
  title: "Snatch Studio",
  description: "Snatch Studio - Fisioterapia e Riabilitazione",
});

const { light1Position, light2Position } = useLightScroll();
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
