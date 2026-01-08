import Alpine from "alpinejs";

export function header() {
    Alpine.data("header", function () {
        return {
            toggle() {
                if (this.$store.navigation.player) {
                    this.$store.navigation.show("menu");
                } else {
                    this.$store.navigation.show("player");
                }
            }
        };
    });
}
