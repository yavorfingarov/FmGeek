export function generateStations(count, func) {
    const stations = [];
    for (let i = 0; i < count; i++) {
        const station = {
            name: `testName${i}`,
            stream: `https://testStream${i}.com`
        };
        if (i % 2 === 0) {
            station.website = `https://testWebsite${i}.com`;
        }
        stations.push(station);
    }
    if (func) {
        func(stations);
    }
    return stations;
}

export function generateGroups(count, func) {
    const groups = [];
    for (let i = 0; i < count; i++) {
        const group = {
            groupName: `testGroup${i}`,
            prependToStationName: i % 2 === 0,
            stations: generateStations(5)
        };
        groups.push(group);
    }
    if (func) {
        func(groups);
    }
    return groups;
}
