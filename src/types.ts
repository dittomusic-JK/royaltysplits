export type Plan = 'Starter' | 'Pro' | 'Label' | 'DittoPlusRLS'
export type ServiceStatus = 'available' | 'active' | 'unavailable'
export type ModalStep = 'select' | 'add' | 'upgrade'

export interface LabelOption {
  name: string
  isBeatportLabel: boolean
}
