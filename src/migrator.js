const migrations = [
    () => {
        const source = localStorage.getItem("_x_source");
        const stations = localStorage.getItem("_x_stations");
        if (stations && !source) {
            localStorage.setItem("_x_source", '"local"');
        }
    }
];

export function migrate() {
    const version = parseInt(localStorage.getItem("version") ?? "0");
    if (version === migrations.length) {
        return;
    }
    for (let i = version; i < migrations.length; i++) {
        migrations[i]();
    }
    localStorage.setItem("version", migrations.length.toString());
}
