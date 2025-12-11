<template>
  <div class="w-full max-w-[820px] px-2 sm:px-4 md:px-0 flex flex-col gap-6 md:gap-8">
    <h1 class="text-2xl font-bold text-[#0e112c] font-['Poppins']">
      Services
    </h1>

    <!-- Charts Registration Section -->
    <div>
      <SectionHeader
        title="Charts Registration"
        description="Register your release with official music charts to track your chart positions."
      />
      <div class="flex flex-col gap-3">
        <ServiceRow
          title="Charts Registration UK / Ireland"
          price="£15"
          :selected="false"
          flag-code="gb"
          status="unavailable"
          unavailable-tooltip="You've already purchased worldwide chart registration"
          @toggle="() => {}"
        >
          <template #icon><ChartsIcon /></template>
        </ServiceRow>
        <ServiceRow
          title="Charts Registration US / Canada"
          price="£15"
          :selected="false"
          flag-code="us"
          status="unavailable"
          unavailable-tooltip="You've already purchased worldwide chart registration"
          @toggle="() => {}"
        >
          <template #icon><ChartsIcon /></template>
        </ServiceRow>
        <ServiceRow
          title="Charts Registration Australia"
          price="£15"
          :selected="false"
          flag-code="au"
          status="unavailable"
          unavailable-tooltip="You've already purchased worldwide chart registration"
          @toggle="() => {}"
        >
          <template #icon><ChartsIcon /></template>
        </ServiceRow>
        <ServiceRow
          title="Charts Registration Worldwide"
          price="£35"
          :selected="false"
          status="active"
          @toggle="() => {}"
        >
          <template #icon><ChartsGlobalIcon /></template>
        </ServiceRow>
      </div>
    </div>

    <!-- Pre-release Downloads Section -->
    <div>
      <SectionHeader
        title="Pre-release Downloads"
        description="Allow fans to download your release before the official release date."
      />
      <ServiceRow
        title="Pre-release Downloads"
        price="£29"
        :selected="false"
        status="unavailable"
        unavailable-tooltip="This release is already live and no longer eligible for a pre-release campaign"
        @toggle="() => {}"
      >
        <template #icon><PreReleaseIcon /></template>
      </ServiceRow>
    </div>

    <!-- Distribution Services Section -->
    <div>
      <SectionHeader
        title="Distribution Services"
        description="Expand your release's reach with additional distribution options."
      />
      <div class="flex flex-col gap-4">
        <!-- Auto-release -->
        <FeatureCard
          title="Auto-release to new platforms"
          badge="Purchased"
          badge-variant="green"
          description="Automatically send this release to any new platforms we add in the future."
          :checked="true"
          :disabled="true"
          @toggle="() => {}"
        >
          <template #icon><AutoReleaseIcon /></template>
        </FeatureCard>

        <!-- Release Protection -->
        <FeatureCard
          title="Release Protection"
          description="Protect your release from unauthorized distribution across all platforms."
          :checked="releaseProtectionSelected"
          price="£10"
          @toggle="releaseProtectionSelected = !releaseProtectionSelected"
        >
          <template #icon><ReleaseProtectionIcon /></template>
        </FeatureCard>

        <!-- YouTube Content ID -->
        <FeatureCard
          title="YouTube Content ID & Shorts"
          description="Get notified & paid if your music is used in YouTube videos. Ad revenue goes to you."
          :checked="youTubeSelected"
          price="£10"
          @toggle="youTubeSelected = !youTubeSelected"
        >
          <template #icon><img src="/images/YoutubeShorts.svg" alt="YouTube" class="w-8 h-8" /></template>
        </FeatureCard>
      </div>
    </div>

    <!-- Advanced Stores Section -->
    <div>
      <SectionHeader
        title="Advanced Stores"
        description="Distribute to specialist music platforms."
      />
      <div class="flex flex-col gap-4">
        <!-- Audio Fingerprint -->
        <FeatureCard
          title="Audio Fingerprint Services"
          description="Register your music with audio fingerprinting services for identification and royalty collection."
          :checked="fingerprintSelected"
          price="£15"
          @toggle="fingerprintSelected = !fingerprintSelected"
        >
          <template #icon><img src="/images/audiofingerprint.svg" alt="Audio Fingerprint" class="w-8 h-8" /></template>
          
          <!-- Fingerprint providers -->
          <div v-if="fingerprintSelected" class="flex flex-wrap gap-2 sm:gap-3 mt-2">
            <div
              v-for="provider in fingerprintProviders"
              :key="provider.name"
              @click.stop="provider.enabled = !provider.enabled"
              class="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-xl border cursor-pointer transition-all"
              :class="provider.enabled ? 'border-brand-secondary' : 'border-faded-grey hover:border-brand-secondary'"
            >
              <img :src="provider.icon" :alt="provider.name" class="w-5 h-5 sm:w-6 sm:h-6" />
              <span class="text-xs sm:text-sm font-medium text-ditto-blue font-satoshi">{{ provider.name }}</span>
              <div
                class="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all bg-white"
                :class="provider.enabled ? 'border-brand-secondary' : 'border-faded-grey'"
              >
                <svg v-if="provider.enabled" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="#287ef7" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </FeatureCard>

        <!-- Beatport -->
        <FeatureCard
          title="Beatport Distribution"
          description="You need a label set up with Beatport to release your music on this store."
          :checked="beatportSelected"
          price="£65"
          @toggle="beatportSelected = !beatportSelected"
        >
          <template #icon><img src="/images/beatport.svg" alt="Beatport" class="w-8 h-8" /></template>
          
          <!-- Beatport form fields -->
          <div
            v-if="beatportSelected"
            class="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-3 md:gap-4 mt-2"
            @click.stop
          >
            <div>
              <label class="block text-xs text-ditto-grey mb-1 font-satoshi">
                Beatport Label
              </label>
              <BeatportLabelDropdown
                v-model="beatportLabel"
                :options="beatportLabelOptions"
                @upgrade-label="handleUpgradeLabel"
                @add-new="openLabelModal"
              />
            </div>
            <div>
              <label class="block text-xs text-ditto-grey mb-1 font-satoshi">
                Primary Genre
              </label>
              <CustomDropdown v-model="beatportPrimaryGenre" :options="beatportGenres" />
            </div>
            <div>
              <label class="block text-xs text-ditto-grey mb-1 font-satoshi">
                Secondary Genre
              </label>
              <CustomDropdown v-model="beatportSecondaryGenre" :options="beatportGenres" />
            </div>
          </div>
        </FeatureCard>
      </div>
    </div>

    <!-- Checkout button -->
    <div v-if="selectedItems.length > 0" class="mt-4 sticky bottom-4">
      <CheckoutButton :item-count="selectedItems.length" :total="`£${totalPrice}`" />
    </div>

    <!-- Beatport Label Modal -->
    <BeatportLabelModal
      v-if="labelModalOpen"
      :step="modalStep"
      :label-to-upgrade="labelToUpgrade"
      :existing-labels="beatportLabelOptions"
      @close="labelModalOpen = false"
      @update:step="modalStep = $event"
      @select-label="handleSelectLabel"
      @add-label="handleAddLabel"
      @upgrade-label="handleConfirmUpgradeLabel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import type { LabelOption, ModalStep } from '../types'
import SectionHeader from './SectionHeader.vue'
import ServiceRow from './ServiceRow.vue'
import FeatureCard from './FeatureCard.vue'
import CheckoutButton from './CheckoutButton.vue'
import CustomDropdown from './CustomDropdown.vue'
import BeatportLabelDropdown from './BeatportLabelDropdown.vue'
import BeatportLabelModal from './BeatportLabelModal.vue'
import { ChartsIcon, ChartsGlobalIcon, PreReleaseIcon, AutoReleaseIcon, ReleaseProtectionIcon } from './icons'

// Purchasable items state
const releaseProtectionSelected = ref(false)
const youTubeSelected = ref(false)
const fingerprintSelected = ref(false)
const beatportSelected = ref(false)

// Fingerprint providers
const fingerprintProviders = reactive([
  { name: 'Jaxsta', icon: '/images/Jaxsta.svg', enabled: true },
  { name: 'ACRCloud', icon: '/images/ACRCloud.svg', enabled: true },
  { name: 'SoundCloud', icon: '/images/Soundcloud.svg', enabled: true },
  { name: 'Gracenote', icon: '/images/Gracenote.svg', enabled: true },
  { name: 'SoundMouse', icon: '/images/SoundMouse.svg', enabled: true },
])

// Beatport form state
const beatportLabel = ref('The Esoteric Order of Dagon Records')
const beatportPrimaryGenre = ref('Trance (Main Floor)')
const beatportSecondaryGenre = ref('Hard Techno')

// Beatport Label Modal state
const labelModalOpen = ref(false)
const modalStep = ref<ModalStep>('select')
const labelToUpgrade = ref<string | undefined>()

// Beatport label options
const beatportLabelOptions = ref<LabelOption[]>([
  { name: 'The Esoteric Order of Dagon Records', isBeatportLabel: true },
  { name: 'Anjunabeats', isBeatportLabel: true },
  { name: 'Drumcode', isBeatportLabel: false },
  { name: 'Defected Records', isBeatportLabel: false },
  { name: "Spinnin' Records", isBeatportLabel: true },
  { name: 'Armada Music', isBeatportLabel: false },
])

const beatportGenres = [
  'Afro House', 'Bass House', 'Breaks / Breakbeat / UK Bass', 'Dance / Pop', 'Deep House',
  'Drum & Bass', 'Dubstep', 'Electro House', 'Electronica', 'Hard Dance / Hardcore',
  'Hard Techno', 'House', 'Indie Dance', 'Melodic House & Techno', 'Minimal / Deep Tech',
  'Nu Disco / Disco', 'Organic House / Downtempo', 'Progressive House', 'Progressive Trance',
  'Psy-Trance', 'Tech House', 'Techno (Peak Time / Driving)', 'Techno (Raw / Deep / Hypnotic)',
  'Trance (Main Floor)', 'Trance (Raw / Deep / Hypnotic)', 'UK Garage / Bassline'
]

// Modal handlers
const openLabelModal = () => {
  modalStep.value = 'select'
  labelModalOpen.value = true
}

const handleUpgradeLabel = (labelName: string) => {
  labelToUpgrade.value = labelName
  modalStep.value = 'upgrade'
  labelModalOpen.value = true
}

const handleSelectLabel = (labelName: string) => {
  beatportLabel.value = labelName
  labelModalOpen.value = false
}

const handleAddLabel = (labelName: string) => {
  beatportLabelOptions.value.push({ name: labelName, isBeatportLabel: true })
  beatportLabel.value = labelName
  labelModalOpen.value = false
}

const handleConfirmUpgradeLabel = (labelName: string) => {
  const label = beatportLabelOptions.value.find(l => l.name === labelName)
  if (label) label.isBeatportLabel = true
  beatportLabel.value = labelName
  labelModalOpen.value = false
}

// Calculate checkout total
const selectedItems = computed(() => {
  const items: { name: string; price: number }[] = []
  if (releaseProtectionSelected.value) items.push({ name: 'Release Protection', price: 10 })
  if (youTubeSelected.value) items.push({ name: 'YouTube Content ID', price: 10 })
  if (fingerprintSelected.value) items.push({ name: 'Audio Fingerprint', price: 15 })
  if (beatportSelected.value) items.push({ name: 'Beatport', price: 65 })
  return items
})

const totalPrice = computed(() => selectedItems.value.reduce((sum, item) => sum + item.price, 0))
</script>
