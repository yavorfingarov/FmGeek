export function updateHistory(history, historyLength, selected, current) {
    if (!current || selected.name === current.name) {
        return history;
    }
    const newHistory = history
        .filter((x) => x.name !== selected.name && x.name !== current.name)
        .slice(0, historyLength - 1);
    return [current, ...newHistory];
}
