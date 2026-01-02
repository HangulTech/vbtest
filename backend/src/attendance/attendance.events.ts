export const EVENT_TYPE = {
  ENTER_SCHOOL: 'ENTER_SCHOOL',
  EXIT_SCHOOL: 'EXIT_SCHOOL',
  BOARD_BUS: 'BOARD_BUS',
  DROP_BUS: 'DROP_BUS'
} as const;

export const EVENT_SOURCE = {
  SYSTEM: 'SYSTEM',        // generic for now
  MANUAL: 'MANUAL'
} as const;

export type EventType = typeof EVENT_TYPE[keyof typeof EVENT_TYPE];
export type EventSource = typeof EVENT_SOURCE[keyof typeof EVENT_SOURCE];
