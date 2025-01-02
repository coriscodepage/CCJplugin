export interface Match {
    matchid: KITEM<"s32">
    jointype: KITEM<"s32">
    globalip: KITEM<"str">
    globalport: KITEM<"s32">
    hostouttime: KITEM<"s64">
}