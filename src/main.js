import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import {header} from "./components/header";
import {navigation} from "./components/navigation";
import {settings} from "./components/settings";
import {player} from "./components/player";

window.Alpine = Alpine;
Alpine.plugin(persist);
header();
navigation();
settings();
player();
Alpine.start();
