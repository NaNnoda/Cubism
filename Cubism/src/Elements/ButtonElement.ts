import {PointerPoint} from "../Datatypes/PointerPoint";
import {CanvasDrawer} from "../CanvasDrawer";
import {ThemedElement} from "./ThemedElement";
import {FontTheme} from "../Theme/Theme";

export class ButtonElement extends ThemedElement {
    text: string;

    constructor(text: string) {
        super();
        this.text = text;
        this.setFontTheme(new FontTheme().setFontSize(30));
    }


    render(): void {
        super.render();
        let c = this.c as CanvasDrawer;
        c.setFillStyle(this.currTheme.color.text);
        c.fillText(this.text, 10, 30);
    }
}