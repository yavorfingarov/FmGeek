import Alpine from "@alpinejs/csp";
import persist from "@alpinejs/persist";
import { header } from "./components/header.js";
import { navigation } from "./components/navigation.js";
import { settings } from "./components/settings.js";
import { player } from "./components/player.js";

globalThis.Alpine = Alpine;
Alpine.plugin(persist);
header();
navigation();
settings();
player();
Alpine.start();
