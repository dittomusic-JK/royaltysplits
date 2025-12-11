<template>
  <div ref="dropdownRef" class="relative">
    <div
      @click="isOpen = !isOpen"
      class="flex items-center justify-between p-3 bg-white rounded-xl border cursor-pointer transition-all"
      :class="isOpen ? 'border-[#2680EB]' : 'border-[#D2D2E3] hover:border-[#2680EB]'"
    >
      <div class="flex items-center gap-2 truncate pr-2">
        <span class="text-sm text-[#101F3C] font-['Satoshi-Regular'] truncate">
          {{ modelValue || 'Select label...' }}
        </span>
        <img
          v-if="selectedOption?.isBeatportLabel"
          src="/images/beatporticon.svg"
          alt="Beatport"
          class="w-4 h-4 shrink-0"
        />
      </div>
      <ChevronIcon :rotated="isOpen" />
    </div>
    <div
      v-if="isOpen"
      class="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-[#D2D2E3] shadow-lg z-50 max-h-[240px] overflow-y-auto"
    >
      <div
        v-for="option in options"
        :key="option.name"
        @click="handleSelect(option)"
        class="flex items-center justify-between px-3 py-2.5 text-sm font-['Satoshi-Regular'] cursor-pointer transition-colors"
        :class="option.name === modelValue ? 'bg-[#2680EB]/10 text-[#2680EB]' : 'text-[#101F3C] hover:bg-[#F9F9FF]'"
      >
        <span class="truncate">{{ option.name }}</span>
        <img
          v-if="option.isBeatportLabel"
          src="/images/beatporticon.svg"
          alt="Beatport"
          class="w-4 h-4 shrink-0 ml-2"
        />
      </div>
      <div
        @click="handleAddNew"
        class="px-3 py-2.5 text-sm font-semibold text-[#2680EB] font-['Satoshi-Regular'] cursor-pointer transition-colors hover:bg-[#2680EB]/5 border-t border-[#D2D2E3]"
      >
        + Add New Beatport Label
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronIcon } from './icons'
import type { LabelOption } from '../types'

const props = defineProps<{
  modelValue: string
  options: LabelOption[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  upgradeLabel: [label: string]
  addNew: []
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const selectedOption = computed(() => props.options.find(o => o.name === props.modelValue))

const handleSelect = (option: LabelOption) => {
  if (option.isBeatportLabel) {
    emit('update:modelValue', option.name)
  } else {
    emit('upgradeLabel', option.name)
  }
  isOpen.value = false
}

const handleAddNew = () => {
  emit('addNew')
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>
