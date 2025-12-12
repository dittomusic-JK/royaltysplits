<template>
  <div class="bg-white min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center">
    <!-- Plan selector tabs -->
    <div class="flex flex-wrap justify-center gap-2 mb-6">
      <button
        v-for="p in plans"
        :key="p.value"
        @click="selectedPlan = p.value"
        class="px-4 py-2 rounded-full text-sm font-semibold font-satoshi transition-colors"
        :class="selectedPlan === p.value 
          ? 'bg-ditto-purple text-white' 
          : 'bg-light-grey text-ditto-grey hover:bg-faded-grey'"
      >
        {{ p.label }}
      </button>
    </div>
    
    <ServicesPurchasedView v-if="selectedPlan === 'Purchased'" />
    <ServicesTab v-else :plan="selectedPlan" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Plan } from '../types'
import ServicesTab from '../components/ServicesTab.vue'
import ServicesPurchasedView from '../components/ServicesPurchasedView.vue'

type PlanOption = Plan | 'Purchased'

const plans: { value: PlanOption; label: string }[] = [
  { value: 'Starter', label: 'Starter' },
  { value: 'Pro', label: 'Pro' },
  { value: 'Label', label: 'Label' },
  { value: 'DittoPlusRLS', label: 'Label Services' },
  { value: 'Purchased', label: 'Purchased' },
]
const selectedPlan = ref<PlanOption>('Starter')
</script>
