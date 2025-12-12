<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
      @click="$emit('close')"
    >
      <div
        class="bg-white rounded-2xl p-4 sm:p-6 w-full sm:w-[520px] max-w-[95vw] max-h-[90vh] overflow-y-auto shadow-xl mx-2 sm:mx-0"
        @click.stop
      >
        <h2 class="text-lg sm:text-xl font-bold text-ditto-blue font-poppins mb-2">
          Copy Splits
        </h2>
        
        <!-- Source info with splits preview -->
        <div class="mb-5">
          <p class="text-sm text-ditto-grey font-satoshi mb-2">
            Copying from <strong class="text-ditto-blue">{{ sourceTrackName }}</strong>
          </p>
          
          <!-- Splits being copied -->
          <div class="flex flex-wrap gap-1.5">
            <!-- You -->
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-secondary/10 text-xs font-satoshi text-brand-secondary">
              <span class="font-medium">You</span>
              <span>{{ sourceUserShare }}%</span>
            </span>
            <!-- Collaborators -->
            <span 
              v-for="split in sourceSplits" 
              :key="split.id"
              class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-lighter-grey text-xs font-satoshi text-ditto-blue"
            >
              <span class="font-medium">{{ split.name }}</span>
              <span class="text-ditto-grey">{{ split.share }}%</span>
            </span>
          </div>
        </div>

        <!-- Target tracks selection -->
        <div class="mb-5">
          <div class="flex items-center justify-between mb-3">
            <p class="text-sm font-semibold text-ditto-blue font-satoshi">Select tracks to copy to:</p>
            <button 
              @click="toggleSelectAll"
              class="text-xs font-medium text-brand-secondary hover:underline font-satoshi"
            >
              {{ allSelected ? 'Deselect all' : 'Select all' }}
            </button>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <button
              v-for="track in targetTracks"
              :key="track.trackId"
              @click="toggleTrack(track.trackId)"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium font-satoshi cursor-pointer transition-all border"
              :class="selectedTracks.has(track.trackId) 
                ? 'border-brand-secondary bg-brand-secondary/10 text-brand-secondary' 
                : 'border-faded-grey bg-light-grey text-ditto-grey hover:border-brand-secondary/50'"
            >
              <!-- Small checkmark when selected -->
              <svg 
                v-if="selectedTracks.has(track.trackId)" 
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                class="shrink-0"
              >
                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              
              <!-- Track number + name -->
              <span class="text-xs opacity-60">{{ track.trackNumber }}.</span>
              <span class="truncate max-w-[120px]">{{ track.trackName }}</span>
              
              <span 
                v-if="track.splits.length > 0" 
                class="relative group/badge text-[10px] font-medium text-amber-700 bg-amber-200/50 px-1.5 py-0.5 rounded shrink-0 cursor-help"
              >
                {{ track.splits.length }}
                <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-ditto-blue text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none z-20">
                  {{ track.splits.length }} existing split{{ track.splits.length > 1 ? 's' : '' }} on this track
                </span>
              </span>
            </button>
          </div>
        </div>
        
        <!-- Conflict handling (only show if selected tracks have existing splits) -->
        <div v-if="selectedHaveConflicts" class="mb-5">
          <p class="text-sm font-semibold text-ditto-blue font-satoshi mb-3">How to handle existing splits:</p>
          
          <div class="space-y-2">
            <div
              @click="copyMode = 'add'"
              class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all"
              :class="copyMode === 'add' ? 'border-brand-secondary bg-lighter-grey' : 'border-faded-grey bg-white hover:border-brand-secondary/50'"
            >
              <div
                class="w-6 h-6 rounded-full border-[2.5px] flex items-center justify-center transition-all shrink-0"
                :class="copyMode === 'add' ? 'border-brand-secondary bg-white' : 'border-faded-grey bg-white'"
              >
                <svg v-if="copyMode === 'add'" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="#6C5CE7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-ditto-blue font-satoshi">Add to existing</p>
                <p class="text-xs text-ditto-grey font-satoshi">Keep current splits and add new ones</p>
              </div>
            </div>
            
            <div
              @click="copyMode = 'replace'"
              class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all"
              :class="copyMode === 'replace' ? 'border-brand-secondary bg-lighter-grey' : 'border-faded-grey bg-white hover:border-brand-secondary/50'"
            >
              <div
                class="w-6 h-6 rounded-full border-[2.5px] flex items-center justify-center transition-all shrink-0"
                :class="copyMode === 'replace' ? 'border-brand-secondary bg-white' : 'border-faded-grey bg-white'"
              >
                <svg v-if="copyMode === 'replace'" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="#6C5CE7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-ditto-blue font-satoshi">Replace existing</p>
                <p class="text-xs text-ditto-grey font-satoshi">Remove current splits and use new ones</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2 border-t border-faded-grey">
          <button
            @click="$emit('close')"
            class="px-6 py-2.5 border border-faded-grey rounded-full text-sm font-semibold text-ditto-grey font-satoshi hover:border-ditto-blue hover:text-ditto-blue transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleConfirm"
            :disabled="selectedTracks.size === 0"
            class="px-6 py-2.5 bg-ditto-blue text-white rounded-full text-sm font-semibold font-satoshi transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ditto-blue/90"
          >
            Copy to {{ selectedTracks.size }} Track{{ selectedTracks.size !== 1 ? 's' : '' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { TrackSplit, Collaborator } from '../../types'

const props = defineProps<{
  sourceTrackName: string
  sourceUserShare: number
  sourceSplits: Collaborator[]
  targetTracks: TrackSplit[]
}>()

const emit = defineEmits<{
  close: []
  confirm: [mode: 'add' | 'replace', selectedTrackIds: string[]]
}>()

const copyMode = ref<'add' | 'replace'>('add')
const selectedTracks = ref<Set<string>>(new Set())

// Pre-select all tracks on mount
onMounted(() => {
  props.targetTracks.forEach(t => selectedTracks.value.add(t.trackId))
})

const toggleTrack = (trackId: string) => {
  if (selectedTracks.value.has(trackId)) {
    selectedTracks.value.delete(trackId)
  } else {
    selectedTracks.value.add(trackId)
  }
  // Force reactivity
  selectedTracks.value = new Set(selectedTracks.value)
}

const allSelected = computed(() => 
  selectedTracks.value.size === props.targetTracks.length
)

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedTracks.value = new Set()
  } else {
    selectedTracks.value = new Set(props.targetTracks.map(t => t.trackId))
  }
}

const selectedHaveConflicts = computed(() => 
  props.targetTracks
    .filter(t => selectedTracks.value.has(t.trackId))
    .some(t => t.splits.length > 0)
)

const handleConfirm = () => {
  emit('confirm', copyMode.value, Array.from(selectedTracks.value))
}
</script>
