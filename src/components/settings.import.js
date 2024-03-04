import {getStationDisplayName} from "./common/helpers";
import {
    getDuplicateValueErrorMessage,
    getParseStationsErrorMessage,
    getUnsupportedStreamErrorMessage
} from "./common/messages";

export function parseStations(json) {
    const data = JSON.parse(json);
    const stationNames = new Set();
    if (Array.isArray(data) && data.length > 0 && data[0]?.groupName) {
        const groupNames = new Set();
        for (let i = 0; i < data.length; i++) {
            if (!isValid(data[i].groupName)) {
                throwParseStationsError({index: i, property: "groupName"});
            }
            if (typeof data[i].prependToStationName !== "boolean") {
                throwParseStationsError({group: data[i].groupName, property: "prependToStationName"});
            }
            if (groupNames.has(data[i].groupName)) {
                const message = getDuplicateValueErrorMessage("group name", data[i].groupName);
                throw Error(message);
            }
            groupNames.add(data[i].groupName);
            validateStations(stationNames, data[i].stations, data[i]);
        }
    } else {
        validateStations(stationNames, data);
    }
    return data;
}

function validateStations(stationNames, stations, group) {
    if (!Array.isArray(stations) || stations.length === 0) {
        const property = group?.groupName ? "stations" : null;
        throwParseStationsError({group: group?.groupName, property});
    }
    for (let i = 0; i < stations.length; i++) {
        validateStation(stationNames, i, stations[i], group);
    }
}

function validateStation(stationNames, index, station, group) {
    if (station == null || typeof station !== "object" || Array.isArray(station)) {
        throwParseStationsError({index, group: group?.groupName});
    }
    if (!isValid(station.name)) {
        throwParseStationsError({index, group: group?.groupName, property: "name"});
    }
    if (!isValid(station.stream)) {
        throwParseStationsError({index, group: group?.groupName, property: "stream"});
    }
    if (station.website != null && !isValid(station.website)) {
        throwParseStationsError({index, group: group?.groupName, property: "website"});
    }
    if (!station.stream.startsWith("https://")) {
        const message = getUnsupportedStreamErrorMessage(group?.groupName, station.name);
        throw Error(message);
    }
    const groupName = group?.prependToStationName ? group.groupName : null;
    const stationName = getStationDisplayName(groupName, station.name);
    if (stationNames.has(stationName)) {
        const message = getDuplicateValueErrorMessage("station name", stationName);
        throw Error(message);
    }
    stationNames.add(stationName);
}

function isValid(input) {
    return input && typeof input === "string" && input.length > 0 && !/^\s*$/.test(input);
}

function throwParseStationsError({group, index, property}) {
    const message = getParseStationsErrorMessage(group, index, property);
    throw Error(message);
}
