<template>
  <!-- Desktop layout -->
  <div class="hidden sm:grid grid-cols-[1fr_1fr_auto] gap-4 items-start py-3">
    <!-- Name field -->
    <div>
      <label class="block text-xs text-ditto-grey mb-1 font-satoshi">Name:</label>
      <input
        v-if="isEditable"
        v-model="localName"
        type="text"
        placeholder="Enter name"
        class="w-full text-sm text-ditto-blue font-satoshi border-b border-faded-grey pb-1 focus:border-brand-secondary focus:outline-none bg-transparent"
        @input="emitUpdate"
      />
      <span v-else class="text-sm text-ditto-blue font-satoshi">{{ name }}</span>
    </div>

    <!-- Email field -->
    <div>
      <label class="block text-xs text-ditto-grey mb-1 font-satoshi">Email*</label>
      <input
        v-if="isEditable || (status === 'unclaimed' && canEditEmail)"
        v-model="localEmail"
        type="email"
        placeholder="We'll contact them here"
        class="w-full text-sm text-ditto-blue font-satoshi border-b border-faded-grey pb-1 focus:border-brand-secondary focus:outline-none bg-transparent"
        @input="emitUpdate"
      />
      <span v-else class="text-sm text-ditto-blue font-satoshi">{{ email }}</span>
    </div>

    <!-- Share and status -->
    <div class="flex items-start gap-3">
      <!-- Share input -->
      <div class="text-right">
        <label class="block text-xs text-ditto-grey mb-1 font-satoshi">
          {{ shareLabel }}
        </label>
        <div class="flex items-center gap-1">
          <input
            v-if="isEditable"
            v-model.number="localShare"
            type="number"
            min="0"
            max="100"
            placeholder="0%"
            class="w-12 text-sm text-ditto-blue font-satoshi text-right border-b border-faded-grey pb-1 focus:border-brand-secondary focus:outline-none bg-transparent"
            @input="emitUpdate"
          />
          <span v-else class="text-sm text-ditto-blue font-satoshi">{{ share }}</span>
          <span class="text-sm text-ditto-grey font-satoshi">%</span>
        </div>
      </div>

      <!-- Status indicator -->
      <div v-if="status && !isEditable" class="flex flex-col items-center min-w-[80px]">
        <div
          class="w-2.5 h-2.5 rounded-full mb-1"
          :class="statusDotClass"
        />
        <span class="text-xs text-ditto-grey font-satoshi text-center leading-tight">
          {{ statusText }}
        </span>
      </div>

      <!-- Action buttons -->
      <div class="flex items-center gap-1">
        <!-- Edit share icon (for active splits) -->
        <div v-if="!isEditable && status === 'active'" class="relative group">
          <button
            @click="$emit('edit-share')"
            class="p-1.5 text-ditto-grey hover:text-brand-secondary transition-colors"
          >
            <EditIcon />
          </button>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-ditto-blue text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Edit share
          </div>
        </div>

        <!-- Resend confirmation (for unconfirmed splits) -->
        <div v-if="!isEditable && status === 'unconfirmed'" class="relative group">
          <button
            @click="$emit('resend')"
            class="p-1.5 text-ditto-grey hover:text-brand-secondary transition-colors"
          >
            <SendIcon />
          </button>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-ditto-blue text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Resend confirmation email
          </div>
        </div>

        <!-- Delete button -->
        <div class="relative group">
          <button
            @click="$emit('remove')"
            class="p-1.5 text-error hover:text-error/80 transition-colors"
          >
            <TrashIcon />
          </button>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-ditto-blue text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Remove split
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile layout -->
  <div class="sm:hidden flex flex-col gap-3 py-3">
    <!-- Row 1: Name and Email stacked -->
    <div class="flex gap-3">
      <div class="flex-1">
        <label class="block text-xs text-ditto-grey mb-1 font-satoshi">Name:</label>
        <input
          v-if="isEditable"
          v-model="localName"
          type="text"
          placeholder="Name"
          class="w-full text-sm text-ditto-blue font-satoshi border-b border-faded-grey pb-1 focus:border-brand-secondary focus:outline-none bg-transparent"
          @input="emitUpdate"
        />
        <span v-else class="text-sm text-ditto-blue font-satoshi">{{ name }}</span>
      </div>
      <div class="w-16 shrink-0">
        <label class="block text-xs text-ditto-grey mb-1 font-satoshi">{{ shareLabel }}</label>
        <div class="flex items-center gap-1">
          <input
            v-if="isEditable"
            v-model.number="localShare"
            type="number"
            min="0"
            max="100"
            placeholder="0"
            class="w-10 text-sm text-ditto-blue font-satoshi text-right border-b border-faded-grey pb-1 focus:border-brand-secondary focus:outline-none bg-transparent"
            @input="emitUpdate"
          />
          <span v-else class="text-sm text-ditto-blue font-satoshi">{{ share }}</span>
          <span class="text-sm text-ditto-grey font-satoshi">%</span>
        </div>
      </div>
    </div>

    <!-- Row 2: Email -->
    <div>
      <label class="block text-xs text-ditto-grey mb-1 font-satoshi">Email*</label>
      <input
        v-if="isEditable || (status === 'unclaimed' && canEditEmail)"
        v-model="localEmail"
        type="email"
        placeholder="Email address"
        class="w-full text-sm text-ditto-blue font-satoshi border-b border-faded-grey pb-1 focus:border-brand-secondary focus:outline-none bg-transparent"
        @input="emitUpdate"
      />
      <span v-else class="text-sm text-ditto-blue font-satoshi">{{ email }}</span>
    </div>

    <!-- Row 3: Status and actions (only for non-editable) -->
    <div v-if="!isEditable" class="flex items-center justify-between">
      <!-- Status indicator -->
      <div v-if="status" class="flex items-center gap-2">
        <div
          class="w-2 h-2 rounded-full"
          :class="statusDotClass"
        />
        <span class="text-xs text-ditto-grey font-satoshi">
          {{ statusText }}
        </span>
      </div>
      <div v-else />

      <!-- Action buttons -->
      <div class="flex items-center gap-1">
        <button
          v-if="status === 'active'"
          @click="$emit('edit-share')"
          class="p-1.5 text-ditto-grey hover:text-brand-secondary transition-colors"
        >
          <EditIcon />
        </button>
        <button
          v-if="status === 'unconfirmed'"
          @click="$emit('resend')"
          class="p-1.5 text-ditto-grey hover:text-brand-secondary transition-colors"
        >
          <SendIcon />
        </button>
        <button
          @click="$emit('remove')"
          class="p-1.5 text-error hover:text-error/80 transition-colors"
        >
          <TrashIcon />
        </button>
      </div>
    </div>

    <!-- Row 3 for editable: just the delete button -->
    <div v-else class="flex justify-end">
      <button
        @click="$emit('remove')"
        class="p-1.5 text-error hover:text-error/80 transition-colors"
      >
        <TrashIcon />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { SplitStatus } from '../../types'
import { EditIcon, TrashIcon, SendIcon } from './icons'

const props = withDefaults(defineProps<{
  name: string
  email: string
  share: number
  status?: SplitStatus
  activeSince?: string
  shareIndex?: number
  isEditable?: boolean
  canEditEmail?: boolean
}>(), {
  isEditable: false,
  canEditEmail: false
})

const emit = defineEmits<{
  update: [{ name: string; email: string; share: number }]
  remove: []
  'edit-share': []
  resend: []
}>()

const localName = ref(props.name)
const localEmail = ref(props.email)
const localShare = ref(props.share)

watch(() => props.name, (val) => { localName.value = val })
watch(() => props.email, (val) => { localEmail.value = val })
watch(() => props.share, (val) => { localShare.value = val })

const shareLabel = computed(() => {
  if (props.shareIndex !== undefined) {
    return `Share #${props.shareIndex}`
  }
  return 'Share'
})

const statusDotClass = computed(() => {
  switch (props.status) {
    case 'active': return 'bg-success'
    case 'unconfirmed': return 'bg-error'
    case 'unclaimed': return 'bg-warning'
    default: return 'bg-ditto-grey'
  }
})

// Format date like "10th March 2025" to "Mar '25"
const formatShortDate = (dateStr: string): string => {
  const months: Record<string, string> = {
    'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
    'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
    'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
  }
  for (const [full, short] of Object.entries(months)) {
    if (dateStr.includes(full)) {
      const year = dateStr.match(/\d{4}/)?.[0]?.slice(-2) || ''
      return `${short} '${year}`
    }
  }
  return dateStr
}

const statusText = computed(() => {
  switch (props.status) {
    case 'active':
      return props.activeSince ? `Since ${formatShortDate(props.activeSince)}` : 'Active'
    case 'unconfirmed':
      return 'Pending'
    case 'unclaimed':
      return 'Unclaimed'
    default:
      return ''
  }
})

const emitUpdate = () => {
  emit('update', {
    name: localName.value,
    email: localEmail.value,
    share: localShare.value
  })
}
</script>
