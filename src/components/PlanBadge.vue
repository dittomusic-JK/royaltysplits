<template>
  <span
    class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide"
    :class="variant === 'green' ? 'bg-[#00FF99] text-[#101F3C]' : 'bg-[#D2D2E3] text-[#626984]'"
  >
    {{ text }}
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  text: string
  variant?: 'green' | 'grey'
}>(), {
  variant: 'green'
})
</script>
