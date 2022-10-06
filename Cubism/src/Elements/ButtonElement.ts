import {PointerPoint} from "../Datatypes/PointerPoint";
import {CanvasDrawer} from "../CanvasDrawer";
import {ThemedElement} from "./ThemedElement";
import {FontTheme} from "../Theme/Theme";
import {GEventKeys} from "../Constants/Constants";

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

    pushOnUp(...callbacks:Function[]): this {
        for (let callback of callbacks) {
            console.log("Pushing", callback);
            this.pushOn(GEventKeys.ON_UP, callback.bind(this));
        }
        // return super.pushOnUp(...callbacks);
        return  this
    }

    render(): void {
        super.render();
        let c = this.c as CanvasDrawer;
        c.setFillStyle(this.currTheme.color.text);
        c.fillText(this.text, 10, 30);
    }
}