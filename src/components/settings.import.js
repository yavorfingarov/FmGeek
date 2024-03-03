import {getStationDisplayName} from "./common/helpers";
import {
    getDuplicateStationNameErrorMessage,
    getParseStationsErrorMessage,
    getUnsupportedStreamErrorMessage
} from "./common/messages";

export function parseStations(json) {
    const data = JSON.parse(json);
    const stationNames = new Set();
    if (Array.isArray(data) && data.length > 0 && data[0]?.groupName) {
        for (let i = 0; i < data.length; i++) {
            if (!isValid(data[i].groupName)) {
                throwParseStationsError({index: i, property: "groupName"});
            }
            if (typeof data[i].prependToStationName !== "boolean") {
                throwParseStationsError({groupName: data[i].groupName, property: "prependToStationName"});
            }
            validateStations(stationNames, data[i].stations, data[i].groupName);
        }
    } else {
        validateStations(stationNames, data);
    }
    return data;
}

function validateStations(stationNames, stations, groupName) {
    if (!Array.isArray(stations) || stations.length === 0) {
        const property = groupName ? "stations" : null;
        throwParseStationsError({groupName, property});
    }
    for (let i = 0; i < stations.length; i++) {
        validateStation(stationNames, i, stations[i], groupName);
    }
}

function validateStation(stationNames, index, station, groupName) {
    if (station == null || typeof station !== "object" || Array.isArray(station)) {
        throwParseStationsError({index, groupName});
    }
    if (!isValid(station.name)) {
        throwParseStationsError({index, groupName, property: "name"});
    }
    if (!isValid(station.stream)) {
        throwParseStationsError({index, groupName, property: "stream"});
    }
    if (station.website != null && !isValid(station.website)) {
        throwParseStationsError({index, groupName, property: "website"});
    }
    if (!station.stream.startsWith("https://")) {
        const message = getUnsupportedStreamErrorMessage(groupName, station.name);
        throw Error(message);
    }
    const stationName = getStationDisplayName(groupName, station.name);
    if (stationNames.has(stationName)) {
        const message = getDuplicateStationNameErrorMessage(stationName);
        throw Error(message);
    }
    stationNames.add(stationName);
}

function isValid(input) {
    return input && typeof input === "string" && input.length > 0 && !/^\s*$/.test(input);
}

function throwParseStationsError({groupName, index, property}) {
    const message = getParseStationsErrorMessage(groupName, index, property);
    throw Error(message);
}
