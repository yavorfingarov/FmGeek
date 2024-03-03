export const playbackErrorMessage = "Could not play this station.";

export const saveConfirmMessage =
    "This action is irrevisible and might lead to data loss. Make sure you have backup of your data. Continue?";

export const copyErrorMessage = "Could not copy to clipboard.";

export const discardChangesConfirmMessage = "All changes will be lost. Continue?";

export const resetConfirmMessage =
    "You are about to irreversibly reset the application into its initial state. Are you sure?";

export function getParseStationsErrorMessage(groupName, index, property) {
    let message = "Unexpected value";
    if (groupName) {
        message += ` in group '${groupName}'`;
    }
    if (typeof index === "number") {
        message += ` at index ${index}`;
    }
    if (property) {
        message += ` for '${property}'`;
    }
    return message;
}

export function getDuplicateStationNameErrorMessage(stationName) {
    return `Duplicate station name '${stationName}'`;
}

export function getUnsupportedStreamErrorMessage(groupName, stationName) {
    let message = "Unsupported stream";
    if (groupName) {
        message += ` in group '${groupName}'`;
    }
    message += ` for station '${stationName}'`;
    return message;
}
