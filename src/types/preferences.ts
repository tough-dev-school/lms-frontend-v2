import type { TablerIconComponent } from 'vue-tabler-icons';

export interface RadioOption {
  value: string;
  label: string;
  icon: TablerIconComponent;
}

export interface VRadioSwitchProps {
  modelValue: string;
  options: RadioOption[];
}

export enum DarkMode {
  Auto = 'auto',
  Light = 'light',
  Dark = 'dark',
}
