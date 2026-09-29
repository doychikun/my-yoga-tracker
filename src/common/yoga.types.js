export const yogaTypes = {
    DEFAULT_VINYASA_FLOW_YOGA: "yoga flow",
    HATHA_YOGA: "hatha yoga",
    ASHTANGA_YOGA: "ashtanga yoga",
    YIN_YOGA: "yin yoga",
    MINDFULNESS_YOGA: "mindfulness yoga"
};

// Styles a user can log a practice session under.
// `key` is what gets stored in the database, `label` is what the user sees.
export const YOGA_STYLES = [
    { key: "vinyasa", label: "Vinyasa flow" },
    { key: "hatha", label: "Hatha yoga" },
    { key: "ashtanga", label: "Ashtanga yoga" },
    { key: "yin", label: "Yin yoga" },
    { key: "mindfulness", label: "Mindfulness yoga" }
];

// A practice session as stored under sessions/{username}/{id}
// {
//     id: string,
//     date: "yyyy-MM-dd" (local date of the practice),
//     style: one of YOGA_STYLES keys,
//     minutes: number,
//     note: string,
//     createdOn: number (ms timestamp)
// }
