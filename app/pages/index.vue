<script setup lang="ts">
useHead({
  title: 'Snatch Studio'
})

useSeoMeta({
  title: 'Snatch Studio',
  description: 'Snatch Studio - Fisioterapia e Riabilitazione'
})
</script>

<template>
  <div class="h-screen w-screen overflow-hidden">
    <TresCanvas
      :clear-color="0xf0f0f0"
      :antialias="true"
      window-prefetch
    >
      <TresPerspectiveCamera
        :position="[0, 0, 4.5]"
        :fov="75"
        :near="0.1"
        :far="1000"
      />

      <TresAmbientLight :intensity="0.8" />

      <TresDirectionalLight
        :position="[2, 4, 5]"
        :intensity="2"
      />

      <TresDirectionalLight
        :position="[-5, 2, -3]"
        :intensity="1.5"
      />

      <Logo3D />
    </TresCanvas>
  </div>
</template>
