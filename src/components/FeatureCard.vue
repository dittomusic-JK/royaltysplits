<template>
  <div
    @click="!disabled ? $emit('toggle') : undefined"
    class="rounded-2xl border border-[#D2D2E3] bg-[#F9F9FF] p-3 sm:p-4 overflow-visible"
    :class="disabled ? 'opacity-70' : 'cursor-pointer hover:border-[#2680EB]'"
  >
    <div class="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
      <div class="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <div class="w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center mt-0.5 sm:mt-0">
          <slot name="icon" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-wrap">
            <h3 class="text-[14px] sm:text-[16px] font-bold text-[#101F3C] font-['Satoshi-Regular']">
              {{ title }}
            </h3>
            <PlanBadge v-if="badge" :text="badge" :variant="badgeVariant" />
          </div>
          <p class="mt-1 text-[13px] sm:text-[14px] text-[#626984] font-['Satoshi-Regular'] leading-relaxed">
            {{ description }}
          </p>
          <a
            v-if="disabled && disabledMessage && disabledMessageIsLink"
            href="#"
            class="mt-1 block text-xs text-[#955FFF] font-['Satoshi-Regular'] underline hover:text-[#7B4FD9]"
          >
            {{ disabledMessage }}
          </a>
          <p
            v-else-if="disabled && disabledMessage"
            class="mt-1 text-xs text-[#626984] font-['Satoshi-Regular'] italic"
          >
            {{ disabledMessage }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <span v-if="isFree" class="text-[13px] sm:text-[14px] font-bold text-[#00FF99] font-['Satoshi-Regular']">
          Free
        </span>
        <span v-else-if="price" class="text-[13px] sm:text-[14px] font-bold text-[#101F3C] font-['Satoshi-Regular']">
          {{ price }}
        </span>
        <CircleCheck :checked="checked" :disabled="disabled" @click="$emit('toggle')" />
      </div>
    </div>
    <div v-if="$slots.default" class="mt-5 overflow-visible">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlanBadge from './PlanBadge.vue'
import CircleCheck from './CircleCheck.vue'

withDefaults(defineProps<{
  title: string
  badge?: string
  badgeVariant?: 'green' | 'grey'
  description: string
  checked: boolean
  disabled?: boolean
  disabledMessage?: string
  disabledMessageIsLink?: boolean
  price?: string
  isFree?: boolean
}>(), {
  badgeVariant: 'green'
})

defineEmits<{
  toggle: []
}>()
</script>
