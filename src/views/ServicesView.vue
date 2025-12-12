<template>
  <div class="bg-white min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center">
    <!-- Plan selector tabs -->
    <div class="flex gap-2 mb-6">
      <button
        v-for="p in plans"
        :key="p"
        @click="plan = p"
        class="px-4 py-2 rounded-full text-sm font-semibold font-satoshi transition-colors"
        :class="plan === p 
          ? 'bg-ditto-purple text-white' 
          : 'bg-light-grey text-ditto-grey hover:bg-faded-grey'"
      >
        {{ p }}
      </button>
    </div>
    
    <ServicesTab :plan="plan" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Plan } from '../types'
import ServicesTab from '../components/ServicesTab.vue'

const plans: Plan[] = ['Starter', 'Pro', 'Label', 'DittoPlusRLS']
const plan = ref<Plan>('Starter')
</script>
