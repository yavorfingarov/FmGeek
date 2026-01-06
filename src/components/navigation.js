import Alpine from "@alpinejs/csp";
import { Switch } from "./common/switch.js";

export function navigation() {
    Alpine.store("navigation", new Switch("show", "player"));
}
