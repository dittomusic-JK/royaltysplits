<template>
  <div ref="dropdownRef" class="relative">
    <div
      @click="isOpen = !isOpen"
      class="flex items-center justify-between p-3 bg-white rounded-xl border cursor-pointer transition-all"
      :class="isOpen ? 'border-[#2680EB]' : 'border-[#D2D2E3] hover:border-[#2680EB]'"
    >
      <span class="text-sm text-[#101F3C] font-['Satoshi-Regular'] truncate pr-2">
        {{ modelValue || placeholder }}
      </span>
      <ChevronIcon :rotated="isOpen" />
    </div>
    <div
      v-if="isOpen"
      class="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-[#D2D2E3] shadow-lg z-50 max-h-[240px] overflow-y-auto"
    >
      <div
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
        class="px-3 py-2.5 text-sm font-['Satoshi-Regular'] cursor-pointer transition-colors"
        :class="option === modelValue ? 'bg-[#2680EB]/10 text-[#2680EB]' : 'text-[#101F3C] hover:bg-[#F9F9FF]'"
      >
        {{ option }}
      </div>
      <div
        v-if="addNewLabel"
        @click="handleAddNew"
        class="px-3 py-2.5 text-sm font-semibold text-[#2680EB] font-['Satoshi-Regular'] cursor-pointer transition-colors hover:bg-[#2680EB]/5 border-t border-[#D2D2E3]"
      >
        + {{ addNewLabel }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronIcon } from './icons'

const props = withDefaults(defineProps<{
  modelValue: string
  options: string[]
  placeholder?: string
  addNewLabel?: string
}>(), {
  placeholder: 'Select...'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  addNew: []
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const selectOption = (option: string) => {
  emit('update:modelValue', option)
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
