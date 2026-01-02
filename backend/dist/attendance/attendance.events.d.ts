export declare const EVENT_TYPE: {
    readonly ENTER_SCHOOL: "ENTER_SCHOOL";
    readonly EXIT_SCHOOL: "EXIT_SCHOOL";
    readonly BOARD_BUS: "BOARD_BUS";
    readonly DROP_BUS: "DROP_BUS";
};
export declare const EVENT_SOURCE: {
    readonly SYSTEM: "SYSTEM";
    readonly MANUAL: "MANUAL";
};
export type EventType = typeof EVENT_TYPE[keyof typeof EVENT_TYPE];
export type EventSource = typeof EVENT_SOURCE[keyof typeof EVENT_SOURCE];
