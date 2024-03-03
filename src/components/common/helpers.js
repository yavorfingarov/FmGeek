export function getStationDisplayName(groupName, stationName) {
    if (groupName) {
        return `${groupName} ${stationName}`;
    } else {
        return stationName;
    }
}
