import {WebSvgIcon} from "./SVGIcon";
import BasicIcon from "./BasicIcon";
import BasicTheme from "../../Theme/BasicTheme";
import {Colors} from "../../Constants/Colors";

export class MaterialIcons extends BasicIcon {
    svgImg: HTMLImageElement;

    theme: BasicTheme = new BasicTheme().setFillStyle(Colors.blue700).setStrokeStyle(Colors.blue200);

    constructor(iconName: string) {
        super();

        this.svgImg = new Image()
        let iconUrl = "https://fonts.gstatic.com/s/i/materialicons/" + iconName + "/v8/20px.svg"

        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", iconUrl, false); // false for synchronous request
        xmlHttp.send(null);
        let rawSvg = xmlHttp.responseText;
        this.svgImg.src = "data:image/svg+xml;base64," + btoa(rawSvg);
    }

    draw() {
        this.c.translate(this.position);
        this.c.setFillStyle(this.theme.fillStyle);
        this.c.drawImage(this.svgImg, 0, 0, this.width, this.height);
        this.c.restoreTranslate();
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
