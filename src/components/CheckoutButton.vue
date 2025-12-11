<template>
  <button
    @click="$emit('click')"
    :disabled="itemCount === 0"
    class="w-full py-4 rounded-xl text-white font-semibold text-base transition-all flex items-center justify-center gap-2"
    :class="itemCount > 0 ? 'bg-[#6c5ce7] hover:bg-[#5b4cdb] cursor-pointer' : 'bg-[#d1d5db] cursor-not-allowed'"
  >
    <CartIcon />
    <span v-if="itemCount > 0">
      Checkout ({{ itemCount }} item{{ itemCount > 1 ? 's' : '' }}) • {{ total }}
    </span>
    <span v-else>Select add-ons to checkout</span>
  </button>
</template>

<script setup lang="ts">
import { CartIcon } from './icons'

defineProps<{
  itemCount: number
  total: string
}>()

defineEmits<{
  click: []
}>()
</script>
