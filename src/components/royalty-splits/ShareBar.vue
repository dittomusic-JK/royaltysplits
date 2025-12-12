<template>
  <div class="flex items-center gap-2">
    <!-- Percentage text on left -->
    <span class="text-sm font-semibold text-ditto-purple font-satoshi whitespace-nowrap">
      {{ userShare }}%
    </span>
    <!-- Bar visualization -->
    <div class="flex h-2 w-20 rounded-full overflow-hidden bg-light-grey">
      <div
        v-for="(segment, index) in segments"
        :key="index"
        class="h-full transition-all"
        :style="{ width: `${segment.percentage}%`, backgroundColor: segment.color }"
      />
    </div>
    <!-- Unconfirmed percentage on right if present -->
    <span v-if="unconfirmedShare > 0" class="text-sm font-semibold text-error font-satoshi whitespace-nowrap">
      {{ unconfirmedShare }}%
    </span>
  </div>
</template>

<script setup lang="ts">

interface Segment {
  percentage: number
  color: string
}

withDefaults(defineProps<{
  segments: Segment[]
  userShare: number
  unconfirmedShare?: number
}>(), {
  unconfirmedShare: 0
})
</script>
