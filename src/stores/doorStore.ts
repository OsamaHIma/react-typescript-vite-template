import { proxy } from 'valtio'

export type DoorModel = 'Elite' | 'CNC' | 'LinePivot' | 'AluTrim' | 'Collage' | 'FrameGlass' | 'Hospital' | 'Frameless' | 'Hotel' | 'Vacum' | 'Outdoor'
export type ColorTarget = 'Both' | 'Door' | 'Frame'
export type HandleColor = 'Black' | 'Gold' | 'Copper' | 'Silver'
export type ArchitraveName = 'CL' | 'FH' | 'SA' | 'IK'

export interface DoorState {
  doorModel: DoorModel
  colorTarget: ColorTarget
  doorColor: string
  frameColor: string
  pattern: string
  background: string
  architrave: ArchitraveName
  handle: boolean
  handleColor: HandleColor
}

export const DoorStore = proxy<DoorState>({
  doorModel: 'Elite',
  colorTarget: 'Both',
  doorColor: '#8B4513',
  frameColor: '#FFFFFF',
  pattern: '',
  background: 'bg.png',
  architrave: 'CL',
  handle: true,
  handleColor: 'Black'
})