export class Switch {
    constructor(verb, initialValue) {
        if (initialValue) {
            this[initialValue] = true;
        }
        this[verb] = function (target) {
            for (const key in this) {
                if (key !== verb) {
                    this[key] = false;
                }
            }
            this[target] = true;
        };
    }
}
