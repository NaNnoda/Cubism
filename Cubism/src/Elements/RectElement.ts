import {PointerInteractThemeElement} from "./Basic/PointerInteractThemeElement";

export class RectElement extends PointerInteractThemeElement {
    draw() {
        super.draw();
        let c = this.c;
        c.translate(this.position);
        c.drawRectWithPoints(this.absSize);
        c.restoreTranslate();
    }
}