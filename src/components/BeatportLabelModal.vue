<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
      @click="$emit('close')"
    >
      <div
        class="bg-white rounded-2xl p-6 w-[480px] max-h-[90vh] overflow-y-auto shadow-xl"
        @click.stop
      >
        <!-- Select Step -->
        <template v-if="step === 'select'">
          <h2 class="text-2xl font-bold text-[#101F3C] font-['Poppins'] mb-2">
            Create a Beatport Label
          </h2>
          <p class="text-sm text-[#626984] font-['Satoshi-Regular'] mb-6">
            Upgrade one of your existing labels or add a new one. The label you select for Beatport here will overwrite any previously added for this release across all platforms.
          </p>
          
          <div class="flex flex-col gap-3 mb-6">
            <div
              v-for="label in existingLabels"
              :key="label.name"
              @click="selectedLabel = label.name"
              class="flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all"
              :class="selectedLabel === label.name ? 'border-[#2680EB] bg-[#2680EB]/5' : 'border-[#D2D2E3] hover:border-[#2680EB]'"
            >
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-[#101F3C] font-['Satoshi-Regular']">
                  {{ label.name }}
                </span>
                <img
                  v-if="label.isBeatportLabel"
                  src="/images/beatporticon.svg"
                  alt="Beatport"
                  class="w-4 h-4"
                />
              </div>
              <div class="flex items-center gap-2">
                <svg v-if="selectedLabel === label.name" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.6667 5L7.50001 14.1667L3.33334 10" stroke="#2680EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <ChevronIcon />
              </div>
            </div>
          </div>

          <div
            @click="$emit('update:step', 'add')"
            class="flex items-center justify-center gap-2 p-4 rounded-xl border border-[#D2D2E3] cursor-pointer hover:border-[#2680EB] transition-all"
          >
            <PlusCircleIcon />
            <span class="text-sm font-semibold text-[#101F3C] font-['Satoshi-Regular']">
              Create a Beatport Label
            </span>
          </div>
        </template>

        <!-- Add Step -->
        <template v-else-if="step === 'add'">
          <div class="flex items-center gap-3 mb-6">
            <button @click="$emit('update:step', 'select')" class="p-1 hover:bg-[#F9F9FF] rounded-lg transition-colors">
              <BackIcon />
            </button>
            <h2 class="text-2xl font-bold text-[#101F3C] font-['Poppins']">
              Add Beatport Label
            </h2>
          </div>

          <div class="border-t border-[#D2D2E3] pt-4">
            <div class="mb-4">
              <label class="block text-xs text-[#626984] mb-1 font-['Satoshi-Regular']">
                Label Name
              </label>
              <input
                v-model="newLabelName"
                type="text"
                placeholder="Label Name"
                class="w-full p-3 border-b-2 border-[#D2D2E3] text-sm text-[#101F3C] font-['Satoshi-Regular'] focus:border-[#2680EB] focus:outline-none bg-transparent"
              />
            </div>

            <div class="border-t border-[#D2D2E3] pt-4">
              <h3 class="text-base font-bold text-[#101F3C] font-['Satoshi-Regular'] mb-2">
                Label Artwork
              </h3>
              <p class="text-sm text-[#626984] font-['Satoshi-Regular'] mb-4">
                Your label artwork must be a jpg, jpeg or png file no larger than 5Mb and at least 500x500 pixels in size.
              </p>
              <div class="border-2 border-dashed border-[#D2D2E3] rounded-xl p-8 flex flex-col items-center justify-center">
                <ImageUploadIcon />
                <p class="text-sm text-[#626984] font-['Satoshi-Regular'] text-center">
                  Drag and drop your artwork or<br />
                  <span class="text-[#101F3C] underline cursor-pointer">browse your files</span>
                </p>
              </div>
            </div>
          </div>

          <button
            @click="$emit('addLabel', newLabelName)"
            :disabled="!newLabelName"
            class="w-full mt-6 py-4 rounded-full bg-[#101F3C] text-white font-semibold text-base transition-all hover:bg-[#1a2d4d] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Label
          </button>
        </template>

        <!-- Upgrade Step -->
        <template v-else-if="step === 'upgrade'">
          <div class="flex items-center gap-3 mb-2">
            <button @click="$emit('update:step', 'select')" class="p-1 hover:bg-[#F9F9FF] rounded-lg transition-colors">
              <BackIcon />
            </button>
            <h2 class="text-2xl font-bold text-[#101F3C] font-['Poppins']">
              Upgrade Label
            </h2>
          </div>
          <p class="text-sm text-[#626984] font-['Satoshi-Regular'] mb-4">
            Set up {{ labelToUpgrade }} as a Beatport label.
          </p>

          <div class="border-t border-[#D2D2E3] pt-4">
            <div class="mb-4">
              <label class="block text-xs text-[#626984] mb-1 font-['Satoshi-Regular']">
                Label Name
              </label>
              <div class="flex items-center justify-between p-3 border-b-2 border-[#D2D2E3]">
                <span class="text-sm text-[#101F3C] font-['Satoshi-Regular']">
                  {{ labelToUpgrade }}
                </span>
                <LockIcon />
              </div>
            </div>

            <div class="border-t border-[#D2D2E3] pt-4">
              <h3 class="text-base font-bold text-[#101F3C] font-['Satoshi-Regular'] mb-2">
                Label Artwork
              </h3>
              <p class="text-sm text-[#626984] font-['Satoshi-Regular'] mb-4">
                Your label artwork must be a jpg, jpeg or png file no larger than 5Mb and at least 500x500 pixels in size.
              </p>
              <div class="border-2 border-dashed border-[#D2D2E3] rounded-xl p-8 flex flex-col items-center justify-center">
                <ImageUploadIcon />
                <p class="text-sm text-[#626984] font-['Satoshi-Regular'] text-center">
                  Drag and drop your artwork or<br />
                  <span class="text-[#101F3C] underline cursor-pointer">browse your files</span>
                </p>
              </div>
            </div>
          </div>

          <button
            @click="$emit('upgradeLabel', labelToUpgrade)"
            class="w-full mt-6 py-4 rounded-full bg-[#101F3C] text-white font-semibold text-base transition-all hover:bg-[#1a2d4d]"
          >
            Upgrade Label
          </button>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BackIcon, PlusCircleIcon, LockIcon, ImageUploadIcon, ChevronIcon } from './icons'
import type { LabelOption, ModalStep } from '../types'

defineProps<{
  step: ModalStep
  labelToUpgrade?: string
  existingLabels: LabelOption[]
}>()

defineEmits<{
  close: []
  'update:step': [step: ModalStep]
  selectLabel: [label: string]
  addLabel: [label: string]
  upgradeLabel: [label: string]
}>()

const newLabelName = ref('')
const selectedLabel = ref('')
</script>
