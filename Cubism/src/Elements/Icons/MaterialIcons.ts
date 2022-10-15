import {WebSvgIcon} from "./SVGIcon";

export class MaterialIcons extends WebSvgIcon{
    constructor(iconName: string) {
        super("https://fonts.gstatic.com/s/i/materialicons/" + iconName + "/v8/20px.svg");

    }
    static get add() {
        return new MaterialIcons("add");
    }
    static get close() {
        return new MaterialIcons("close");
    }
    static get done() {
        return new MaterialIcons("done");
    }
    static get edit() {
        return new MaterialIcons("edit");
    }
    static get menu() {
        return new MaterialIcons("menu");
    }
    static get more_vert() {
        return new MaterialIcons("more_vert");
    }
    static get search() {
        return new MaterialIcons("search");
    }
    static get settings() {
        return new MaterialIcons("settings");
    }
}
