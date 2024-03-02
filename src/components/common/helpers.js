export function getStationDisplayName(groupName, stationName) {
    if (groupName) {
        return `${groupName} ${stationName}`;
    } else {
        return stationName;
    }
}

export function convertTime(input) {
    if (typeof input === "string") {
        const tokens = input.split(":");
        return 60 * tokens[0] + +tokens[1];
    } else {
        const hours = Math.floor(input / 60);
        const minutes = input % 60;
        return `${pad(hours)}:${pad(minutes)}`;
    }
}

function pad(number) {
    if (number < 10) {
        return `0${number}`;
    } else {
        return `${number}`;
    }
}
