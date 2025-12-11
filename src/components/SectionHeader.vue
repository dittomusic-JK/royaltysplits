<template>
  <div class="mb-4">
    <h2 class="text-[18px] font-bold text-[#101F3C] font-['Poppins']">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-1 text-[14px] text-[#626984] font-['Satoshi-Regular']">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>
