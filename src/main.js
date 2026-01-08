import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import { migrate } from "./migrator.js";
import { header } from "./components/header.js";
import { navigation } from "./components/navigation.js";
import { settings } from "./components/settings.js";
import { player } from "./components/player.js";

globalThis.Alpine = Alpine;
Alpine.plugin(persist);
migrate();
header();
navigation();
settings();
player();
Alpine.start();
