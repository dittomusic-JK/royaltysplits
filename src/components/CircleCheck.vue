<template>
  <div
    @click.stop="onClick"
    class="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[3px] flex items-center justify-center transition-all bg-white"
    :class="[
      checked
        ? 'border-[#2680EB]'
        : disabled
        ? 'border-[#D2D2E3]'
        : 'border-[#D2D2E3] hover:border-[#2680EB]',
      disabled ? 'opacity-50' : 'cursor-pointer'
    ]"
  >
    <svg v-if="checked" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17L4 12"
        stroke="#2680EB"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  checked: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()

const onClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>
