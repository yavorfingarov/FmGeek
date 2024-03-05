export const playbackErrorMessage = "Could not play this station.";

export const saveConfirmMessage =
    "This action is irreversible and might lead to data loss. Please make sure you have a backup of your data. Continue?";

export const copyErrorMessage = "Could not copy to clipboard.";

export const discardChangesConfirmMessage = "All changes will be lost. Continue?";

export const resetConfirmMessage =
    "You are about to irreversibly reset the application to its initial state. Please make sure you have a backup of your data. Continue?";

export function getParseStationsErrorMessage(group, index, property) {
    let message = "Unexpected value";
    if (group) {
        message += ` in group '${group}'`;
    }
    if (typeof index === "number") {
        message += ` at index ${index}`;
    }
    if (property) {
        message += ` for '${property}'`;
    }
    return message;
}

export function getDuplicateValueErrorMessage(property, value) {
    return `Duplicate ${property} '${value}'`;
}

export function getUnsupportedStreamErrorMessage(group, station) {
    let message = "Unsupported stream";
    if (group) {
        message += ` in group '${group}'`;
    }
    message += ` for station '${station}'`;
    return message;
}
