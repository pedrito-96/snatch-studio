<script setup lang="ts">
import { useLoop } from "@tresjs/core";
import * as THREE from "three";

const logoGroupRef = ref<THREE.Group | null>(null);

const material = new THREE.MeshStandardMaterial({
  color: 0x111111,
  metalness: 0.9,
  roughness: 0.2,
});

// Transparent shadow-only material for the plane
const shadowPlaneMaterial = new THREE.ShadowMaterial({
  opacity: 0.25,
  color: 0x0000000,
});

const { onBeforeRender } = useLoop();

onBeforeRender(({ elapsed }) => {
  if (logoGroupRef.value) {
    logoGroupRef.value.rotation.y = Math.sin(elapsed * 0.5) * 0.1;
    logoGroupRef.value.rotation.x = Math.sin(elapsed * 0.5) * 0.1;
  }
});
</script>

<template>
  <TresGroup ref="logoGroupRef">
    <TresMesh :position="[0, -0.65, 0]" cast-shadow>
      <TresSphereGeometry :args="[0.55, 64, 64]" />
      <primitive :object="material" />
    </TresMesh>

    <TresMesh
      :rotation="[0, 0, Math.PI * 1.98]"
      :position="[0.08, 0.6, 0]"
      cast-shadow
    >
      <TresTorusGeometry :args="[1, 0.22, 32, 128, Math.PI * 1.3]" />
      <primitive :object="material" />
    </TresMesh>

    <TresMesh :rotation="[0, 0, -Math.PI]" :position="[0, -0.7, 0]" cast-shadow>
      <TresTorusGeometry :args="[1, 0.22, 32, 128, Math.PI * 1.5]" />
      <primitive :object="material" />
    </TresMesh>
  </TresGroup>

  <!-- Shadow receiver plane, sits just below the logo -->
  <TresMesh
    :position="[0, -1.4, 0]"
    :rotation="[-Math.PI / 2, 0, 0]"
    receive-shadow
  >
    <TresPlaneGeometry :args="[100, 100]" />
    <primitive :object="shadowPlaneMaterial" />
  </TresMesh>
</template>
