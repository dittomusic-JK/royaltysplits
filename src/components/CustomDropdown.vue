<template>
  <div ref="dropdownRef" class="relative">
    <div
      @click="options.length > 0 ? (isOpen = !isOpen) : undefined"
      class="flex items-center justify-between p-3 bg-white rounded-xl border cursor-pointer transition-all"
      :class="borderClass"
    >
      <span 
        class="text-sm font-satoshi truncate pr-2"
        :class="modelValue ? 'text-ditto-blue' : 'text-ditto-grey'"
      >
        {{ modelValue || placeholder }}
      </span>
      <div class="flex items-center gap-2">
        <div
          v-if="hasWarning"
          class="w-5 h-5 rounded-full bg-brand-secondary text-white flex items-center justify-center text-xs font-bold"
        >
          !
        </div>
        <div
          v-if="hasError"
          class="w-5 h-5 rounded-full bg-error text-white flex items-center justify-center text-xs font-bold"
        >
          !
        </div>
        <ChevronIcon v-if="options.length > 0" :rotated="isOpen" />
      </div>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronIcon } from './icons'

const props = withDefaults(defineProps<{
  modelValue: string
  options: string[]
  placeholder?: string
  addNewLabel?: string
  hasWarning?: boolean
  hasError?: boolean
}>(), {
  placeholder: 'Select...'
})

const borderClass = computed(() => {
  if (props.hasError) return 'border-error'
  if (props.hasWarning) return 'border-warning'
  if (isOpen.value) return 'border-brand-secondary'
  return 'border-faded-grey hover:border-brand-secondary'
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
