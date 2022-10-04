import {PointerPoint} from "../Datatypes/PointerPoint";
import {CanvasDrawer} from "../CanvasDrawer";
import {ThemedElement} from "./ThemedElement";
import {FontTheme} from "../Theme/Theme";

export class ButtonElement extends ThemedElement {
    text: string;

    constructor(text: string = "Button") {
        super();
        this.text = text;
        this.setFontTheme(new FontTheme().setFontSize(30));
    }

    setText(text: string): ButtonElement {
        this.text = text;
        return this;
    }


    render(): void {
        super.render();
        let c = this.c as CanvasDrawer;
        c.setFillStyle(this.currTheme.color.text);
        c.fillText(this.text, 10, 30);
    }
}