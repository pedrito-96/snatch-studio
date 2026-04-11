// composables/useLightScroll.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useLightScroll() {
  const light1Position = ref<[number, number, number]>([2, 4, 5])
  const light2Position = ref<[number, number, number]>([-5, 2, -3])

  const scrollY = ref(0)
  const targetScrollY = ref(0)
  const lastTouchY = ref(0)
  const animationFrameId = ref<number | null>(null)

  const LERP_FACTOR = 0.05

  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t
  }

  function updateLights() {
    scrollY.value = lerp(scrollY.value, targetScrollY.value, LERP_FACTOR)
    const t = scrollY.value * 0.001

    light1Position.value = [
      5 + Math.sin(t) * 5,
      4 + Math.cos(t * 0.7) * 2,
      5 + Math.cos(t) * 3
    ]
    light2Position.value = [
      -5 + Math.cos(t * 1.2) * 4,
      2 + Math.sin(t * 0.5) * 3,
      -3 + Math.sin(t * 0.8) * 4
    ]

    animationFrameId.value = requestAnimationFrame(updateLights)
  }

  function onWheel(event: WheelEvent) {
    targetScrollY.value += event.deltaY
  }

  function onTouchStart(event: TouchEvent) {
    if (!event.touches[0]) return
    lastTouchY.value = event.touches[0].clientY
  }

  function onTouchMove(event: TouchEvent) {
    if (!event.touches[0]) return
    const deltaY = lastTouchY.value - event.touches[0].clientY
    targetScrollY.value += deltaY * 2
    lastTouchY.value = event.touches[0].clientY
  }

  onMounted(() => {
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    animationFrameId.value = requestAnimationFrame(updateLights)
  })

  onUnmounted(() => {
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchmove', onTouchMove)
    if (animationFrameId.value !== null) {
      cancelAnimationFrame(animationFrameId.value)
    }
  })

  return { light1Position, light2Position }
}
